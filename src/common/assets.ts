import { Assets } from "pixi.js"; // работа с ресурсами
import type { ProgressCallback, Texture } from "pixi.js"; // работа с ресурсами
import appTextures from "./textures";
import { allTeturesKeys } from "./textures";

// превращаем в массив и прохоимся по ним и обавляем их все в Ассеты
Object.entries(appTextures).forEach(([key, value]) => {
  Assets.add({ alias: key, src: value });
});

// будем ранить загруженные текстуры, кэш текстур
const textures = new Map<string, Texture>();

// входной аргумент это колбек, который возвращает процесс выполнения
export function loadAssets(onProgress: ProgressCallback) {
  const keys = Object.entries(allTeturesKeys).map(([_, value]) => value);
  Assets.load([...keys], onProgress).then((data: Record<string, Texture>) => {
    Object.entries(data).forEach(([key, value]) => {
      textures.set(key, value);
    });
    onProgress(100);
  });
}

// поиск текстуры по идентификатору
export function getTexture(id: string) {
  if (textures.has(id)) {
    return textures.get(id);
  }
}
