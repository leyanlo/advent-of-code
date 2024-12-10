import { readFileSync } from 'node:fs';

const input = readFileSync('./day-10-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input, part) {
  const map = input.split('\n').map((line) => line.split('').map(Number));
  const trailheads = map
    .flatMap((row, i) => row.map((cell, j) => (cell === 0 ? [i, j] : null)))
    .filter(Boolean);
  let sum = 0;
  for (const [i0, j0] of trailheads) {
    let score = 0;
    const seen = map.map((row) => row.map(() => 0));
    const queue = [[i0, j0, -1]];
    while (queue.length !== 0) {
      const [i, j, h] = queue.pop();
      if (map[i]?.[j] !== h + 1 || (part === 1 && seen[i][j] === 1)) {
        continue;
      }
      seen[i][j] = 1;

      if (map[i][j] === 9) {
        score++;
      } else {
        queue.push(...DIRS.map(([di, dj]) => [i + di, j + dj, h + 1]));
      }
    }
    sum += score;
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
