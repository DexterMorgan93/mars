import * as PIXI from "pixi.js";
import appConstants from "../common/constants";

let app: PIXI.Application<PIXI.Renderer>;
let bullets: PIXI.Container;
// таймер блокировки корабля после попадания бомбы
let timeout: null | number;

// 2 типа пуль
const bulletTypes = ["Bullet_Sequence1", "Bullet_Sequence2"];

// скорость полета снаряда
const bulletSpeed = 1;
const allTextures = PIXI.Texture;

export function initBullets(currApp: PIXI.Application, root: PIXI.Container) {
  bullets = new PIXI.Container();
  bullets.label = appConstants.containers.bullets;
  app = currApp;
  return bullets;
}

// функция очистки всех буллетов при начале новой игры
export function clearBullets() {
  // проходимся по всем буллетам и удаляем их
  bullets.children.forEach((bullet) => {
    bullets.removeChild(bullet);
    // уничтожаем их, чтобы освободить память
    bullet.destroy({ children: true });
  });
}

export function addBullet(coord: { x: number; y: number }) {
  if (timeout) {
    return;
  }

  // рандомно получаем тип снаряда
  const bulletType =
    bulletTypes[Math.floor(Math.random() * bulletTypes.length)];

  let textures: PIXI.Texture[] = [];
  if (allTextures[bulletType]) {
    // если есть эта текстура, то добавляем
    textures = allTextures[bulletType];
  } else {
    for (let i = 0; i < 6; i++) {
      const texture = PIXI.Texture.from(`${bulletType} ${i + 1}.png`);
      textures.push(texture);
    }
  }

  const bullet = new PIXI.AnimatedSprite(textures);
  bullet.loop = false;
  const filter = new PIXI.ColorMatrixFilter();
  const { matrix } = filter;
  matrix[1] = Math.sin(Math.random() * 10);
  matrix[2] = Math.cos(Math.random() * 10);
  matrix[3] = Math.cos(Math.random() * 10);
  matrix[4] = Math.sin(Math.random() * 10);
  matrix[5] = Math.sin(Math.random() * 10);
  matrix[6] = Math.sin(Math.random() * 10);
  bullet.filters = [filter];
  bullet.animationSpeed = 0.2;
  bullet.anchor.set(0.5);
  bullet.position.set(coord.x, coord.y - 10);
  bullets.addChild(bullet);
  bullet.play();

  timeout = setTimeout(() => {
    timeout = null;
  }, appConstants.timeouts.playerShoots);
}

export function destroyBullet(bullet: PIXI.AnimatedSprite) {
  bullets.removeChild(bullet);
  bullet.destroy();
}

export function bullettick() {
  const toremove: PIXI.ContainerChild[] = [];
  bullets.children.forEach((bullet) => {
    bullet.position.y -= bulletSpeed * 2;
    if (bullet.position.y < 0) {
      toremove.push(bullet);
    }
  });
  toremove.forEach((bullet) => {
    bullets.removeChild(bullet);
    bullet.destroy({ children: true });
  });
}
