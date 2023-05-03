import { ENEMY_DEFAULT_SPAWN_POSITIONS, PLAYER_DEFAULT_SPAWN_POSITIONS } from '../../config';
import { TypeTank } from '../Models/Tank';
// import { spawn } from '../tileMap';

// import { animation } from './animation';

function getStartPosition(type: TypeTank) {
  const types = {
    [TypeTank.ENEMY]: ENEMY_DEFAULT_SPAWN_POSITIONS[0],
    [TypeTank.PLAYER1]: PLAYER_DEFAULT_SPAWN_POSITIONS[0],
    [TypeTank.PLAYER2]: PLAYER_DEFAULT_SPAWN_POSITIONS[1],
  };
  return types[type];
}

export const respawn = ({
  tank,
  img,
  ctx,
}: {
  tank: TypeTank;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
}) => {
  const { x, y } = getStartPosition(tank);

  // animation(respawn, 30, x, y)
};
