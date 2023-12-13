import { readFileSync } from 'node:fs';

const input = readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function toDec(str) {
  let n = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.at(-1 - i);
    n += ('=-012'.indexOf(char) - 2) * 5 ** i;
  }
  return n;
}

function toSnafu(n) {
  let str = [];
  while (n > 0) {
    str.unshift('012=-'[n % 5]);
    n = Math.round(n / 5);
  }
  return str.join('');
}

function solve(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    sum += toDec(line);
  }
  console.log(toSnafu(sum));
}
solve(input);
