const fs = require('fs');

const input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let count = 0;
  for (const line of input.split('\n')) {
    const [[a1, b1], [a2, b2]] = line
      .split(',')
      .map((elf) => elf.split('-').map(Number));
    if ((a1 <= a2 && b1 >= b2) || (a1 >= a2 && b1 <= b2)) {
      count++;
    }
  }
  console.log(count);
}
solve1(input);

function solve2(input) {
  let count = 0;
  for (const line of input.split('\n')) {
    const [[a1, b1], [a2, b2]] = line
      .split(',')
      .map((elf) => elf.split('-').map(Number));
    if ((a1 >= a2 && a1 <= b2) || (a2 >= a1 && a2 <= b1)) {
      count++;
    }
  }
  console.log(count);
}
solve2(input);
