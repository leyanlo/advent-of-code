const fs = require('fs');

var input = `..#
#..
...`;
var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = input
    .split('\n')
    .map((line) => line.split('').map((char) => char === '#'));
  let [y, x] = [(map.length - 1) / 2, (map[0].length - 1) / 2];
  let [dy, dx] = [-1, 0];
  let causedInfection = 0;
  for (let i = 0; i < 10000; i++) {
    map[y] = map[y] ?? [];
    const infected = !!map[y][x];
    causedInfection += !infected;
    [dy, dx] = infected ? [dx, -dy] : [-dx, dy];
    map[y][x] = !map[y][x];
    [y, x] = [y + dy, x + dx];
  }
  console.log(causedInfection);
}
solve(input);
