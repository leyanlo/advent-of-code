const fs = require('fs');

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

function solve1(input) {
  function tick() {
    cycle++;
    if ((cycle + 20) % 40 === 0) {
      sum += cycle * x;
    }
  }

  const lines = input.split('\n');
  let sum = 0;
  let x = 1;
  let cycle = 0;
  for (const line of lines) {
    const [op, arg] = line.split(' ');
    if (op === 'noop') {
      tick();
    } else {
      tick();
      tick();
      x += +arg;
    }
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  function tick() {
    cycle++;
    const cursor = (cycle - 1) % 40;
    crt[~~((cycle - 1) / 40)][(cycle - 1) % 40] =
      cursor >= x - 1 && cursor <= x + 1 ? '#' : '.';
  }

  const lines = input.split('\n');
  let x = 1;
  let cycle = 0;
  const crt = [...Array(6)].map(() => [...Array(40)].fill('.'));
  for (const line of lines) {
    const [op, arg] = line.split(' ');
    if (op === 'noop') {
      tick();
    } else {
      tick();
      tick();
      x += +arg;
    }
  }
  console.log(crt.map((line) => line.join('')).join('\n'));
}
solve2(input);
