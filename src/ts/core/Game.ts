import Terrain from "./Terrain";
import Spaceship from "./Spaceship";
import Vector from "../utils/Vector";
import { IAnimFunction, IAnimParams } from "../utils/animation";
import { GameState } from "../enums/GameState";
import GetReadyScreen from "../screens/GetReadyScreen";
import GameActiveScreen from "../screens/GameActiveScreen";
import Collision from "./Collision";
import VictoryScreen from "../screens/VictoryScreen";
import GameOverScreen from "../screens/GameOverScreen";


export default class Game implements IAnimFunction {

  private screens = {
    getReady: new GetReadyScreen(),
    gameActive: new GameActiveScreen(),
    victory: new VictoryScreen(),
    gameOver: new GameOverScreen()
  };
  private spaceship: Spaceship;
  private terrain: Terrain;

  private collision: Collision;

  private gameState: GameState;

  private animPamars: IAnimParams | undefined;

  constructor() {
    this.spaceship = new Spaceship(new Vector(window.innerWidth / 2, 200));
    this.terrain = new Terrain();
    this.gameState = GameState.GET_READY;

    this.collision = new Collision(this.spaceship, this.terrain);

    this.init();

  }

  init() {
    this.terrain.generate();

    let thisClass = this;

    document.addEventListener("keydown", function eventHandler(e) {
      if (e.code == "Space") {
        thisClass.gameActive();
        this.removeEventListener("keydown", eventHandler);
      }
    });
  }

  gameOver() {
    document.addEventListener("keydown", function eventHandler(e) {
      if (e.code == "Space") {
        this.removeEventListener("keydown", eventHandler);
        location.reload();
      }
    });
  }

  gameActive() {

    this.gameState = GameState.GAME_ACTIVE;

    document.addEventListener("keydown", (e) => {

      // e.preventDefault();

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

    document.addEventListener("mousedown", (event) => {
      this.spaceship.position = new Vector(event.x, event.y);
    });


    document.addEventListener("keyup", (e) => {

      // e.preventDefault();

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
      this.screens.getReady.draw(params);
    }

    if (this.gameState === GameState.VICTORY) {
      this.screens.victory.draw(params);
    }

    if (this.gameState === GameState.GAME_OVER) {
      this.screens.gameOver.draw(params);
    }

    if (this.gameState === GameState.GAME_ACTIVE) {
      this.screens.gameActive.drawStats(params, this.spaceship);
    }

    this.spaceship.draw(params);
    this.terrain.draw(params);
  }

  update(params: IAnimParams): void {

    if (this.gameState === GameState.GAME_ACTIVE) {


      this.animPamars = params;
      this.spaceship.applyForce(new Vector(0, 0.1 * this.animPamars.secondPart));
      this.spaceship.update(params);

      let id = this.collision.checkCollision();

      if (id !== -1) {
        if (this.collision.checkFail(id)) {
          console.error("DETECT");
          this.spaceship.velocity = new Vector(0, 0);
          this.gameState = GameState.GAME_OVER;
          this.gameOver();
        } else {
          console.error("WIN");
          this.spaceship.velocity = new Vector(0, 0);
          this.gameState = GameState.VICTORY;
          this.gameOver();
        }
      }
    }

  }

}