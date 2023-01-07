import "../css/styles.css";

import Game from "./core/Game";
import Canvas from "./core/Canvas";
import { animation, IAnimParams } from "./utils/animation";

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

