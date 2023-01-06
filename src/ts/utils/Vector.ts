export default class Vector {

  private _x: number
  private _y: number

  public constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  public toString(): string {
    return `Vector(x = ${this._x}, y = ${this._y})`
  }

  public add(other: Vector): void {
    this._x += other._x
    this._y += other._y
  }

  public sub(other: Vector): void {
    this._x -= other._x
    this._y -= other._y
  }

  public mul(value: number): void {
    this._x *= value
    this._y *= value
  }

  public div(value: number): void {
    this._x /= value
    this._y /= value
  }

  public equels(other: Vector): boolean {
    return this._x == other._x && this._y == other._y
  }

  public mag(): number {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  }

  public norm(): void {
    let m = this.mag()

    if (m > 0) {
      this.div(m)
    }
  }


}