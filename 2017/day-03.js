const fs = require('fs');

var input = `1024`;
var input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function solve(input) {
  const n = +input;
  const r = ~~((Math.sqrt(n - 1) + 1) / 2);
  const corner = (2 * r + 1) ** 2;
  console.log(r + Math.abs(((corner - n) % (2 * r)) - r));
}
solve(input);
