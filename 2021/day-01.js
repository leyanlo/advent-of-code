const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

const debug = false;

function solve1(input) {
  const depths = input.split('\n').map(Number);
  debug && console.log(depths);
  let count = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) count++;
  }
  console.log(count);
}

solve1(input);

function solve2(input) {
  const depths = input.split('\n').map(Number);
  debug && console.log(depths);
  const sums = [];
  for (let i = 2; i < depths.length; i++) {
    sums.push(depths[i] + depths[i - 1] + depths[i - 2]);
  }
  debug && console.log(sums);
  let count = 0;
  for (let i = 1; i < sums.length; i++) {
    if (sums[i] > sums[i - 1]) count++;
  }
  console.log(count);
}

solve2(input);
