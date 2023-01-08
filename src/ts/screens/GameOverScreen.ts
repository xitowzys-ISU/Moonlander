import { IAnimFunction, IAnimParams } from "../utils/animation";
import Canvas from "../core/Canvas";
import Spaceship from "../core/Spaceship";

export default class GameOverScreen implements IAnimFunction {

  private canvas: Canvas = Canvas.Instance;

  constructor() {
  }
  clear(): void {
  }

  draw(params: IAnimParams): void {
    this.canvas.ctx.font = "24px Comic Sans MS";
    this.canvas.ctx.fillStyle = "white";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.fillText("BAD BOY :( YOU DESTROYED THE SHUTTLE", this.canvas.canvas.width / 2, 40);
    this.canvas.ctx.font = "20px Comic Sans MS";
    this.canvas.ctx.fillText("PRESS THE SPACE TO UPDATE THE LANDSCAPE FOR A NEW GAME", this.canvas.canvas.width / 2, 40 + 40);
  }

  update(params: IAnimParams): void {
  }

}