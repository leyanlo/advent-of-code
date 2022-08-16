require = require('esm')(module);
const $C = require('js-combinatorics');
const fs = require('fs');

const input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve(input) {
  const matrix = {};
  for (const line of input.split('\n')) {
    const [left, right] = line.split(' = ');
    const [from, to] = left.split(' to ');
    matrix[from] = matrix[from] ?? {};
    matrix[to] = matrix[to] ?? {};
    matrix[from][to] = +right;
    matrix[to][from] = +right;
  }
  const permutations = [...new $C.Permutation(Object.keys(matrix))];
  const routes = permutations.map((p) =>
    p
      .slice(1)
      .map((_, i) => matrix[p[i]][p[i + 1]])
      .reduce((acc, n) => acc + n)
  );
  console.log(Math.min(...routes));
  console.log(Math.max(...routes));
}
solve(input);
