import { readFileSync } from 'node:fs';

var input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
var input = readFileSync('./day-07-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let sum = 0;
//   for (const line of input.split('\n')) {
//     const [left, ...right] = line.match(/\d+/g).map(Number);
//     console.log({ left, right });
//
//     let combos = [right[0]];
//     for (let i = 1; i < right.length; i++) {
//       const n = right[i];
//       const nextCombos = [];
//       for (const combo of combos) {
//         nextCombos.push(combo + n);
//         nextCombos.push(combo * n);
//       }
//       combos = nextCombos;
//     }
//     if (combos.some((combo) => eval(combo) === left)) {
//       console.log(left);
//       sum += left;
//     }
//   }
//   console.log(sum);
// }
// solve(input);
function solve(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    const [left, ...right] = line.match(/\d+/g).map(Number);
    console.log({ left, right });

    let combos = [right[0]];
    for (let i = 1; i < right.length; i++) {
      const n = right[i];
      const nextCombos = [];
      for (const combo of combos) {
        nextCombos.push(combo + n);
        nextCombos.push(combo * n);
        nextCombos.push(parseInt(combo.toString() + n.toString(), 10));
      }
      combos = nextCombos;
    }
    if (combos.some((combo) => eval(combo) === left)) {
      console.log(left);
      sum += left;
    }
  }
  console.log(sum);
}
solve(input);
