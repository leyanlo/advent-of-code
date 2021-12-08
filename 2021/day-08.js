const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

const numToDigit = {
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
  for (const [signals, value] of lines) {
    count += value.filter(
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
  for (const [signals, values] of lines) {
    const map = {};
    for (const s of signals) {
      for (const c of s) {
        map[c] = (map[c] ?? 0) + 1;
      }
    }
    sum += +values
      .map(
        (v) =>
          numToDigit[
            v
              .split('')
              .map((c) => map[c])
              .reduce((acc, n) => acc + n)
          ]
      )
      .join('');
  }
  console.log(sum);
}
solve2(input);
