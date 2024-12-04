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
  for (let i = 1; i < lines.length - 1; i++) {
    outer: for (let j = 1; j < lines[0].length - 1; j++) {
      if (lines[i][j] === 'A') {
        for (const [di, dj] of DIRS2) {
          const char1 = lines[i + di][j + dj];
          if (char1 !== 'M' && char1 !== 'S') {
            continue outer;
          }

          const char2 = lines[i - di][j - dj];
          if (char2 !== FLIP[char1]) {
            continue outer;
          }
        }
        count++;
      }
    }
  }
  console.log(count);
}
solve2(input);
