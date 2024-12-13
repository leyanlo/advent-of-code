import { readFileSync } from 'node:fs';

const input = readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const machines = input.split('\n\n').map((machine) => {
    const m = machine.match(/\d+/g).map(Number);
    if (part === 2) {
      m[4] += 10000000000000;
      m[5] += 10000000000000;
    }
    return m;
  });

  let sum = 0;
  for (const [dx1, dy1, dx2, dy2, x, y] of machines) {
    // dx1*a + dx2*b = x
    // dy1*a + dy2*b = y

    // dx1*dy2*a + dx2*dy2*b = x*dy2
    // dx2*dy1*a + dx2*dy2*b = y*dx2

    // (dx1*dy2 - dx2*dy1)*a = x*dy2 - y*dx2
    // a = (x*dy2 - y*dx2) / (dx1*dy2 - dx2*dy1)

    const a = (x * dy2 - y * dx2) / (dx1 * dy2 - dx2 * dy1);
    if (Number.isInteger(a)) {
      const xRemain = x - dx1 * a;
      if (xRemain % dx2 === 0) {
        const b = xRemain / dx2;
        if (dy1 * a + dy2 * b === y) {
          sum += a * 3 + b;
        }
      }
    }
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
