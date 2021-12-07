const fs = require('fs');

var input = `16,1,2,0,4,2,7,1,2,14`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function cost(n) {
  return ((n + 1) * n) / 2;
}

function solve(input) {
  const positions = input
    .split(',')
    .map(Number)
    .sort((a, b) => a - b);
  console.log(positions);
  const mean = Math.round(
    positions.reduce((acc, p) => acc + p, 0) / positions.length
  );
  console.log(mean);
  console.log(positions.reduce((acc, p) => acc + cost(Math.abs(p - mean)), 0));
  console.log(
    positions.reduce((acc, p) => acc + cost(Math.abs(p - mean + 1)), 0)
  );
  console.log(
    positions.reduce((acc, p) => acc + cost(Math.abs(p - mean - 1)), 0)
  );
}
solve(input);
// function solve(input) {
//   const positions = input
//     .split(',')
//     .map(Number)
//     .sort((a, b) => a - b);
//   console.log(positions);
//   const median = positions[~~(positions.length / 2)];
//   console.log(median);
//   console.log(positions.reduce((acc, p) => acc + Math.abs(p - median), 0));
// }
// solve(input);
