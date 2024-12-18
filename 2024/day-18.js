import { readFileSync } from 'node:fs';

const input = readFileSync('./day-18-input.txt', 'utf8').trimEnd();
const size = 71;
const n = 1024;

const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function binarySearch(start, end, check) {
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (check(mid)) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }
  return start;
}

function solve(input) {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));

  function minSteps(n) {
    const map = Array.from({ length: size }).map(() =>
      Array.from({ length: size }).fill(1)
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
    return minSteps[size - 1][size - 1];
  }
  console.log(minSteps(n));

  const firstFail = binarySearch(
    n + 1,
    coords.length - 1,
    (n) => minSteps(n) === Number.MAX_SAFE_INTEGER
  );
  console.log(coords[firstFail - 1].join());
}
solve(input);
