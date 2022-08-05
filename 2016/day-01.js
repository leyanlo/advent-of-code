const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function dist([y, x]) {
  return Math.abs(y) + Math.abs(x);
}

function solve(input) {
  const instructions = input.split(', ').map((instr) => {
    let [turn, ...steps] = instr.split('');
    steps = +steps.join('');
    return { turn, steps };
  });

  let [dy, dx] = [-1, 0];
  let [y, x] = [0, 0];
  const seen = new Set();
  let firstRepeat = null;
  for (let { turn, steps } of instructions) {
    [dy, dx] = {
      L: [-dx, dy],
      R: [dx, -dy],
    }[turn];
    for (let i = 0; i < steps; i++) {
      [y, x] = [y + dy, x + dx];
      const key = [y, x].join();
      if (firstRepeat === null && seen.has(key)) {
        firstRepeat = [y, x];
      }
      seen.add(key);
    }
  }
  console.log(dist([y, x]));
  console.log(dist(firstRepeat));
}
solve(input);
