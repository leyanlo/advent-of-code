import { readFileSync } from 'node:fs';

const input = readFileSync('./day-04-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function solve1(input) {
  const lines = input.split('\n');
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 'X') {
        outer: for (const [di, dj] of DIRS) {
          let i2 = i + di;
          let j2 = j + dj;
          for (const char of 'MAS') {
            if (lines[i2]?.[j2] !== char) {
              continue outer;
            }
            i2 += di;
            j2 += dj;
          }
          count++;
        }
      }
    }
  }
  console.log(count);
}
solve1(input);

const FLIP = {
  M: 'S',
  S: 'M',
};

const DIRS2 = [
  [1, 1],
  [1, -1],
];

function solve2(input) {
  const lines = input.split('\n');
  let count = 0;
  const seen = lines.map((line) => line.split('').fill(0));
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const char = lines[i][j];
      if (char === 'M' || char === 'S') {
        for (const [di, dj] of DIRS2) {
          let i2 = i + di;
          let j2 = j + dj;
          if (lines[i2]?.[j2] !== 'A') {
            continue;
          }

          i2 += di;
          j2 += dj;
          if (lines[i2]?.[j2] !== FLIP[char]) {
            continue;
          }

          if (seen[i2 - di][j2 - dj]) {
            count++;
          } else {
            seen[i2 - di][j2 - dj] = 1;
          }
        }
      }
    }
  }
  console.log(count);
}
solve2(input);
