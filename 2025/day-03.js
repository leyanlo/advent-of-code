import { readFileSync } from 'node:fs';

const input = readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function solve(input, nDigits) {
  const lines = input.split('\n').map((line) => line.split('').map(Number));
  let sum = 0;
  for (const line of lines) {
    const maxDigits = line.slice(-nDigits);
    const maxDigitsIdx = Array.from(
      { length: nDigits },
      (_, i) => line.length - nDigits + i
    );
    for (let i = 0; i < nDigits; i++) {
      for (let j = maxDigitsIdx[i]; j > (maxDigitsIdx[i - 1] ?? -1); j--) {
        if (line[j] >= maxDigits[i]) {
          maxDigits[i] = line[j];
          maxDigitsIdx[i] = j;
        }
      }
    }
    sum += +maxDigits.join('');
  }
  console.log(sum);
}
solve(input, 2);
solve(input, 12);
