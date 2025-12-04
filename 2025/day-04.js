import { readFileSync } from 'node:fs';

var input = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
var input = readFileSync('./day-04-input.txt', 'utf8').trimEnd();

const DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function solve1(input) {
  const map = input.split('\n').map((line) => line.split(''));
  let nRolls = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '@') {
        let count = 0;
        for (let [di, dj] of DIRS) {
          if (map[i + di]?.[j + dj] === '@') {
            count++;
          }
        }
        if (count < 4) {
          nRolls++;
        }
      }
    }
  }
  console.log(nRolls);
}
solve1(input);

function solve2(input) {
  const map = input.split('\n').map((line) => line.split(''));
  let nRolls = 0;
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === '@') {
          let count = 0;
          for (let [di, dj] of DIRS) {
            if (map[i + di]?.[j + dj] === '@') {
              count++;
            }
          }
          if (count < 4) {
            map[i][j] = '.';
            changed = true;
            nRolls++;
          }
        }
      }
    }
  }
  console.log(nRolls);
}
solve2(input);
