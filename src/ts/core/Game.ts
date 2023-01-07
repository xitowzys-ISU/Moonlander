import Terrain from "./Terrain";
import Spaceship from "./Spaceship";
import Vector from "../utils/Vector";
import { IAnimFunction, IAnimParams } from "../utils/animation";
import { GameState } from "../enums/GameState";
import GetReadyScreen from "../screens/GetReadyScreen";
import GameActiveScreen from "../screens/GameActiveScreen";


export default class Game implements IAnimFunction {

  private screens = {
    getReady: new GetReadyScreen(),
    gameActive: new GameActiveScreen(),
  }
  private spaceship: Spaceship;
  private terrain: Terrain;

  private gameState: GameState;

  private animPamars: IAnimParams | undefined;

  constructor() {
    this.spaceship = new Spaceship(new Vector(window.innerWidth / 2, 200));
    this.terrain = new Terrain();
    this.gameState = GameState.GET_READY
    this.init();

  }

  init() {
    this.terrain.generate();

    let thisClass = this;

    document.addEventListener('keydown', function eventHandler(e) {

      if (e.code == "Space") {
        thisClass.gameActive()
        this.removeEventListener('keydown', eventHandler);
      }

    });


    document.addEventListener("keyup", (e) => {


    });

  }

  gameActive() {

    this.gameState = GameState.GAME_ACTIVE

    document.addEventListener("keydown", (e) => {

      // e.preventDefault();

      // console.log(e);

      if (this.animPamars !== undefined) {
        if (e.code == "KeyW") {
          this.spaceship.gasAnimationEnable();
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

    if (this.gameState === GameState.GET_READY) {
      this.screens.getReady.draw(params)
    }

    this.spaceship.draw(params);
    this.terrain.draw(params);
    // console.log("update");
  }

  update(params: IAnimParams): void {

    if (this.gameState === GameState.GAME_ACTIVE) {

      this.animPamars = params;

      this.spaceship.applyForce(new Vector(0, 0.1 * this.animPamars.secondPart));

      this.spaceship.update(params);
    }

    // console.log("update");
  }

}