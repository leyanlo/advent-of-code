const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8');

function solve1(input) {
  console.log(
    input
      .split('\n')
      .slice(0, -1)
      .map(Number)
      .reduce((acc, n) => acc + n, 0)
  );
}

function solve2(input) {
  const seen = {};
  let sum = 0;
  const nums = input.split('\n').slice(0, -1).map(Number);
  for (let i = 0; !seen[sum]; i++) {
    seen[sum] = true;
    sum += nums[i % nums.length];
  }
  console.log(sum);
}

solve1(input);
solve2(input);
