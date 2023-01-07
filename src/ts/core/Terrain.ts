import Canvas from "./Canvas";
import Vector from "../utils/Vector";
import PerlinNoise from "../utils/PerlinNoise";
import { IAnimFunction, IAnimParams } from "../utils/animation";
import { randomBetweenInteger, randomBetweenFloat } from "../utils/randomBetween";

export default class Terrain implements IAnimFunction {

  private canvas: Canvas = Canvas.Instance;

  private noise: PerlinNoise = new PerlinNoise();
  private step: number = randomBetweenInteger(30, 60);
  private pointsAmount = Math.floor(window.innerWidth / this.step);
  private points: Array<Vector> = [];
  
  private ys: Array<number> = [];
  private maxValue = 0;
  private minValue = 0;

  constructor() {
  }

  generate() {
    console.info(this.pointsAmount);

    for (let i = 0; i < this.pointsAmount; i++) {
      let y = this.noise.perlinNoise(randomBetweenFloat(2.0, 10), randomBetweenFloat(0, 10), randomBetweenFloat(1, 100));

      this.ys[i] = y;

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

    for (let i = 0; i < this.pointsAmount; i++) {
      let yRemapped = ((this.ys[i] - this.minValue) / perlinRange) * heightRange + minHeight;

      this.points[i] = new Vector(lastX, yRemapped);
      lastX = lastX + this.step + randomBetweenInteger(10, 30);
    }

    console.debug(this.points);
    console.debug(this.maxValue);

  }

  clear(): void {
    this.points.length = 0;
  }

  draw(params: IAnimParams): void {

    for (let i = 0; i < this.pointsAmount - 1; i++) {

      this.canvas.ctx.beginPath();
      // this.canvas.ctx.lineWidth = 2;
      // this.canvas.ctx.strokeStyle = "#eeeeee";

      if(Math.abs(this.points[i + 1].y - this.points[i].y ) < 20.0 && Math.abs(this.points[i + 1].x - this.points[i].x ) > 60.0) {
        // console.log(this.points[i + 1].y - this.points[i].y );
        this.canvas.ctx.strokeStyle = "#e12424";
        this.canvas.ctx.lineWidth = 4;
        this.canvas.ctx.moveTo(this.points[i].x, this.points[i].y);
        this.canvas.ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
      } else {
        this.canvas.ctx.strokeStyle = "#eeeeee";
        this.canvas.ctx.lineWidth = 2;
        this.canvas.ctx.moveTo(this.points[i].x, this.points[i].y);
        this.canvas.ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
      }

      this.canvas.ctx.stroke();

    }

  }

  update(params: IAnimParams): void {
  }
}