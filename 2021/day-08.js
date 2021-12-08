const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

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

const exampleSignals =
  'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab';

const charCount = {};
for (const char of exampleSignals
  .split('')
  .filter((char) => /[a-g]/.test(char))) {
  charCount[char] = (charCount[char] ?? 0) + 1;
}

function charCountSum(signal) {
  return signal.split('').reduce((acc, char) => acc + charCount[char], 0);
}

const charCountSumToDigit = {
  [charCountSum('acedgfb')]: 8,
  [charCountSum('cdfbe')]: 5,
  [charCountSum('gcdfa')]: 2,
  [charCountSum('fbcad')]: 3,
  [charCountSum('dab')]: 7,
  [charCountSum('cefabd')]: 9,
  [charCountSum('cdfgeb')]: 6,
  [charCountSum('eafb')]: 4,
  [charCountSum('cagedb')]: 0,
  [charCountSum('ab')]: 1,
};

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
