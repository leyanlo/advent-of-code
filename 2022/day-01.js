const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve(input) {
  const elves = input
    .split('\n\n')
    .map((elf) =>
      elf
        .split('\n')
        .map(Number)
        .reduce((acc, n) => acc + n)
    )
    .sort((a, b) => b - a);
  console.log(elves[0]);
  console.log(elves.slice(0, 3).reduce((acc, n) => acc + n));
}
solve(input);
