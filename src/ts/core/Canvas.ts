export default class Canvas {

  public canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D;

  private static _instance: Canvas;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  updateSize(): void {
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }

}