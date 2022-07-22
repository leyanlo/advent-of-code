const fs = require('fs');

var input = `91212129`;
var input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve(input) {
  console.log(input);
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i] * (input[i] === input[(i + 1) % input.length]);
  }
  console.log(sum);
}
solve(input);
