const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const offset = part === 1 ? 1 : input.length / 2;
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i] * (input[i] === input[(i + offset) % input.length]);
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
