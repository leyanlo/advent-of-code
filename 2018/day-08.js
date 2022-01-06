const fs = require('fs');

var input = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;
var input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

// function process(tree, i, entries) {
//   const nChildren = tree[i++];
//   const nEntries = tree[i++];
//   for (let j = 0; j < nChildren; j++) {
//     i = process(tree, i, entries);
//   }
//   for (let j = 0; j < nEntries; j++) {
//     entries.push(tree[i++]);
//   }
//   return i;
// }
//
// function solve(input) {
//   const tree = input.split(' ').map(Number);
//   const entries = [];
//   process(tree, 0, entries);
//   console.log(entries.reduce((acc, n) => acc + n));
// }
// solve(input);
function process(tree, i, values) {
  const nChildren = tree[i++];
  const nEntries = tree[i++];
  const childValues = [];
  for (let j = 0; j < nChildren; j++) {
    i = process(tree, i, childValues);
  }
  const subValues = [];
  for (let j = 0; j < nEntries; j++) {
    const entry = tree[i++];
    subValues.push(nChildren ? childValues[entry - 1] ?? 0 : entry);
  }
  values.push(subValues.reduce((acc, n) => acc + n));
  return i;
}

function solve(input) {
  const tree = input.split(' ').map(Number);
  const values = [];
  process(tree, 0, values);
  console.log(values.reduce((acc, n) => acc + n));
}
solve(input);
