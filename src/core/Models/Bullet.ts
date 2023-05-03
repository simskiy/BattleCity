/* eslint-disable lines-between-class-members */
import { BORDER_LEFT_WIDTH, BORDER_TOP_BOTTOM_HEIGHT, TILE_SIZE } from '../../config';
import { bullet } from '../tileMap';
import { animation } from '../utils/animation';
import { getStopPoints } from '../utils/getStopPoints';
import { stopPosition } from '../utils/stopPosition';
import { TRender } from '../World/World';

import { TLand } from './Land';
import { Direction, Tank } from './Tank';

export class Bullet {
  tank: Tank;
  x: number;
  y: number;
  private _x: number;
  private _y: number;
  width: number;
  height: number;
  speed: number;
  view: number[];
  land: TLand;
  direction: Direction;
  isExplose: boolean;
  stopBlocks: { stopRow1: number; stopCol1: number; stopRow2: number; stopCol2: number };
  // ctx: any;

  constructor(tank: Tank, land: TLand) {
    this.tank = tank;
    this.direction = tank.direction;
    [this.x, this.y] = this.getPosition(this.tank.direction);
    this.view = bullet.up;
    this.land = land;
    this.isExplose = false;
    this.speed = 10;
    this.stopBlocks = { stopCol1: 0, stopCol2: 0, stopRow1: 0, stopRow2: 0 };
    // this.init();
  }

  // init() {}

  private getPosition(direction: Direction) {
    switch (true) {
      case direction === Direction.up:
        this.direction = Direction.up;
        [, , this.width, this.height] = [...bullet.up];
        return [
          Math.round(this.tank.x + this.tank.tank_width / 2 - this.width / 2),
          Math.round(this.tank.y - bullet.up[3]),
        ];

      case direction === Direction.right:
        this.direction = Direction.right;
        [, , this.width, this.height] = [...bullet.right];
        return [
          Math.round(this.tank.x + this.tank.tank_width),
          Math.round(this.tank.y + this.tank.tank_height / 2 - this.height / 2),
        ];

      case direction === Direction.down:
        this.direction = Direction.down;
        [, , this.width, this.height] = [...bullet.down];
        return [
          Math.round(this.tank.x + this.tank.tank_width / 2 - this.width / 2),
          Math.round(this.tank.y + this.tank.tank_height),
        ];

      case direction === Direction.left:
        this.direction = Direction.left;
        [, , this.width, this.height] = [...bullet.left];
        return [
          Math.round(this.tank.x - bullet.left[2]),
          Math.round(this.tank.y + this.tank.tank_height / 2 - this.height / 2),
        ];
    }
  }

  fire() {
    const opt = {
      x: this.x - TILE_SIZE,
      y: this.y - TILE_SIZE,
      land: this.land,
      direction: this.direction,
    };
    let stopPos = 0;
    this.stopBlocks = getStopPoints({ ...opt });
    switch (this.direction) {
      case Direction.up:
        this.view = bullet.up;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction });
        if (this.y - this.speed > stopPos) {
          this.y -= this.speed;
        } else {
          this.y = stopPos;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
      case Direction.right:
        this.view = bullet.right;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction }) - this.width;
        if (this.x + this.speed < stopPos) {
          this.x += this.speed;
        } else {
          this.x = stopPos;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
      case Direction.down:
        this.view = bullet.down;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction }) - this.height;
        if (this.y + this.speed < stopPos) {
          this.y += this.speed;
        } else {
          this.y = stopPos;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
      case Direction.left:
        this.view = bullet.left;
        stopPos = stopPosition({ ...this.stopBlocks, direction: this.direction });
        if (this.x - this.speed > stopPos) {
          this.x -= this.speed;
        } else {
          this.x = stopPos;
          this.isExplose = true;
          if (!this.tank.isShot) this.tank.reloadWeapon();
        }
        break;
    }
  }

  prepareRenderBullet(img: HTMLImageElement): TRender {
    return {
      clear: [
        this.x + BORDER_LEFT_WIDTH,
        this.y + BORDER_TOP_BOTTOM_HEIGHT,
        this.width,
        this.height,
      ],
      draw: [
        img,
        this.view[0],
        this.view[1],
        this.view[2],
        this.view[3],
        this.x + BORDER_LEFT_WIDTH,
        this.y + BORDER_TOP_BOTTOM_HEIGHT,
        this.view[2],
        this.view[3],
      ],
    };
  }

  animationExploseBullet(
    frames: number[][],
    delay: number,
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
  ) {
    animation({ frames, delay, x: this.x, y: this.y, img, ctx });
  }
}
