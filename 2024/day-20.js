import { readFileSync } from 'node:fs';

const input = readFileSync('./day-20-input.txt', 'utf8').trimEnd();
const T_MIN_SAVE = 100;

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input, tMaxCheat) {
  let start;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [i, j];
      }
      return char === '#' ? 0 : 1;
    })
  );

  const tMax = map.flat().filter(Boolean).length - 1;

  let curr = start;
  let t = tMax;
  const times = map.map((row) => row.map(() => Number.MAX_SAFE_INTEGER));
  while (t >= 0) {
    const [i, j] = curr;
    times[i][j] = t;
    t--;
    for (const [di, dj] of DIRS) {
      const i2 = i + di;
      const j2 = j + dj;
      if (map[i2][j2] && times[i2][j2] === Number.MAX_SAFE_INTEGER) {
        curr = [i + di, j + dj];
        break;
      }
    }
  }

  const cheats = {};
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        continue;
      }

      const t = times[i][j];
      for (let i2 = i - tMaxCheat; i2 <= i + tMaxCheat; i2++) {
        const di = Math.abs(i2 - i);
        for (let j2 = j - (tMaxCheat - di); j2 <= j + (tMaxCheat - di); j2++) {
          const dj = Math.abs(j2 - j);
          const dist = di + dj;
          const t2 = times[i2]?.[j2] ?? Number.MAX_SAFE_INTEGER;
          const tSaved = t - t2 - dist;
          if (tSaved > 0) {
            cheats[tSaved] = (cheats[tSaved] ?? 0) + 1;
          }
        }
      }
    }
  }
  console.log(
    Object.entries(cheats)
      .filter(([t]) => t >= T_MIN_SAVE)
      .map(([, c]) => c)
      .reduce((acc, c) => acc + c)
  );
}
solve(input, 2);
solve(input, 20);
