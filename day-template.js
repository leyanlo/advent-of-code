import { readFileSync } from 'node:fs';

var input = ``;
var input = readFileSync('./day-xx-input.txt', 'utf8').trimEnd();

function solve(input) {
  console.log(input);
}

console.time();
solve(input);
console.timeEnd();
