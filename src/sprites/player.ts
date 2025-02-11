import { Application, Renderer, Sprite } from "pixi.js";
import { getTexture } from "../common/assets";
import { allTeturesKeys } from "../common/textures";
import appConstants from "../common/constants";
import * as PIXI from "pixi.js";
import { GameState } from "../game";
import { addBullet } from "./bullets";

let player: Sprite;
let app: Application<Renderer>;
// таймер блокировки корабля после попадания бомбы
let lockTimeOut: null | number = null;

export function addPlayer(currApp: Application, root: PIXI.Container) {
  app = currApp;
  player = new Sprite(getTexture(allTeturesKeys.spaceShip));
  player.anchor.set(0.5);
  player.position.x = appConstants.size.WIDTH / 2;
  player.position.y = appConstants.size.HEIGHT - 200;
  player.scale.set(0.3);

  return player;
}

export const lockPlayer = () => {
  if (lockTimeOut) {
    return true;
  }
  player.interactive = false;
  lockTimeOut = setTimeout(() => {
    lockTimeOut = null;
    player.interactive = true;
  }, appConstants.timeouts.playerLock);
};

export const playerShoots = () => {
  if (!lockTimeOut) {
    addBullet({ x: player.position.x, y: player.position.y });
  }
};

export function tickPlayer(state: GameState) {
  if (player.interactive) {
    player.alpha = 1;
  } else {
    player.alpha = 0.5;
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
  return player;
}
