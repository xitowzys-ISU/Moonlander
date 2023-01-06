import Canvas from "./Canvas";
import Vector from "./utils/Vector";
import { IAnimFunction, IAnimParams } from "./utils/animation";
import { randomBetweenInteger } from "./utils/randomBetween";

export default class Spaceship implements IAnimFunction {

  private canvas: Canvas = Canvas.Instance;

  private position: Vector;
  private velocity: Vector;
  private acceleration: Vector;
  private destroyed: boolean;
  private fuel: number = 1000;

  private gasActivate: boolean = false;
  private angle: number = 0;

  constructor(position: Vector) {
    this.position = position;
    this.destroyed = false;

    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
  }

  clear(): void {
  }

  draw(params: IAnimParams): void {
    this.canvas.ctx.beginPath();

    this.canvas.ctx.save();

    this.canvas.ctx.lineWidth = 2;
    this.canvas.ctx.strokeStyle = "#eeeeee";


    this.canvas.ctx.translate(this.position.x, this.position.y);
    this.canvas.ctx.rotate(this.degToRad(this.angle));

    this.canvas.ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);

    this.canvas.ctx.moveTo(-6, 6);
    this.canvas.ctx.lineTo(6, 6);

    this.canvas.ctx.moveTo(-6, 6);
    this.canvas.ctx.lineTo(-10, 15);

    this.canvas.ctx.moveTo(6, 6);
    this.canvas.ctx.lineTo(10, 15);

    this.canvas.ctx.moveTo(6, 15);
    this.canvas.ctx.lineTo(14, 15);

    this.canvas.ctx.moveTo(-6, 15);
    this.canvas.ctx.lineTo(-14, 15);

    this.canvas.ctx.stroke();


    if (this.gasActivate) {
      this.canvas.ctx.beginPath();

      this.canvas.ctx.strokeStyle = "#04ecff";
      this.canvas.ctx.fillStyle = "#04ecff";
      this.canvas.ctx.moveTo(-4, 6);
      this.canvas.ctx.lineTo(0, randomBetweenInteger(10, 15));
      this.canvas.ctx.lineTo(4, 6);

      this.canvas.ctx.fill();
    }


    this.canvas.ctx.stroke();

    this.canvas.ctx.restore();

  }

  update(params: IAnimParams): void {


    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mul(0);

  }

  private degToRad(deg: number) {
    return deg * (Math.PI / 180.0);
  }


  gas(params: IAnimParams) {
    this.gasActivate = true;
    this.applyForce(new Vector(Math.sin(this.degToRad(this.angle)) * params.secondPart, Math.cos(this.degToRad(this.angle)) * -2 * params.secondPart));
    this.fuel -= 1;
  }

  gasAnimationEnable() {
    this.gasActivate = true;
  }

  gasAnimationDisable() {
    this.gasActivate = false;
  }


  rotateRight(params: IAnimParams) {
    console.log(this.angle);
    if (this.angle >= 90) {
      this.angle = 90;
    } else {
      this.angle += 300 * params.secondPart;
    }

  }

  rotateLeft(params: IAnimParams) {
    if (this.angle <= -90) {
      this.angle = -90;
    } else {
      this.angle -= 300 * params.secondPart;
    }
  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }
}