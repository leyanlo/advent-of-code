const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

function process(tree, i, entries, values) {
  const nChildren = tree[i++];
  const nEntries = tree[i++];
  const childValues = [];
  for (let j = 0; j < nChildren; j++) {
    i = process(tree, i, entries, childValues);
  }
  const subValues = [];
  for (let j = 0; j < nEntries; j++) {
    const entry = tree[i++];
    entries.push(entry);
    subValues.push(nChildren ? childValues[entry - 1] ?? 0 : entry);
  }
  values.push(subValues.reduce((acc, n) => acc + n));
  return i;
}

function solve(input) {
  const tree = input.split(' ').map(Number);
  const entries = [];
  const values = [];
  process(tree, 0, entries, values);
  console.log(entries.reduce((acc, n) => acc + n));
  console.log(values.reduce((acc, n) => acc + n));
}
solve(input);
