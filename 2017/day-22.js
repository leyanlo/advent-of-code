const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const map = input
    .split('\n')
    .map((line) => line.split('').map((char) => char === '#'));
  let [y, x] = [(map.length - 1) / 2, (map[0].length - 1) / 2];
  let [dy, dx] = [-1, 0];
  let causedInfection = 0;
  for (let i = 0; i < 10000; i++) {
    map[y] = map[y] ?? [];
    [dy, dx] = map[y][x] ? [dx, -dy] : [-dx, dy];
    map[y][x] = !map[y][x];
    causedInfection += map[y][x];
    [y, x] = [y + dy, x + dx];
  }
  console.log(causedInfection);
}
solve1(input);

function solve2(input) {
  const map = input
    .split('\n')
    .map((line) => line.split('').map((char) => (char === '#') * 2));
  let [y, x] = [(map.length - 1) / 2, (map[0].length - 1) / 2];
  let [dy, dx] = [-1, 0];
  let causedInfection = 0;
  for (let i = 0; i < 10000000; i++) {
    map[y] = map[y] ?? [];
    const state = map[y][x] ?? 0;
    [dy, dx] = [
      [-dx, dy],
      [dy, dx],
      [dx, -dy],
      [-dy, -dx],
    ][state];
    map[y][x] = ((map[y][x] ?? 0) + 1) % 4;
    causedInfection += map[y][x] === 2;
    [y, x] = [y + dy, x + dx];
  }
  console.log(causedInfection);
}
solve2(input);
