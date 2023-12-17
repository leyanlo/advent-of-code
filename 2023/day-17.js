import { readFileSync } from 'node:fs';

const input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

const DIRS = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

function solve(input, minMomentum, maxMomentum) {
  const map = input.split('\n').map((line) => line.split('').map(Number));

  const queue = [
    [1, 0, 0, DIRS.D, 1],
    [0, 1, 0, DIRS.R, 1],
  ];
  const seen = map.map((row) => row.map(() => ({})));
  while (queue.length) {
    const [i, j, heat, dir, momentum] = queue.shift();
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
      case DIRS.U:
      case DIRS.D:
        nextDirs.push(DIRS.L);
        nextDirs.push(DIRS.R);
        break;
      case DIRS.L:
      case DIRS.R:
        nextDirs.push(DIRS.U);
        nextDirs.push(DIRS.D);
    }
    if (momentum < maxMomentum) {
      nextDirs.push(dir);
    }
    for (const nextDir of nextDirs) {
      const [di, dj] = nextDir;
      queue.push([
        i + di,
        j + dj,
        heat + map[i][j],
        nextDir,
        1 + +(dir === nextDir) * momentum,
      ]);
    }
    queue.sort((a, b) => a[2] - b[2]);
  }
}

console.time();
solve(input, 0, 3);
console.timeEnd();

console.time();
solve(input, 4, 10);
console.timeEnd();
