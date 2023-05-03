import { BORDER_LEFT_WIDTH, BORDER_TOP_BOTTOM_HEIGHT, TILE_SIZE } from '../../config';

type TAnimation = {
  frames: number[][];
  delay: number;
  x: number;
  y: number;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
};

export const animation = ({ frames, delay, x, y, img, ctx }: TAnimation) => {
  let n = 0;
  setTimeout(function tick() {
    if (n < frames.length) {
      const coordX = Math.ceil(x / TILE_SIZE) * TILE_SIZE - frames[n][2] / 2 + BORDER_LEFT_WIDTH;
      const coordY =
        Math.ceil(y / TILE_SIZE) * TILE_SIZE - frames[n][3] / 2 + BORDER_TOP_BOTTOM_HEIGHT;
      ctx.clearRect(coordX, coordY, frames[n][2], frames[n][3]);
      ctx.drawImage(
        img,
        frames[n][0],
        frames[n][1],
        frames[n][2],
        frames[n][3],
        coordX,
        coordY,
        frames[n][2],
        frames[n][3],
      );
      n++;
      setTimeout(tick, delay);
    } else {
      setTimeout(() => {
        const coordX = Math.ceil(x / TILE_SIZE) * TILE_SIZE - frames[2][2] / 2 + BORDER_LEFT_WIDTH;
        const coordY =
          Math.ceil(y / TILE_SIZE) * TILE_SIZE - frames[2][3] / 2 + BORDER_TOP_BOTTOM_HEIGHT;
        ctx.clearRect(coordX, coordY, frames[2][2], frames[2][3]);
      }, 0);
    }
  }, 0);
};
