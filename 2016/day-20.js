const fs = require('fs');

var input = `5-8
0-2
4-7`,
  max = 9;
var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd(),
  max = 4294967295;

// function solve(input) {
//   const blacklist = input
//     .split('\n')
//     .map((line) => line.split('-').map(Number))
//     .sort((a, b) => a[0] - b[0]);
//   console.log(blacklist);
//   const candidates = blacklist
//     .map(([, max]) => max + 1)
//     .filter((ip) => ip <= max);
//   for (const ip of candidates) {
//     if (blacklist.every(([min, max]) => ip < min || ip > max)) {
//       console.log(ip);
//       break;
//     }
//   }
// }
// solve(input);
function solve(input) {
  const blacklist = input
    .split('\n')
    .map((line) => line.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]);
  console.log(blacklist);
  const filtered = [];
  for (const curr of blacklist) {
    const prev = filtered[filtered.length - 1];
    if (prev && curr[0] < prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      filtered.push(curr);
    }
  }
  console.log(filtered);
  let count = filtered[0][0];
  for (let i = 1; i < filtered.length; i++) {
    const prev = filtered[i - 1];
    const curr = filtered[i];
    count += curr[0] - prev[1] - 1;
  }
  count += max - filtered[filtered.length - 1][1];
  console.log(count);
}
solve(input);
