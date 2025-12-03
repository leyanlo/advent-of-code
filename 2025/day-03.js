import { readFileSync } from 'node:fs';

const input = readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function solve(input, nDigits) {
  const lines = input.split('\n').map((line) => line.split('').map(Number));
  let sum = 0;
  for (const line of lines) {
    const maxDigits = [];
    let left = 0;
    for (let i = 0; i < nDigits; i++) {
      const right = line.length - nDigits + i;
      const maxDigit = Math.max(...line.slice(left, right + 1));
      maxDigits.push(maxDigit);
      left = line.indexOf(maxDigit, left) + 1;
    }
    sum += +maxDigits.join('');
  }
  console.log(sum);
}
solve(input, 2);
solve(input, 12);
