const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

function solve(input) {
  const lines = input.split('\n');
  console.log(
    lines
      .map(
        (line) =>
          line.length - line.replace(/(\\\\|\\"|\\x..)/g, ' ').length + 2
      )
      .reduce((acc, n) => acc + n)
  );
  console.log(
    lines
      .map((line) => line.replace(/(["\\])/g, '\\$1').length + 2 - line.length)
      .reduce((acc, n) => acc + n)
  );
}
solve(input);
