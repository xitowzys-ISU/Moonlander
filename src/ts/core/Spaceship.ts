import Canvas from "./Canvas";
import Vector from "../utils/Vector";
import { IAnimFunction, IAnimParams } from "../utils/animation";
import { randomBetweenInteger } from "../utils/randomBetween";

export default class Spaceship implements IAnimFunction {
  get velocity(): Vector {
    return this._velocity;
  }

  set velocity(value: Vector) {
    this._velocity = value;
  }

  get angle(): number {
    return this._angle;
  }

  get collisionBox(): { xy: Vector; wh: Vector } {
    return this._collisionBox;
  }

  get fuel(): number {
    return this._fuel;
  }

  private canvas: Canvas = Canvas.Instance;
  public position: Vector;
  private _velocity: Vector;
  private acceleration: Vector;
  private destroyed: boolean;
  private _fuel: number = 1000;

  private gasActivate: boolean = false;
  private _angle: number = 0;

  private _collisionBox: { xy: Vector, wh: Vector } = {
    xy: new Vector(0, 0),
    wh: new Vector(1, 1)
  };

  constructor(position: Vector) {
    this.position = position;
    this.destroyed = false;

    this._velocity = new Vector(0, 0);
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
    this.canvas.ctx.rotate(this.degToRad(this._angle));

    this.canvas.ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);

    // this.canvas.ctx.rect(
    //   this._collisionBox.xy.x - this.position.x,
    //   this._collisionBox.xy.y - this.position.y,
    //   this._collisionBox.wh.x,
    //   this._collisionBox.wh.y
    // );


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
      this.canvas.ctx.lineTo(0, randomBetweenInteger(15, 20));
      this.canvas.ctx.lineTo(4, 6);

      this.canvas.ctx.fill();
    }


    this.canvas.ctx.stroke();

    this.canvas.ctx.restore();

    console.log(this.velocity.y.toFixed(2));

  }

  update(params: IAnimParams): void {


    this._velocity.add(this.acceleration);
    this.position.add(this._velocity);
    this.acceleration.mul(0);

    this._collisionBox = {
      xy: new Vector(this.position.x - 14, this.position.y - 6),
      wh: new Vector(28, 22)
    };

  }

  private degToRad(deg: number) {
    return deg * (Math.PI / 180.0);
  }


  gas(params: IAnimParams) {
    this.applyForce(new Vector(Math.sin(this.degToRad(this._angle)) * params.secondPart, Math.cos(this.degToRad(this._angle)) * -2 * params.secondPart));
    this._fuel -= 1;
  }

  gasAnimationEnable() {
    this.gasActivate = true;
  }

  gasAnimationDisable() {
    this.gasActivate = false;
  }


  rotateRight(params: IAnimParams) {
    if (this._angle >= 90) {
      this._angle = 90;
    } else {
      this._angle += 300 * params.secondPart;
    }

  }

  rotateLeft(params: IAnimParams) {
    if (this._angle <= -90) {
      this._angle = -90;
    } else {
      this._angle -= 300 * params.secondPart;
    }

  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }
}