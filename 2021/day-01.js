const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();
// const input = `199
// 200
// 208
// 210
// 200
// 207
// 240
// 269
// 260
// 263`;

// function solve(input) {
//   const depths = input.split('\n').map(Number);
//   console.log(depths);
//   let count = 0;
//   for (let i = 1; i < depths.length; i++) {
//     if (depths[i] > depths[i - 1]) count++;
//   }
//   console.log(count);
// }
//
// solve(input);

function solve2(input) {
  const depths = input.split('\n').map(Number);
  console.log(depths);
  const sums = [];
  for (let i = 2; i < depths.length; i++) {
    sums.push(depths[i] + depths[i - 1] + depths[i - 2]);
  }
  console.log(sums);
  let count = 0;
  for (let i = 1; i < sums.length; i++) {
    if (sums[i] > sums[i - 1]) count++;
  }
  console.log(count);
}

solve2(input);
