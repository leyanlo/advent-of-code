const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

const charCountSumToDigit = {
  49: 8,
  37: 5,
  34: 2,
  39: 3,
  25: 7,
  45: 9,
  41: 6,
  30: 4,
  42: 0,
  17: 1,
};

function solve1(input) {
  const lines = input
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  let count = 0;
  for (const [, digits] of lines) {
    count += digits.filter(
      (s) =>
        s.length === 7 || s.length === 4 || s.length === 3 || s.length === 2
    ).length;
  }
  console.log(count);
}
solve1(input);

function solve2(input) {
  const lines = input
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  let sum = 0;
  for (const [signals, digits] of lines) {
    const charCounts = {};
    for (const s of signals) {
      for (const char of s) {
        charCounts[char] = (charCounts[char] ?? 0) + 1;
      }
    }
    sum += +digits
      .map(
        (digit) =>
          charCountSumToDigit[
            digit
              .split('')
              .map((char) => charCounts[char])
              .reduce((acc, charCount) => acc + charCount)
          ]
      )
      .join('');
  }
  console.log(sum);
}
solve2(input);
