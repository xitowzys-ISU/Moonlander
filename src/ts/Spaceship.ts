import Vector from "./utils/Vector";
import {IAnimFunction, IAnimParams} from "./utils/animation";
import Canvas from "./Canvas";

export default class Spaceship implements IAnimFunction{

  private canvas: Canvas = Canvas.Instance

  private position: Vector
  private velocity: Vector
  private acceleration: Vector
  private destroyed: boolean
  private fuel: number = 1000

  constructor(position: Vector) {
    this.position = position
    this.destroyed = false

    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
  }

  clear(): void {
  }

  draw(params: IAnimParams): void {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.rect(this.position.x, this.position.y, 10, 10)
    this.canvas.ctx.stroke();
  }

  update(params: IAnimParams): void {
    console.debug(this.velocity.toString());


    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
    this.acceleration.mul(0)

  }

  applyForce(force: Vector) {
    this.acceleration.add(force)
  }
}