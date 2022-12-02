const fs = require('fs');

var input = `A Y
B X
C Z`;
var input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();

const win = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const shape = { X: 1, Y: 2, Z: 3 };

// function solve(input) {
//   let score = 0;
//   for (const line of input.split('\n')) {
//     const [a, b] = line.split(' ');
//     score += win[a][b] + shape[b];
//   }
//   console.log(score)
// }
// solve(input);

const map2 = {
  A: { X: 'Z', Y: 'X', Z: 'Y' },
  B: { X: 'X', Y: 'Y', Z: 'Z' },
  C: { X: 'Y', Y: 'Z', Z: 'X' },
};

function solve(input) {
  let score = 0;
  for (const line of input.split('\n')) {
    let [a, b] = line.split(' ');
    b = map2[a][b];
    score += win[a][b] + shape[b];
  }
  console.log(score);
}
solve(input);
