const fs = require('fs');

var input = `X(8x2)(3x3)ABCY`;
var input = `(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const sequences = [];
//   for (let i = 0; i < input.length; i++) {
//     const char = input[i];
//     if (char === '(') {
//       const end = input.indexOf(')', i);
//       const [nChars, times] = input
//         .slice(i + 1, end)
//         .split('x')
//         .map(Number);
//       const sequence = input.slice(end + 1, end + 1 + nChars);
//       for (let j = 0; j < times; j++) {
//         sequences.push(sequence);
//       }
//       i += end - i + nChars;
//     } else {
//       sequences.push(char);
//     }
//   }
//   console.log(sequences.join('').length);
// }
// solve(input);

function decompress(input) {
  let length = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '(') {
      const end = input.indexOf(')', i);
      const [nChars, times] = input
        .slice(i + 1, end)
        .split('x')
        .map(Number);
      length += times * decompress(input.slice(end + 1, end + 1 + nChars));
      i += end - i + nChars;
    } else {
      length++;
    }
  }
  return length;
}
function solve(input) {
  console.log(decompress(input));
}
solve(input);
