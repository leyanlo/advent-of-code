const fs = require('fs');

var input = `12131415`;
var input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve(input, offset) {
  console.log(input);
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i] * (input[i] === input[(i + offset) % input.length]);
  }
  console.log(sum);
}
solve(input, 1);
solve(input, input.length / 2);
