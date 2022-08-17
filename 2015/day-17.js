require = require('esm')(module);
const $C = require('js-combinatorics');
const fs = require('fs');

var input = `20
15
10
5
5`,
  total = 25;
var input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd(),
  total = 150;

function solve(input) {
  const sizes = input.split('\n').map(Number);
  let nCombos = 0;
  for (let n = 1; n <= sizes.length; n++) {
    const combinations = [...new $C.Combination(sizes, n)];
    nCombos += combinations.filter(
      (combination) => combination.reduce((acc, n) => acc + n) === total
    ).length;
  }
  console.log(nCombos);
}
solve(input);
