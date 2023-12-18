import { readFileSync } from 'node:fs';

import { Heap } from 'heap-js';

const input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

function solve(input, minMomentum, maxMomentum) {
  const map = input.split('\n').map((line) => line.split('').map(Number));

  const heap = new Heap((a, b) => a.heat - b.heat);

  heap.init([
    { i: 1, j: 0, heat: 0, dir: DIR.D, momentum: 1 },
    { i: 0, j: 1, heat: 0, dir: DIR.R, momentum: 1 },
  ]);
  const seen = map.map((row) => row.map(() => ({})));
  while (heap.length) {
    const { i, j, heat, dir, momentum } = heap.pop();
    const key = dir.concat(momentum).join();
    if (!map[i]?.[j] || seen[i][j][key]) {
      continue;
    }

    seen[i][j][key] = 1;

    if (
      i === map.length - 1 &&
      j === map[0].length - 1 &&
      momentum >= minMomentum
    ) {
      console.log(heat + map[i][j]);
      break;
    }

    const nextDirs = [];
    switch (momentum >= minMomentum && dir) {
      case DIR.U:
      case DIR.D:
        nextDirs.push(DIR.L);
        nextDirs.push(DIR.R);
        break;
      case DIR.L:
      case DIR.R:
        nextDirs.push(DIR.U);
        nextDirs.push(DIR.D);
    }
    if (momentum < maxMomentum) {
      nextDirs.push(dir);
    }
    for (const nextDir of nextDirs) {
      const [di, dj] = nextDir;
      heap.push({
        i: i + di,
        j: j + dj,
        heat: heat + map[i][j],
        dir: nextDir,
        momentum: 1 + +(dir === nextDir) * momentum,
      });
    }
  }
}
solve(input, 0, 3);
solve(input, 4, 10);
