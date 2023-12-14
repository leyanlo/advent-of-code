import { readFileSync } from 'node:fs';

const input = readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function rotate(map) {
  return map[0].map((_, j) => map[j].map((_, i) => map[map.length - 1 - i][j]));
}

function move(map) {
  for (let j = 0; j < map[0].length; j++) {
    for (let i = 0; i < map.length; i++) {
      let i2 = i;
      while (map[i2][j] === 'O' && map[i2 - 1]?.[j] === '.') {
        map[i2][j] = '.';
        map[--i2][j] = 'O';
      }
    }
  }
}

function score(map) {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'O') {
        sum += map.length - i;
      }
    }
  }
  return sum;
}

function solve(input) {
  let map = input.split('\n').map((line) => line.split(''));

  const scores = [];
  // should be periodic by 1000 cycles
  for (let i = 0; i < 1000 * 4; i++) {
    move(map);
    i === 0 && console.log(score(map));
    map = rotate(map);
    if ((i + 1) % 4 === 0) {
      scores.push(score(map));
    }
  }

  let period = 0;
  // check the last 10 scores (largest period found should be correct)
  for (let i = 0; i < 10; i++) {
    const idx = scores.length - 1 - i;
    period = Math.max(period, idx - scores.lastIndexOf(scores[idx], idx - 1));
  }
  const remainder = 1000000000 % period;
  console.log(scores.at(-1 - period - (scores.length % period) + remainder));
}
solve(input);
