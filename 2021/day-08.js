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

function getCharCounts(signals) {
  const charCounts = {};
  for (const signal of signals) {
    for (const char of signal) {
      charCounts[char] = (charCounts[char] ?? 0) + 1;
    }
  }
  return charCounts;
}

function charCountSum(signal, charCounts) {
  let sum = 0;
  for (const char of signal) {
    sum += charCounts[char];
  }
  return sum;
}

const exampleSignals = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(
  ' '
);

const exampleCharCounts = getCharCounts(exampleSignals);

const charCountSumToDigit = {
  [charCountSum('acedgfb', exampleCharCounts)]: 8,
  [charCountSum('cdfbe', exampleCharCounts)]: 5,
  [charCountSum('gcdfa', exampleCharCounts)]: 2,
  [charCountSum('fbcad', exampleCharCounts)]: 3,
  [charCountSum('dab', exampleCharCounts)]: 7,
  [charCountSum('cefabd', exampleCharCounts)]: 9,
  [charCountSum('cdfgeb', exampleCharCounts)]: 6,
  [charCountSum('eafb', exampleCharCounts)]: 4,
  [charCountSum('cagedb', exampleCharCounts)]: 0,
  [charCountSum('ab', exampleCharCounts)]: 1,
};

function solve2(input) {
  const lines = input
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  let sum = 0;
  for (const [signals, digits] of lines) {
    const charCounts = getCharCounts(signals);
    sum += +digits
      .map((digit) => charCountSumToDigit[charCountSum(digit, charCounts)])
      .join('');
  }
  console.log(sum);
}
solve2(input);
