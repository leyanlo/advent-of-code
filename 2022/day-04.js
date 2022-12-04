const fs = require('fs');

var input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;
var input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let count = 0;
//   for (const line of input.split('\n')) {
//     const [[a1, b1], [a2, b2]] = line
//       .split(',')
//       .map((elf) => elf.split('-').map(Number));
//     if ((a1 <= a2 && b1 >= b2) || (a1 >= a2 && b1 <= b2)) {
//       count++
//     }
//   }
//   console.log(count)
// }
// solve(input);
function solve(input) {
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
solve(input);
