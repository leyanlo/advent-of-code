require = require('esm')(module);
const $C = require('js-combinatorics');
const fs = require('fs');

const input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const weights = input.split('\n').map(Number);
  const sum = weights.reduce((acc, n) => acc + n);
  const target = sum / (part === 1 ? 3 : 4);
  let combos = [];
  let n = 2;
  while (!combos.length) {
    combos = [...new $C.Combination(weights, n)].filter(
      (combo) => combo.reduce((acc, n) => acc + n) === target
    );
    n++;
  }
  console.log(
    combos
      .map((combo) => combo.reduce((acc, n) => acc * n))
      .sort((a, b) => a - b)[0]
  );
}

solve(input, 1);
solve(input, 2);
