import Terrain from "./Terrain";
import Spaceship from "./Spaceship";
import Vector from "./utils/Vector";
import { IAnimFunction, IAnimParams } from "./utils/animation";

export default class Game implements IAnimFunction {

  private spaceship: Spaceship;
  private terrain: Terrain;

  private animPamars: IAnimParams | undefined

  constructor() {
    this.spaceship = new Spaceship(new Vector(window.innerWidth / 2, 200));
    this.terrain = new Terrain();
    this.init();

  }

  init() {
    this.terrain.generate();

    document.addEventListener("keydown", (e) => {

      // e.preventDefault();

      // console.log(e);

      if (this.animPamars !== undefined) {
        if (e.code == "KeyW") {
          this.spaceship.gas(this.animPamars);
        }

        if (e.code == "KeyD") {
          this.spaceship.rotateRight(this.animPamars);
        }

        if (e.code == "KeyA") {
          this.spaceship.rotateLeft(this.animPamars);
        }
      }

    });


    document.addEventListener("keyup", (e) => {

      // e.preventDefault();

      // console.log(e);

      if (this.animPamars !== undefined) {
        if (e.code == "KeyW") {
          this.spaceship.gasAnimationDisable();
        }
      }

    });

  }

  clear(): void {
  }

  draw(params: IAnimParams): void {
    this.spaceship.draw(params);
    this.terrain.draw(params);
    // console.log("update");
  }

  update(params: IAnimParams): void {

    this.animPamars = params

    this.spaceship.applyForce(new Vector(0, 0.1 * this.animPamars.secondPart));

    this.spaceship.update(params);
    // console.log("update");
  }

}