import { readFileSync } from 'node:fs';

const input = readFileSync('./day-12-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const DIR_TO_IDX = {
  0: { 1: 0, '-1': 2 },
  1: { 0: 1 },
  '-1': { 0: 3 },
};

const IDX_TO_DIR = [
  [1, 0],
  [0, 1],
  [1, 0],
  [0, 1],
];

function solve(input, part) {
  const map = input.split('\n').map((line) => line.split(''));
  const perims = map.map((row) => row.map(() => Array(4).fill(1)));
  const seen = map.map((row) => row.map(() => 0));

  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (seen[i][j] === 1) {
        continue;
      }

      const char = map[i][j];
      const queue = [[i, j]];
      const region = [];
      while (queue.length !== 0) {
        const [i2, j2, prevI, prevJ] = queue.pop();
        if (map[i2]?.[j2] !== char) {
          continue;
        }

        if (perims[prevI]?.[prevJ] !== undefined) {
          const [di, dj] = [i2 - prevI, j2 - prevJ];
          // remove previous perimeter touching this cell
          perims[prevI][prevJ][DIR_TO_IDX[di][dj]] = 0;
        }

        if (seen[i2][j2] === 1) {
          continue;
        }
        seen[i2][j2] = 1;
        region.push([i2, j2]);

        queue.push(...DIRS.map(([di, dj]) => [i2 + di, j2 + dj, i2, j2]));
      }

      let perim = 0;
      for (const [i, j] of region) {
        const char = map[i][j];
        const validPerims = perims[i][j].filter((p, pIdx) => {
          if (part === 1) {
            return true;
          }

          const [di, dj] = IDX_TO_DIR[pIdx];
          if (
            map[i + di]?.[j + dj] === char &&
            perims[i + di][j + dj][pIdx] === 1
          ) {
            // return false if perim can be combined with neighbor
            return false;
          }
          return true;
        });
        perim += validPerims.reduce((acc, n) => acc + n, 0);
      }
      sum += region.length * perim;
    }
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
