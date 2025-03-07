import { loadAssets } from "./common/assets";
import * as PIXI from "pixi.js";
import appConstants from "./common/constants";
import {
  addPlayer,
  getPlayer,
  playerShoots,
  tickPlayer,
} from "./sprites/player";
import { addBullet, bullettick, initBullets } from "./sprites/bullets";

export interface GameState {
  stopped: boolean;
  moveLeftActive: boolean;
  moveRightActive: boolean;
  mousePosition: number;
  app?: PIXI.Application;
}

const gameState: GameState = {
  stopped: false,
  moveLeftActive: false,
  moveRightActive: false,
  mousePosition: 0,
};

async function createScene() {
  // This class automatically creates the renderer, ticker and root container.
  const app = new PIXI.Application();
  globalThis.__PIXI_APP__ = app;
  await app.init({
    background: "#000000",
    antialias: true,
    width: appConstants.size.WIDTH,
    height: appConstants.size.HEIGHT,
  });

  document.body.appendChild(app.canvas);

  // корневой контейнер приложения
  const rootcontainer = app.stage;
  rootcontainer.interactive = true;
  rootcontainer.hitArea = app.screen;

  const bullets = initBullets(app, rootcontainer);
  rootcontainer.addChild(bullets);
  const player = addPlayer(app, rootcontainer);
  rootcontainer.addChild(player);

  return app;
}

function initInteraction() {
  gameState.mousePosition = getPlayer().position.x;

  gameState.app?.stage.addEventListener("pointermove", (e) => {
    gameState.mousePosition = e.global.x;
  });
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.code === "Space") {
      playerShoots();
    }
  });

  gameState.app?.ticker.add(() => {
    tickPlayer(gameState);
    bullettick();
  });
}

export async function initGame() {
  loadAssets(async (progress: number) => {
    if (progress === 100) {
      const app = await createScene(); // Дожидаемся завершения сцены
      gameState.app = app; // Устанавливаем `app` в gameState
      initInteraction();
    }
  });
}
