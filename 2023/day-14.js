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

  const seen = [];
  let period;
  let i = 0;
  do {
    move(map);
    i === 0 && console.log(score(map));
    map = rotate(map);
    if ((i + 1) % 4 === 0) {
      const hash = JSON.stringify(map);
      const lastIdx = seen.lastIndexOf(hash, seen.length - 1);
      if (lastIdx !== -1) {
        period = seen.length - lastIdx;
        break;
      }
      seen.push(hash);
    }
  } while (++i);

  const offset = (1000000000 - seen.length) % period;
  console.log(score(JSON.parse(seen.at(-1 + (offset && offset - period)))));
}
solve(input);
