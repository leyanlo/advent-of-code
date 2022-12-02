const fs = require('fs');

const input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();

const outcomeScore = {
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const shapeScore = { X: 1, Y: 2, Z: 3 };

const chooseShape = {
  A: { X: 'Z', Y: 'X', Z: 'Y' },
  B: { X: 'X', Y: 'Y', Z: 'Z' },
  C: { X: 'Y', Y: 'Z', Z: 'X' },
};

function solve(input, part) {
  let score = 0;
  for (const line of input.split('\n')) {
    let [a, b] = line.split(' ');
    if (part === 2) b = chooseShape[a][b];
    score += outcomeScore[a][b] + shapeScore[b];
  }
  console.log(score);
}
solve(input, 1);
solve(input, 2);
