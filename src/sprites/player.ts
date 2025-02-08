import { Application, Renderer, Sprite } from "pixi.js";
import { getTexture } from "../common/assets";
import { allTeturesKeys } from "../common/textures";
import appConstants from "../common/constants";
import * as PIXI from "pixi.js";
import { GameState } from "../game";

let player: Sprite;
let app: Application<Renderer>;
// таймер блокировки корабля после попадания бомбы
let lockTimeOut;

export function addPlayer(currApp: Application, root: PIXI.Container) {
  app = currApp;
  player = new Sprite(getTexture(allTeturesKeys.spaceShip));
  player.anchor.set(0.5);
  player.position.x = appConstants.size.WIDTH / 2;
  player.position.y = appConstants.size.HEIGHT - 200;

  console.log("addPlayer: player set", player);
  return player;
}

export const lockPlayer = (): boolean => {
  if (lockTimeOut) {
    return true;
  }
  player._accessibleActive = false;
  lockTimeOut = setTimeout(() => {
    lockTimeOut = null;
    player._accessibleActive = true;
  }, appConstants.timeouts.playerLock);
  return false;
};

export function tickPlayer(state: GameState) {
  console.log("tickplayer");
  const playerLocked = lockPlayer();
  if (playerLocked) {
    player.alpha = 0.5;
  } else {
    player.alpha = 1;
  }

  const playerPosition = player.position.x;
  player.position.x = state.mousePosition;
  if (player.position.x < playerPosition) {
    player.rotation = -0.3;
  } else if (player.position.x > playerPosition) {
    player.rotation = 0.3;
  } else {
    player.rotation = 0;
  }
}
export function getPlayer() {
  console.log("getPlayer:", player);
  return player;
}
