const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve(input) {
  const elves = input.split('\n\n').map((elf) =>
    elf
      .split('\n')
      .map(Number)
      .reduce((acc, n) => acc + n)
  );
  console.log(Math.max(...elves));
  console.log(
    elves
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, n) => acc + n)
  );
}
solve(input);
