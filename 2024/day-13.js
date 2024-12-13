import { readFileSync } from 'node:fs';

var input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
var input = readFileSync('./day-13-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   const machines = input
//     .split('\n\n')
//     .map((machine) => machine.match(/\d+/g).map(Number));
//   console.log(machines);
//
//   let sum = 0;
//   for (const [dx1, dy1, dx2, dy2, x, y] of machines) {
//     for (let i = 0; i <= 100; i++) {
//       const xRemain = x - dx1 * i;
//       if (xRemain % dx2 === 0) {
//         const j = xRemain / dx2;
//         if (dy1 * i + dy2 * j === y) {
//           sum += i * 3 + j;
//           break;
//         }
//       }
//     }
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
  console.log(input);
  const machines = input.split('\n\n').map((machine) => {
    const m = machine.match(/\d+/g).map(Number);
    m[4] += 10000000000000;
    m[5] += 10000000000000;
    return m;
  });
  console.log(machines);

  let sum = 0;
  for (const [dx1, dy1, dx2, dy2, x, y] of machines) {
    // dx1*a + dx2*b = x
    // dy1*a + dy2*b = y

    // dx1*dy2*a + dx2*dy2*b = x*dy2
    // dx2*dy1*a + dx2*dy2*b = y*dx2

    // dx1*dy2*a - dx2*dy1*a = x*dy2 - y*dx2
    // (dx1*dy2 - dx2*dy1)*a = x*dy2 - y*dx2
    // a = (x*dy2 - y*dx2) / (dx1*dy2 - dx2*dy1)

    const i = (x * dy2 - y * dx2) / (dx1 * dy2 - dx2 * dy1);
    if (Number.isInteger(i)) {
      const xRemain = x - dx1 * i;
      if (xRemain % dx2 === 0) {
        const j = xRemain / dx2;
        if (dy1 * i + dy2 * j === y) {
          sum += i * 3 + j;
        }
      }
    }
  }
  console.log(sum);
}
solve(input);
