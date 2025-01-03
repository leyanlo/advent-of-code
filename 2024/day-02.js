import { readFileSync } from 'node:fs';

const input = readFileSync('./day-02-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  function isSafe(nums, nErrs = 0) {
    const posDir = nums[1] > nums[0];
    for (let i = 1; i < nums.length; i++) {
      const num = nums[i];
      const prevNum = nums[i - 1];
      if (
        posDir
          ? num <= prevNum || num - 3 > prevNum
          : num >= prevNum || num + 3 < prevNum
      ) {
        if (part === 1 || nErrs === 1) {
          return false;
        }
        const next1 = nums.toSpliced(i - 1, 1);
        const next2 = nums.toSpliced(i, 1);
        const next3 = nums.toSpliced(0, 1);
        return isSafe(next1, 1) || isSafe(next2, 1) || isSafe(next3, 1);
      }
    }
    return true;
  }

  const lines = input.split('\n');
  let counts = 0;
  for (let line of lines) {
    const nums = line.split(' ').map(Number);
    counts += +isSafe(nums);
  }
  console.log(counts);
}
solve(input, 1);
solve(input, 2);
