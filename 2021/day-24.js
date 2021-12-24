const fs = require('fs');

const input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const lines = input.split('\n');

  const coeffs = [];
  for (let i = 0; i < 14; i++) {
    // coefficients [a, b, c] such that z' = ~~(z / a) * (25 * +(w !== (z % 26) + b) + 1) + (w + c) * +(w !== (z % 26) + b)
    coeffs.push([4, 5, 15].map((j) => +lines[18 * i + j].split(' ')[2]));
  }

  const idxStack = [];
  const idxMap = {};
  for (let i = 0; i < 14; i++) {
    if (coeffs[i][0] === 1) {
      idxStack.push(i);
    } else {
      idxMap[i] = idxStack.pop();
    }
  }

  const digits = [];
  for (const [i, j] of Object.entries(idxMap)) {
    const complement = coeffs[j][2] + coeffs[i][1];
    digits[j] =
      part === 1 ? Math.min(9, 9 - complement) : Math.max(1, 1 - complement);
    digits[i] = digits[j] + complement;
  }
  console.log(digits.join(''));
}
solve(input, 1);
solve(input, 2);
