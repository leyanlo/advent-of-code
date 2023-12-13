import { readFileSync } from 'node:fs';

const input = readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const n = part === 2 ? 14 : 4;
  for (let i = 0; i < input.length; i++) {
    if (new Set(input.substring(i, i + n)).size === n) {
      console.log(i + n);
      break;
    }
  }
}
solve(input, 1);
solve(input, 2);
