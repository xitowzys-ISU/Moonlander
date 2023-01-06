export interface IAnimFunction {
  clear(): void;

  draw(params: IAnimParams): void;

  update(params: IAnimParams): void;
}

export interface IAnimParams {
  timestamp: number,
  pTimestamp: number,
  diff: number,
  fps: number,
  secondPart: number
}


export function animation(obj: IAnimFunction): void {

  const { clear, update, draw }: IAnimFunction = obj;

  let pTimestamp: number = 0;

  requestAnimationFrame(tick);

  function tick(timestamp: number): void {
    requestAnimationFrame(tick);

    const diff: number = timestamp - pTimestamp;
    pTimestamp = timestamp;
    const fps: number = 1000 / diff;
    const secondPart: number = diff / 1000;

    let now = Date.now();

    const params: IAnimParams = {
      timestamp,
      pTimestamp,
      diff,
      fps,
      secondPart
    };


    update(params);
    clear();
    draw(params);
  }
}