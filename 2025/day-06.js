import { readFileSync } from 'node:fs';

const input = readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input) {
  const lines = input.split('\n');
  const nums = lines
    .slice(0, -1)
    .map((line) => line.split(/\s+/).filter(Boolean).map(Number));
  const ops = lines.at(-1).split(/\s+/).filter(Boolean);
  let sum = 0;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const col = nums.map((row) => row[i]);
    if (op === '+') {
      sum += col.reduce((a, b) => a + b, 0);
    } else if (op === '*') {
      sum += col.reduce((a, b) => a * b, 1);
    }
  }
  console.log(sum);
}
solve(input);

function rotLeft(arr) {
  const rot = [];
  for (let i = 0; i < arr[0].length; i++) {
    const row = [];
    for (let j = 0; j < arr.length; j++) {
      row.push(arr[j][i]);
    }
    rot.push(row);
  }
  return rot;
}

function solve2(input) {
  const lines = input.split('\n');
  const paddedLines = lines
    .slice(0, -1)
    .map((line) => line.replaceAll(' ', '0'));
  const rotLines = rotLeft(paddedLines).map((line) => line.join(''));

  const nums = [];
  let row = [];
  for (let i = 0; i < rotLines.length; i++) {
    const stripped = rotLines[i].replace(/0+$/, '');
    if (!stripped) {
      nums.push(row);
      row = [];
    } else {
      row.push(+stripped);
    }
  }
  nums.push(row);

  const ops = lines.at(-1).split(/\s+/).filter(Boolean);
  let sum = 0;
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const col = nums[i];
    if (op === '+') {
      sum += col.reduce((a, b) => a + b, 0);
    } else if (op === '*') {
      sum += col.reduce((a, b) => a * b, 1);
    }
  }
  console.log(sum);
}
solve2(input);
