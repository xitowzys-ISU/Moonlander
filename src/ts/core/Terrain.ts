import Canvas from "./Canvas";
import Vector from "../utils/Vector";
import PerlinNoise from "../utils/PerlinNoise";
import { IAnimFunction, IAnimParams } from "../utils/animation";
import { randomBetweenFloat, randomBetweenInteger } from "../utils/randomBetween";

export default class Terrain implements IAnimFunction {
  get pointsAmount(): number {
    return this._pointsAmount;
  }

  get points(): Array<Vector> {
    return this._points;
  }

  get pointsSafeZoneId(): Array<number> {
    return this._pointsSafeZoneId;
  }

  private canvas: Canvas = Canvas.Instance;

  private noise: PerlinNoise = new PerlinNoise();
  private step: number = randomBetweenInteger(30, 60);
  private _pointsAmount = Math.floor(window.innerWidth / this.step);
  private _points: Array<Vector> = [];

  private _pointsSafeZoneId: Array<number> = [];

  private ys: Array<number> = [];
  private maxValue = 0;
  private minValue = 0;

  constructor() {
  }

  generate() {
    // console.info(this._pointsAmount);

    for (let i = 0; i < this._pointsAmount; i++) {
      this.ys[i] = this.noise.perlinNoise(randomBetweenFloat(2.0, 10), randomBetweenFloat(0, 10), randomBetweenFloat(1, 100));

      if (this.ys[i] > this.maxValue) {
        this.maxValue = this.ys[i];
      }

      if (this.ys[i] < this.minValue) {
        this.minValue = this.ys[i];
      }
    }

    let perlinRange = this.maxValue - this.minValue;

    let maxHeight = window.innerHeight;
    let minHeight = Math.floor(window.innerHeight * 0.6);
    let heightRange = maxHeight - minHeight;
    let lastX = 0;

    for (let i = 0; i < this._pointsAmount; i++) {
      let yRemapped = ((this.ys[i] - this.minValue) / perlinRange) * heightRange + minHeight;

      this._points[i] = new Vector(lastX, yRemapped);
      lastX = lastX + this.step + randomBetweenInteger(10, 30);
    }

    for (let i = 0; i < this._pointsAmount - 1; i++) {
      if (this.isSafeZone(this._points[i], this._points[i + 1])) {
        this._pointsSafeZoneId.push(i);
      }
    }


    // console.debug(this._pointsSafeZoneId);
    // console.debug(this.maxValue);

  }

  clear(): void {
    this._points.length = 0;
  }

  draw(params: IAnimParams): void {

    for (let i = 0; i < this._pointsAmount - 1; i++) {

      this.canvas.ctx.beginPath();
      // this.canvas.ctx.lineWidth = 2;
      // this.canvas.ctx.strokeStyle = "#eeeeee";

      if (this.isSafeZone(this._points[i + 1], this._points[i])) {
        // console.log(this.points[i + 1].y - this.points[i].y );
        this.canvas.ctx.strokeStyle = "#e12424";
        this.canvas.ctx.lineWidth = 4;
        this.canvas.ctx.moveTo(this._points[i].x, this._points[i].y);
        this.canvas.ctx.lineTo(this._points[i + 1].x, this._points[i + 1].y);
      } else {
        this.canvas.ctx.strokeStyle = "#eeeeee";
        this.canvas.ctx.lineWidth = 2;
        this.canvas.ctx.moveTo(this._points[i].x, this._points[i].y);
        this.canvas.ctx.lineTo(this._points[i + 1].x, this._points[i + 1].y);
      }

      this.canvas.ctx.stroke();

    }

  }

  private isSafeZone(point1: Vector, point2: Vector): boolean {
    return Math.abs(point2.y - point1.y) < 20.0 && Math.abs(point2.x - point1.x) > 60.0;


  }

  update(params: IAnimParams): void {
  }
}