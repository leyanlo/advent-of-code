const fs = require('fs');

var input = `0
3
0
1
-3`;
var input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();
// 31 is wrong

function solve(input) {
  const offsets = input.split('\n').map(Number);
  let step = 0;
  let i = 0;
  while (0 <= i && i < offsets.length) {
    i += offsets[i]++;
    step++;
  }
  console.log(step, offsets);
}
solve(input);
