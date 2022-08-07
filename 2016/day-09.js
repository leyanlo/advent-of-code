const fs = require('fs');

var input = `X(8x2)(3x3)ABCY`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve(input) {
  console.log(input);
  const sequences = [];
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '(') {
      const end = input.indexOf(')', i);
      const [nChars, times] = input
        .slice(i + 1, end)
        .split('x')
        .map(Number);
      const sequence = input.slice(end + 1, end + 1 + nChars);
      for (let j = 0; j < times; j++) {
        sequences.push(sequence);
      }
      i += end - i + nChars;
    } else {
      sequences.push(char);
    }
  }
  console.log(sequences.join('').length);
}
solve(input);
