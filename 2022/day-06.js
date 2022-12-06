const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const n = part === 2 ? 14 : 4;
  for (let i = 0; i < input.length; i++) {
    const chars = input.slice(i, i + n);
    if (new Set(chars).size === chars.length) {
      console.log(i + n);
      break;
    }
  }
}
solve(input, 1);
solve(input, 2);
