import { animation, IAnimParams } from "./utils/animation";
import Vector from "./utils/Vector";
import Canvas from "./Canvas";
import "../css/styles.css";
import Game from "./Game";
import PerlinNoise from "./utils/PerlinNoise";

// let vectors: Vector = new Vector(1, 1);
// vectors.mul(10)
// console.log(vectors.toString());

// let perlin = new PerlinNoise()
// console.log(perlin.perlinNoise(3.14, 42, 7));

let canvas: Canvas;

let game: Game;

let initApp = new Promise<void>((resolve, reject) => {
  canvas = Canvas.Instance;
  game = new Game();


  resolve();
});

initApp.then(data => {
  animation({
    clear: function(): void {
      game.clear();
    },
    draw: function(params: IAnimParams): void {
      game.draw(params);
    },
    update: function(params: IAnimParams): void {
      game.update(params);
      canvas.updateSize();
    }
  });
});

