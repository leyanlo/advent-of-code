const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const depths = input.split('\n').map(Number);
  let count = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) count++;
  }
  console.log(count);
}
solve1(input);

function solve2(input) {
  const depths = input.split('\n').map(Number);
  let count = 0;
  for (let i = 3; i < depths.length; i++) {
    if (depths[i] > depths[i - 3]) count++;
  }
  console.log(count);
}
solve2(input);
