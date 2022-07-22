const fs = require('fs');

const input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function solve(input) {
  console.log(
    input
      .split('\n')
      .map((line) => line.split(' '))
      .filter((line) => new Set(line).size === line.length).length
  );
  console.log(
    input
      .split('\n')
      .map((line) =>
        line.split(' ').map((word) => word.split('').sort().join(''))
      )
      .filter((line) => new Set(line).size === line.length).length
  );
}
solve(input);
