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
    [1, 0, 0, ['D'], 1],
    [0, 1, 0, ['R'], 1],
  ];
  const seen = map.map((row) => row.map(() => ({})));
  while (queue.length) {
    const [i, j, heat, dirs, momentum] = queue.shift();
    const d = dirs.at(-1);
    const key = d + momentum;
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
    switch (momentum >= minMomentum && d) {
      case 'U':
      case 'D':
        nextDirs.push('L');
        nextDirs.push('R');
        break;
      case 'L':
      case 'R':
        nextDirs.push('U');
        nextDirs.push('D');
    }
    if (momentum < maxMomentum) {
      nextDirs.push(d);
    }
    for (const dir of nextDirs) {
      const [di, dj] = DIRS[dir];
      queue.push([
        i + di,
        j + dj,
        heat + map[i][j],
        dirs.concat(dir),
        1 + +(dir === d) * momentum,
      ]);
    }
    queue.sort((a, b) => a[2] - b[2] || b[0] + b[1] - a[0] - a[1]);
  }
}

console.time();
solve(input, 0, 3);
console.timeEnd();

console.time();
solve(input, 4, 10);
console.timeEnd();
