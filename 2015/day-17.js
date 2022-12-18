require = require('esm')(module);
const fs = require('fs');

const $C = require('js-combinatorics');

const input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd(),
  total = 150;

function solve(input) {
  const sizes = input.split('\n').map(Number);
  let totalCombos = 0;
  let minCombos = 0;
  for (let n = 1; n <= sizes.length; n++) {
    const combinations = [...new $C.Combination(sizes, n)];
    const nCombos = combinations.filter(
      (combination) => combination.reduce((acc, n) => acc + n) === total
    ).length;
    minCombos = minCombos || nCombos;
    totalCombos += nCombos;
  }
  console.log(totalCombos);
  console.log(minCombos);
}
solve(input);
