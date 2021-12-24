const fs = require('fs');

const input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const lines = input.split('\n');

  const terms = [];
  for (let i = 0; i < 14; i++) {
    // terms [a, b, c] such that z'(a, b, c, w, z) = ~~(z / a) * (25 * +(w !== (z % 26) + b) + 1) + (w + c) * +(w !== (z % 26) + b)
    terms.push([4, 5, 15].map((j) => +lines[18 * i + j].split(' ')[2]));
  }

  const prevs = [];
  const digits = [];
  for (const [i, [a, b, c]] of Object.entries(terms)) {
    if (a === 1) {
      prevs.push([i, c]);
    } else {
      const [prevI, prevC] = prevs.pop();
      const complement = prevC + b;
      digits[prevI] =
        part === 1 ? Math.min(9, 9 - complement) : Math.max(1, 1 - complement);
      digits[i] = digits[prevI] + complement;
    }
  }
  console.log(digits.join(''));
}
solve(input, 1);
solve(input, 2);
