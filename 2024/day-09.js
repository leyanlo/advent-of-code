import { readFileSync } from 'node:fs';

const input = readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const blocks = [];
  for (let i = 0; i < input.length; i++) {
    const n = +input[i];
    for (let j = 0; j < n; j++) {
      blocks.push(i % 2 === 0 ? i / 2 : -1);
    }
  }

  let left = blocks.findIndex((n) => n === -1);
  let right = blocks.findLastIndex((n) => n !== -1);
  while (left !== -1 && right !== -1 && left < right) {
    [blocks[left], blocks[right]] = [blocks[right], blocks[left]];
    left = blocks.findIndex((n, j) => n === -1 && j > left);
    right = blocks.findLastIndex((n, j) => n !== -1 && j < right);
  }
  console.log(blocks.reduce((acc, n, i) => acc + i * Math.max(0, n)));
}
solve1(input);

function solve2(input) {
  const blocks = [];
  const sizes = [];
  for (let i = 0; i < input.length; i++) {
    const n = +input[i];
    for (let j = 0; j < n; j++) {
      blocks.push(i % 2 === 0 ? i / 2 : -1);
      sizes.push(n);
    }
  }

  let right = blocks.findLastIndex((n) => n !== -1);
  let left = blocks.findIndex((n, i) => n === -1 && sizes[i] >= sizes[right]);
  outer: while (true) {
    const rSize = sizes[right];
    const lSize = sizes[left];
    for (let i = 0; i < rSize; i++) {
      [blocks[left], blocks[right]] = [blocks[right], blocks[left]];
      [sizes[left], sizes[right]] = [sizes[right], sizes[left]];
      left++;
      right--;
    }
    for (let i = 0; i < lSize - rSize; i++) {
      sizes[left] -= rSize;
      left++;
    }

    right = blocks.findLastIndex((n, i) => n !== -1 && i <= right);
    left = blocks.findIndex(
      (n, i) => n === -1 && i < right && sizes[i] >= sizes[right]
    );
    while (left === -1) {
      right = blocks.findLastIndex(
        (n, i) => n !== -1 && i <= right - sizes[right]
      );
      left = blocks.findIndex(
        (n, i) => n === -1 && i < right && sizes[i] >= sizes[right]
      );

      if (right === -1) {
        break outer;
      }
    }
  }
  console.log(blocks.reduce((acc, n, i) => acc + i * Math.max(0, n)));
}
solve2(input);
