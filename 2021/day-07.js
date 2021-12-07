const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function cost(n) {
  return ((n + 1) * n) / 2;
}

function solve(input) {
  const positions = input
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);
  const median = positions[~~(positions.length / 2)];
  const mean = ~~(positions.reduce((acc, p) => acc + p, 0) / positions.length);
  console.log(positions.reduce((acc, p) => acc + Math.abs(p - median), 0));
  console.log(positions.reduce((acc, p) => acc + cost(Math.abs(p - mean)), 0));
}
solve(input);
