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

function getCharCount(signals) {
  const charCount = {};
  for (const signal of signals) {
    for (const char of signal) {
      charCount[char] = (charCount[char] ?? 0) + 1;
    }
  }
  return charCount;
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

const exampleCharCount = getCharCount(exampleSignals);

const charCountSumToDigit = {
  [charCountSum('acedgfb', exampleCharCount)]: 8,
  [charCountSum('cdfbe', exampleCharCount)]: 5,
  [charCountSum('gcdfa', exampleCharCount)]: 2,
  [charCountSum('fbcad', exampleCharCount)]: 3,
  [charCountSum('dab', exampleCharCount)]: 7,
  [charCountSum('cefabd', exampleCharCount)]: 9,
  [charCountSum('cdfgeb', exampleCharCount)]: 6,
  [charCountSum('eafb', exampleCharCount)]: 4,
  [charCountSum('cagedb', exampleCharCount)]: 0,
  [charCountSum('ab', exampleCharCount)]: 1,
};

function solve2(input) {
  const lines = input
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.split(' ')));
  let sum = 0;
  for (const [signals, digits] of lines) {
    const charCounts = getCharCount(signals);
    sum += +digits
      .map((digit) => charCountSumToDigit[charCountSum(digit, charCounts)])
      .join('');
  }
  console.log(sum);
}
solve2(input);
