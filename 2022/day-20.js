const fs = require('fs');

const input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const nums = input
    .split('\n')
    .map(Number)
    .map((n, idx) => ({ n, idx }));
  for (let i = 0; i < nums.length; i++) {
    const numIdx = nums.findIndex(({ idx }) => idx === i);
    const [num] = nums.splice(numIdx, 1);
    nums.splice((numIdx + num.n) % nums.length, 0, num);
  }

  const zeroIdx = nums.findIndex(({ n }) => n === 0);
  console.log(
    [1000, 2000, 3000]
      .map((n) => nums[(zeroIdx + n) % nums.length].n)
      .reduce((acc, n) => acc + n)
  );
}
solve1(input);

function solve2(input) {
  const nums = input
    .split('\n')
    .map(Number)
    .map((n, idx) => ({ n: n * 811589153, idx }));
  for (let i = 0; i < nums.length * 10; i++) {
    const numIdx = nums.findIndex(({ idx }) => idx === i % nums.length);
    const [num] = nums.splice(numIdx, 1);
    nums.splice((numIdx + num.n) % nums.length, 0, num);
  }

  const zeroIdx = nums.findIndex(({ n }) => n === 0);
  console.log(
    [1000, 2000, 3000]
      .map((di) => nums[(zeroIdx + di) % nums.length].n)
      .reduce((acc, n) => acc + n)
  );
}
solve2(input);
