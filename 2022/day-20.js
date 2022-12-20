const fs = require('fs');

var input = `1
2
-3
3
-2
0
4`;
// var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function swap(nums, i, j) {
  const len = nums.length;
  const tmp = nums[(i + len) % len];
  nums[(i + len) % len] = nums[(j + len) % len];
  nums[(j + len) % len] = tmp;
}

function solve(input) {
  const nums = input.split('\n').map(Number);
  console.log(nums);
  const idxes = [...Array(nums.length).keys()];
  for (let i = 0; i < idxes.length; i++) {
    let state = idxes.map((j) => nums[j]);
    const n = nums[i];
    const dn = Math.sign(n);
    const start = idxes[i];
    for (let j = start; j !== start + n; j += dn) {
      swap(idxes, j, j + dn);
      state = idxes.map((j) => nums[j]);
    }
    if (start + n < 0) {
      idxes.push(idxes.shift())
      state = idxes.map((j) => nums[j]);
    } else if (start + n >= idxes.length) {
      idxes.unshift(idxes.pop())
      state = idxes.map((j) => nums[j]);
    }
    console.log(i, n, state.join(', '));
  }
}
solve(input);
