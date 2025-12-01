import { readFileSync } from 'node:fs';

var input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
var input = readFileSync('./day-01-input.txt', 'utf8').trimEnd();
// 5949 wrong
// 5936 wrong
// 5858 wrong

// function solve1(input) {
//   console.log(input);
//   let dial = 50
//   let nZeros = 0;
//   for (let line of input.split('\n')) {
//     let turn = line[0];
//     let amount = parseInt(line.slice(1), 10);
//     if (turn === 'L') {
//       dial -= amount;
//     } else if (turn === 'R') {
//       dial += amount;
//     }
//     dial = (dial + 100) % 100;
//     if (dial === 0) {
//       nZeros += 1;
//     }
//   }
//   console.log(nZeros);
// }
// solve1(input);

function solve2(input) {
  console.log(input);
  let dial = 50
  let nZeros = 0;
  for (let line of input.split('\n')) {
    let turn = line[0];
    let amount = parseInt(line.slice(1), 10);
    const dir = turn === 'L' ? -1 : 1;
    for (let i = 0; i < amount; i++) {
      dial += dir;
      if (dial < 0) {
        dial += 100;
      } else if (dial >= 100) {
        dial -= 100;
      }
      if (dial === 0) {
        nZeros += 1;
      }
    }
  }
  console.log(nZeros);
}
solve2(input);
