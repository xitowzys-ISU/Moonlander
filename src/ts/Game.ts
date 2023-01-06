import { IAnimFunction, IAnimParams } from "./utils/animation";
import Spaceship from "./Spaceship";
import Vector from "./utils/Vector";

export default class Game implements IAnimFunction{

  private spaceship: Spaceship

  constructor() {
    this.spaceship = new Spaceship(new Vector(100, 10))

  }

  initCanvas() {

  }

  clear(): void {
  }

  draw(params: IAnimParams): void {
    this.spaceship.draw(params)
    // console.log("update");
  }

  update(params: IAnimParams): void {

    this.spaceship.applyForce(new Vector(0, 0.1 * params.secondPart))

    this.spaceship.update(params)
    // console.log("update");
  }

}