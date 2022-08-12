const fs = require('fs');

var input = `5-8
0-2
4-7`,
  max = 9;
var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd(),
  max = 4294967295;

function solve(input) {
  const blacklist = input
    .split('\n')
    .map((line) => line.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]);
  console.log(blacklist);
  const candidates = blacklist
    .map(([, max]) => max + 1)
    .filter((ip) => ip <= max);
  for (const ip of candidates) {
    if (blacklist.every(([min, max]) => ip < min || ip > max)) {
      console.log(ip);
      break;
    }
  }
}
solve(input);
