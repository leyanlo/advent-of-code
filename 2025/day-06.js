import { readFileSync } from 'node:fs';

var input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
var input = readFileSync('./day-06-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const lines = input.split('\n');
//   const nums = lines
//     .slice(0, -1)
//     .map((line) => line.split(/\s+/).filter(Boolean).map(Number));
//   const ops = lines.at(-1).split(/\s+/).filter(Boolean);
//   console.log({ nums, ops });
//   let sum = 0;
//   for (let i = 0; i < ops.length; i++) {
//     const op = ops[i];
//     const col = nums.map((row) => row[i]);
//     if (op === '+') {
//       sum += col.reduce((a, b) => a + b, 0);
//     } else if (op === '*') {
//       sum += col.reduce((a, b) => a * b, 1);
//     }
//   }
//   console.log(sum);
// }
// solve(input);
function rotLeft(arrayOfArrays) {
  const nRows = arrayOfArrays.length;
  const nCols = arrayOfArrays[0].length;
  const rotated = [];
  for (let col = 0; col < nCols; col++) {
    const newRow = [];
    for (let row = 0; row < nRows; row++) {
      newRow.push(arrayOfArrays[row][col]);
    }
    rotated.push(newRow);
  }
  return rotated;
}

function solve(input) {
  const lines = input.split('\n');
  let nums = lines
    .slice(0, -1)
    .map((line) => line.replaceAll(' ', '0').split(''));
  const nNums = nums.length;
  const rotNums = rotLeft(nums).map((line) => line.join(''));
  console.log({ rotNums });

  const rotRows = [];
  let row = [];
  for (let i = 0; i < rotNums.length; i++) {
    const stripped = rotNums[i].replace(/0+$/, '');
    if (!stripped) {
      rotRows.push(row);
      row = [];
    } else {
      row.push(+stripped);
    }
  }
  rotRows.push(row)

  const ops = lines.at(-1).split(/\s+/).filter(Boolean);
  console.log({ rotRows, ops });
  let sum = 0;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const col = rotRows[i];
    if (op === '+') {
      sum += col.reduce((a, b) => a + b, 0);
    } else if (op === '*') {
      sum += col.reduce((a, b) => a * b, 1);
    }
  }
  console.log(sum);
}
solve(input);
