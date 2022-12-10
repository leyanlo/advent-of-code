const fs = require('fs');

var input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;
var input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const lines = input.split('\n');
//   let sum = 0;
//   let x = 1;
//   let cycle = 1;
//   for (const line of lines) {
//     const [op, arg] = line.split(' ');
//     if (op === 'noop') {
//       cycle++;
//       if ((cycle + 20) % 40 === 0) {
//         console.log(cycle, x, cycle * x);
//         sum += cycle * x;
//       }
//       continue;
//     }
//
//     cycle++;
//     if ((cycle + 20) % 40 === 0) {
//       console.log(cycle, x, cycle * x);
//       sum += cycle * x;
//     }
//     x += +arg;
//     cycle++;
//     if ((cycle + 20) % 40 === 0) {
//       console.log(cycle, x, cycle * x);
//       sum += cycle * x;
//     }
//   }
//   console.log(sum);
// }
// solve(input);
function update(cycle, crt, x) {
  const pos = (cycle-1) % 40;
  crt[~~((cycle-2) / 40)][(cycle-2) % 40] = x - 1 <= pos && x + 1 >= pos ? '#' : '.';
}

function solve(input) {
  const lines = input.split('\n');
  let x = 1;
  let cycle = 1;
  const crt = [...Array(6)].map(() => [...Array(40)].fill('.'));
  // console.log(image.map((line) => line.join('')).join('\n'));
  for (const line of lines) {
    const [op, arg] = line.split(' ');
    if (op === 'noop') {
      cycle++;
      update(cycle, crt, x);
      continue;
    }

    cycle++;
    update(cycle, crt, x);
    x += +arg;
    cycle++;
    update(cycle, crt, x);
  }
  console.log(crt.map((line) => line.join('')).join('\n'));
}
solve(input);
