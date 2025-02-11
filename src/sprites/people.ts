import {
  Application,
  Container,
  Renderer,
  Texture,
  TextureSource,
} from "pixi.js";
import { getTexture } from "../common/assets";
import { allTeturesKeys } from "../common/textures";

let app: Application<Renderer>;
let people: Container;
let peopleFrames: Texture[] | null = null;
let tombStoneFrames: Texture[] | null = null;

export function initPeople(currApp: Application) {
  if (!peopleFrames) {
    peopleFrames = [
      getTexture(allTeturesKeys.man),
      getTexture(allTeturesKeys.man2),
      getTexture(allTeturesKeys.woman),
    ] as Texture[];
  }
  if (!tombStoneFrames) {
    peopleFrames = [
      getTexture(allTeturesKeys.tombStone1),
      getTexture(allTeturesKeys.tombStone2),
    ] as Texture[];
  }

  people = new Container();
  app = currApp;
  return people;
}
