const fs = require('fs');

const input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const steps = +input;
  const buffer = [0];
  let pos = 0;
  for (let i = 1; i <= 2017; i++) {
    pos = (pos + 1 + steps) % buffer.length;
    buffer.splice(pos + 1, 0, i);
  }
  console.log(buffer[buffer.indexOf(2017) + 1]);
}
solve1(input);

function solve2(input) {
  const steps = +input;
  let pos = 0;
  let afterZero = 0;
  for (let i = 1; i <= 50000000; i++) {
    pos = ((pos + steps) % i) + 1;
    if (pos === 1) {
      afterZero = i;
    }
  }
  console.log(afterZero);
}
solve2(input);
