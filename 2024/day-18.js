import { readFileSync } from 'node:fs';

const input = readFileSync('./day-18-input.txt', 'utf8').trimEnd();
const w = 71;
const h = 71;
const n = 1024;

const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function solve(input) {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));

  function minSteps(n) {
    const map = Array.from({ length: h }).map(() =>
      Array.from({ length: w }).fill(1)
    );
    for (let i = 0; i < n; i++) {
      const [x, y] = coords[i];
      map[y][x] = 0;
    }

    const minSteps = map.map((row) => row.map(() => Number.MAX_SAFE_INTEGER));
    let queue = [[0, 0, 0]];
    while (queue.length !== 0) {
      const nextQueue = [];
      for (const [x, y, s] of queue) {
        if (!map[y]?.[x] || s >= minSteps[y][x]) {
          continue;
        }
        minSteps[y][x] = s;

        nextQueue.push(...DIRS.map(([dx, dy]) => [x + dx, y + dy, s + 1]));
      }
      queue = nextQueue;
    }
    return minSteps[h - 1][w - 1];
  }
  console.log(minSteps(n));

  for (let n2 = n + 1; n2 < coords.length; n2++) {
    if (minSteps(n2) === Number.MAX_SAFE_INTEGER) {
      console.log(coords[n2 - 1].join());
      break;
    }
  }
}
solve(input);
