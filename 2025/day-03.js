import { readFileSync } from 'node:fs';

var input = `987654321111111
811111111111119
234234234234278
818181911112111`;
var input = readFileSync('./day-03-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const lines = input.split('\n').map((line) => line.split('').map(Number));
//   let sum = 0;
//   for (const line of lines) {
//     let maxFirstDigit = line.at(-2);
//     let maxFirstDigitIdx = line.length - 2;
//     let maxSecondDigit = line.at(-1);
//     let maxSecondDigitIdx = line.length - 1;
//     for (let i = line.length - 3; i >= 0; i--) {
//       if (line[i] >= maxFirstDigit) {
//         maxFirstDigit = line[i];
//         maxFirstDigitIdx = i;
//       }
//     }
//     for (let i = line.length - 2; i > maxFirstDigitIdx; i--) {
//       if (line[i] >= maxSecondDigit) {
//         maxSecondDigit = line[i];
//         maxSecondDigitIdx = i;
//       }
//     }
//     sum += maxFirstDigit * 10 + maxSecondDigit;
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
  const lines = input.split('\n').map((line) => line.split('').map(Number));
  let sum = 0n;
  for (const line of lines) {
    const maxDigits = line.slice(-12);
    const maxDigitIdx = Array.from(
      { length: 12 },
      (_, i) => line.length - 12 + i
    );
    for (let i = 0; i < 12; i++) {
      for (let j = maxDigitIdx[i]; j > (maxDigitIdx[i - 1] ?? -1); j--) {
        if (line[j] >= maxDigits[i]) {
          maxDigits[i] = line[j];
          maxDigitIdx[i] = j;
        }
      }
    }
    console.log(maxDigits.join(''))
    sum += BigInt(maxDigits.join(''));
  }
  console.log(sum);
}
solve(input);
