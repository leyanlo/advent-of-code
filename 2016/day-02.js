const fs = require('fs');

var input = `ULL
RRDDD
LURDL
UUUUD`;
var input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();

const keypad = `1 2 3
4 5 6
7 8 9`
  .split('\n')
  .map((line) => line.split(' '));

function solve(input) {
  console.log(keypad);
  const instructions = input.split('\n').map((line) => line.split(''));
  console.log(instructions);
  let [y, x] = [1, 1];
  const code = [];
  for (const line of instructions) {
    for (const char of line) {
      const [dy, dx] = {
        U: [-1, 0],
        R: [0, 1],
        D: [1, 0],
        L: [0, -1],
      }[char];
      if (keypad[y + dy]?.[x + dx]) {
        y += dy;
        x += dx;
      }
    }
    code.push(keypad[y][x]);
  }
  console.log(code.join(''));
}
solve(input);
