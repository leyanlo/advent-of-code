const fs = require('fs');

const input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function solve(input) {
  const [r, c] = input.match(/\d+/g).map(Number);
  let n = 20151125;
  for (let i = 0; i < ((c + r - 1) * (c + r)) / 2 - r; i++) {
    n *= 252533;
    n %= 33554393;
  }
  console.log(n);
}
solve(input);
