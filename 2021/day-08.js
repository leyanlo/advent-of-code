const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const lines = input
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  let count = 0;
  for (const [, digits] of lines) {
    for (const digit of digits) {
      switch (digit.length) {
        case 7:
        case 4:
        case 3:
        case 2:
          count++;
      }
    }
  }
  console.log(count);
}
solve1(input);

/**
 * The sum of the character count frequencies of the characters of a signal will
 * uniquely map to a digit.
 */
const charCountSumToDigit = {
  17: 1,
  25: 7,
  30: 4,
  34: 2,
  37: 5,
  39: 3,
  41: 6,
  42: 0,
  45: 9,
  49: 8,
};

function solve2(input) {
  const lines = input
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  let sum = 0;
  for (const [signals, digits] of lines) {
    const charCount = {};
    for (const char of signals.join('')) {
      charCount[char] = (charCount[char] ?? 0) + 1;
    }
    sum += +digits
      .map(
        (digit) =>
          charCountSumToDigit[
            digit
              .split('')
              .map((char) => charCount[char])
              .reduce((acc, count) => acc + count)
          ]
      )
      .join('');
  }
  console.log(sum);
}
solve2(input);
