import { IAnimFunction, IAnimParams } from "../utils/animation";
import Canvas from "../core/Canvas";

export default class GetReadyScreen implements IAnimFunction {

  private canvas: Canvas = Canvas.Instance;

  constructor() {
  }
  clear(): void {
  }

  draw(params: IAnimParams): void {
    this.canvas.ctx.font = "24px Comic Sans MS";
    this.canvas.ctx.fillStyle = "white";
    this.canvas.ctx.textAlign = "center";
    this.canvas.ctx.fillText("CLICK THE SPACE TO PLAY", this.canvas.canvas.width / 2, 40);
    this.canvas.ctx.font = "20px Comic Sans MS";
    this.canvas.ctx.fillText("ARROW KEYS TO MOVE", this.canvas.canvas.width / 2, 40 + 40);
  }

  update(params: IAnimParams): void {
  }

}