const fs = require('fs');

var input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();
// 1443108778 wrong

// function solve(input) {
//   console.log(input);
//   let sum = 0;
//   for (const line of input.split('\n')) {
//     let nums = line.match(/[-\d]+/g).map(Number);
//     const nexts = [nums];
//     while (nums.some(Boolean)) {
//       const next = [];
//       for (let i = 0; i < nums.length - 1; i++) {
//         next.push(nums[i + 1] - nums[i]);
//       }
//       nums = next;
//       nexts.push(next);
//     }
//     console.log(nexts);
//     let carry = 0;
//     for (let i = nexts.length - 2; i >= 0; i--) {
//       carry += nexts[i].at(-1);
//     }
//     console.log(carry);
//     sum += carry;
//   }
//   console.log(sum);
// }
// solve(input);
function solve(input) {
  console.log(input);
  let sum = 0;
  for (const line of input.split('\n')) {
    let nums = line.match(/[-\d]+/g).map(Number);
    const nexts = [nums];
    while (nums.some(Boolean)) {
      const next = [];
      for (let i = 0; i < nums.length - 1; i++) {
        next.push(nums[i + 1] - nums[i]);
      }
      nums = next;
      nexts.push(next);
    }
    console.log(nexts);
    let carry = 0;
    for (let i = nexts.length - 2; i >= 0; i--) {
      carry = nexts[i][0] - carry;
    }
    console.log(carry);
    sum += carry;
  }
  console.log(sum);
}
solve(input);
