import { readFileSync } from 'node:fs';

const input = readFileSync('./day-03-input.txt', 'utf8').trimEnd();

const dirs = [
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
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (/[^\d^.]/.test(map[i][j])) {
        for (let [di, dj] of dirs) {
          if (/\d/.test(map[i + di][j + dj])) {
            const digits = [map[i + di][j + dj]];
            for (let j2 = j + dj - 1; j2 >= 0; j2--) {
              if (/\d/.test(map[i + di][j2])) {
                digits.unshift(map[i + di][j2]);
                map[i + di][j2] = '.';
              } else {
                break;
              }
            }
            for (let j2 = j + dj + 1; j2 < map[i + di].length; j2++) {
              if (/\d/.test(map[i + di][j2])) {
                digits.push(map[i + di][j2]);
                map[i + di][j2] = '.';
              } else {
                break;
              }
            }
            sum += +digits.join('');
          }
        }
      }
    }
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  const map = input.split('\n').map((line) => line.split(''));
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (/\*/.test(map[i][j])) {
        const gears = [];
        for (let [di, dj] of dirs) {
          if (/\d/.test(map[i + di][j + dj])) {
            const digits = [map[i + di][j + dj]];
            for (let j2 = j + dj - 1; j2 >= 0; j2--) {
              if (/\d/.test(map[i + di][j2])) {
                digits.unshift(map[i + di][j2]);
                map[i + di][j2] = '.';
              } else {
                break;
              }
            }
            for (let j2 = j + dj + 1; j2 < map[i + di].length; j2++) {
              if (/\d/.test(map[i + di][j2])) {
                digits.push(map[i + di][j2]);
                map[i + di][j2] = '.';
              } else {
                break;
              }
            }
            gears.push(+digits.join(''));
          }
        }
        if (gears.length === 2) {
          sum += gears[0] * gears[1];
        }
      }
    }
  }
  console.log(sum);
}
solve2(input);
