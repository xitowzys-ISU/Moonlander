export function randomBetweenInteger(min: number, max: number) {
  let rand: number = min + Math.random() * (max + 1 - min);
  return Math.round(rand);
}

export function randomBetweenFloat(min: number, max: number) {
  let rand: number = min + Math.random() * (max + 1 - min);
  return rand;
}
