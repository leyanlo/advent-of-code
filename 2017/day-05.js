const fs = require('fs');

const input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const offsets = input.split('\n').map(Number);
  let step = 0;
  let i = 0;
  while (0 <= i && i < offsets.length) {
    i += part === 2 && offsets[i] >= 3 ? offsets[i]-- : offsets[i]++;
    step++;
  }
  console.log(step);
}
solve(input, 1);
solve(input, 2);
