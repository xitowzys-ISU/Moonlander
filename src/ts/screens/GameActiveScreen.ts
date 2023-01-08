import { IAnimFunction, IAnimParams } from "../utils/animation";
import Spaceship from "../core/Spaceship";
import Canvas from "../core/Canvas";

export default class GameActiveScreen implements IAnimFunction {

  private canvas: Canvas = Canvas.Instance;
  clear(): void {
  }

  draw(params: IAnimParams): void {
  }

  update(params: IAnimParams): void {
  }

  drawStats(params: IAnimParams, spaceShip: Spaceship) {
    console.log("OK");
    this.canvas.ctx.font = "24px Comic Sans MS";
    this.canvas.ctx.fillStyle = "white";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.fillText("Fuel", this.canvas.canvas.width / 2, 40);
    this.canvas.ctx.font = "20px Comic Sans MS";
    this.canvas.ctx.fillText(String(spaceShip.fuel), this.canvas.canvas.width / 2, 40 + 40);
  }

}