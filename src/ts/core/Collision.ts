import Spaceship from "./Spaceship";
import Terrain from "./Terrain";
import Vector from "../utils/Vector";

export default class Collision {

  private spaceship: Spaceship;
  private terrain: Terrain;

  constructor(spaceship: Spaceship, terrain: Terrain) {
    this.spaceship = spaceship;
    this.terrain = terrain;

  }

  checkCollision(): number {
    // Проверяем все пересечения с линиями
    for (let i = 0; i < this.terrain.pointsAmount - 1; i++) {

      let col = this.lineRect(
        this.terrain.points[i],
        this.terrain.points[i + 1],
        this.spaceship.collisionBox.xy,
        this.spaceship.collisionBox.wh
      );

      if (col) {
        return i;
      }
    }

    return -1;
  }

  checkFail(id: number): boolean {
    let upOrDownLine: number = this.terrain.points[id + 1].y - this.terrain.points[id].y;

    // Проверяем линия для посадки или нет
    if (!this.terrain.pointsSafeZoneId.includes(id)) {
      console.log("DETECT FAIL ZONE");
      return true;
    }

    // Проверяем угол
    if (upOrDownLine < 0) {
      if (!(this.spaceship.angle > -25 && this.spaceship.angle < 0)) {
        console.log("DETECT FAIL ANGLE");
        return true;
      }
    } else {
      if (!(this.spaceship.angle < 25 && this.spaceship.angle > 0)) {
        console.log("DETECT FAIL ANGLE");
        return true;
      }
    }

    if (this.spaceship.velocity.y > 0.25 || this.spaceship.velocity.x >  0.70  ) {
      console.log("DETECT FAIL VELOCITY");
      console.log(this.spaceship.velocity.y);
      console.log(this.spaceship.velocity.x) ;
      return true;
    }

    console.log(this.spaceship.velocity.y);

    return false;
  }

  private lineRect(vectorLine1: Vector, vectorLine2: Vector, vectorRect1: Vector, vectorRect2: Vector): boolean {


    let left = this.lineLine(vectorLine1, vectorLine2, vectorRect1, new Vector(vectorRect1.x, vectorRect1.y + vectorRect2.y));

    let right = this.lineLine(vectorLine1, vectorLine2, new Vector(vectorRect1.x + vectorRect2.x, vectorRect1.y), new Vector(vectorRect1.x + vectorRect2.x, vectorRect1.y + vectorRect2.y));
    let top = this.lineLine(vectorLine1, vectorLine2, vectorRect1, new Vector(vectorRect1.x + vectorRect2.x, vectorRect1.y));
    let bottom = this.lineLine(vectorLine1, vectorLine2, new Vector(vectorRect1.x, vectorRect1.y + vectorRect2.y), new Vector(vectorRect1.x + vectorRect2.x, vectorRect1.y + vectorRect2.y));

    return left || right || top || bottom;
  }

  private lineLine(vectorLine1: Vector, vectorLine2: Vector, vectorLine3: Vector, vectorLine4: Vector): boolean {

    let denominator = ((vectorLine2.x - vectorLine1.x) * (vectorLine4.y - vectorLine3.y)) - ((vectorLine2.y - vectorLine1.y) * (vectorLine4.x - vectorLine3.x));

    let numerator1 = ((vectorLine1.y - vectorLine3.y) * (vectorLine4.x - vectorLine3.x)) - ((vectorLine1.x - vectorLine3.x) * (vectorLine4.y - vectorLine3.y));

    let numerator2 = ((vectorLine1.y - vectorLine3.y) * (vectorLine2.x - vectorLine1.x)) - ((vectorLine1.x - vectorLine3.x) * (vectorLine2.y - vectorLine1.y));

    if (denominator == 0) return numerator1 == 0 && numerator2 == 0;

    let r = numerator1 / denominator;
    let s = numerator2 / denominator;

    return (r >= 0 && r <= 1) && (s >= 0 && s <= 1);
  }

}