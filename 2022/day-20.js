const fs = require('fs');

var input = `1
2
-3
3
-2
0
4`;
var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function swap(nums, i, j) {
  const len = nums.length;
  const tmp = nums[(i + len) % len];
  nums[(i + len) % len] = nums[(j + len) % len];
  nums[(j + len) % len] = tmp;
}

// function solve(input) {
//   const nums = input.split('\n').map(Number);
//   const file = nums.map((n, idx) => ({ n, idx }));
//   for (let i = 0; i < file.length; i++) {
//     const idx = file.findIndex(({ idx }) => idx === i);
//     const [line] = file.splice(idx, 1);
//     file.splice((idx + line.n) % file.length, 0, line);
//   }
//
//   const zeroIdx = file.findIndex(({ n }) => n === 0);
//   console.log(
//     [1000, 2000, 3000]
//       .map((di) => file[(zeroIdx + di) % file.length].n)
//       .reduce((acc, n) => acc + n)
//   );
// }
// solve(input);
function solve(input) {
  const nums = input.split('\n').map(Number);
  const file = nums.map((n, idx) => ({ n: n * 811589153, idx }));

  for (let i = 0; i < file.length * 10; i++) {
    const idx = file.findIndex(({ idx }) => idx === i % file.length);
    const [line] = file.splice(idx, 1);
    file.splice((idx + line.n) % file.length, 0, line);
  }

  const zeroIdx = file.findIndex(({ n }) => n === 0);
  console.log(
    [1000, 2000, 3000]
      .map((di) => file[(zeroIdx + di) % file.length].n)
      .reduce((acc, n) => acc + n)
  );
}
solve(input);
