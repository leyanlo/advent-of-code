const fs = require('fs');

var input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
var input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   for (let i = 0; i < input.length; i++) {
//     const chars = input.slice(i, i + 4);
//     if (new Set(chars).size === chars.length) {
//       console.log(i + 4);
//       break;
//     }
//   }
// }
// solve(input);
function solve(input) {
  console.log(input);
  for (let i = 0; i < input.length; i++) {
    const chars = input.slice(i, i + 14);
    if (new Set(chars).size === chars.length) {
      console.log(i + 14);
      break;
    }
  }
}
solve(input);
