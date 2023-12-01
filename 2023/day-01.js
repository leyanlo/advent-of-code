const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

const wordToNum = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function solve(input, part) {
  let sum = 0;
  for (let line of input.split('\n')) {
    let first, last;
    if (part === 1) {
      first = +line.match(/(\d)/)[1];
      last = +line.match(/.*(\d)/)[1];
    } else {
      first = line.match(
        /(one|two|three|four|five|six|seven|eight|nine|\d)/
      )[1];
      first = wordToNum[first] ?? +first;
      last = line.match(
        /.*(one|two|three|four|five|six|seven|eight|nine|\d)/
      )[1];
      last = wordToNum[last] ?? +last;
    }
    sum += 10 * first + last;
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
