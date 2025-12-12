import { readFileSync } from 'node:fs';

const input = readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input) {
  const regions = input.split('\n\n').at(-1).split('\n');

  let count = 0;
  for (const region of regions) {
    const [w, h, ...shapeCounts] = region.matchAll(/\d+/g).map((m) => +m);
    const regionArea = w * h;
    const maxShapeArea = shapeCounts.reduce((acc, c) => acc + 9 * c, 0);
    count += maxShapeArea <= regionArea;
  }
  console.log(count);
}

solve(input);
