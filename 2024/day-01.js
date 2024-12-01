import { readFileSync } from 'node:fs';

var input = `3   4
4   3
2   5
1   3
3   9
3   3`;
var input = readFileSync('./day-01-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const lines = input.split('\n');
//   console.log(lines);
//   const lefts = [];
//   const rights = [];
//   for (const line of lines) {
//     const [a, b] = line.split(/\s+/);
//     lefts.push(+a);
//     rights.push(+b);
//   }
//   lefts.sort((a, b) => a - b);
//   rights.sort((a, b) => a - b);
//   console.log(lefts, rights);
//   let sum = 0;
//   for (let i = 0; i < lefts.length; i++) {
//     sum += Math.abs(lefts[i] - rights[i]);
//   }
//   console.log(sum);
// }
// solve(input);
function solve(input) {
  const lines = input.split('\n');
  const lefts = [];
  const rights = {};
  for (const line of lines) {
    const [a, b] = line.split(/\s+/);
    lefts.push(+a);
    rights[b] ??= 0;
    rights[b]++;
  }
  console.log(lefts, rights);
  let sum = 0;
  for (let i = 0; i < lefts.length; i++) {
    const n = lefts[i];
    sum += n * (rights[lefts[i]] ?? 0);
  }
  console.log(sum);
}
solve(input);
