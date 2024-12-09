import { readFileSync } from 'node:fs';

var input = `2333133121414131402`;
var input = readFileSync('./day-09-input.txt', 'utf8').trimEnd();
// 15868383645408 wrong

// function solve(input) {
//   const arr = [];
//   for (let i = 0; i < input.length; i++) {
//     const n = +input[i];
//     for (let j = 0; j < n; j++) {
//       arr.push(i % 2 === 0 ? i / 2 : -1);
//     }
//   }
//   console.log(arr.join(''));
//
//   let left = arr.findIndex((n) => n === -1);
//   let right = arr.findLastIndex((n) => n !== -1);
//   while (left !== -1 && right !== -1 && left < right) {
//     [arr[left], arr[right]] = [arr[right], arr[left]];
//     left = arr.findIndex((n, j) => j > left && n === -1);
//     right = arr.findLastIndex((n, j) => j < right && n !== -1);
//   }
//   console.log(arr.slice(-10));
//
//   console.log(arr.reduce((acc, n, i) => acc + i * Math.max(0, n)));
// }
// solve(input);

function solve(input) {
  const arr = [];
  const sizes = [];
  for (let i = 0; i < input.length; i++) {
    const n = +input[i];
    for (let j = 0; j < n; j++) {
      arr.push(i % 2 === 0 ? i / 2 : -1);
      sizes.push(n);
    }
  }
  console.log(sizes.join(''));
  console.log(arr.join('').replaceAll('-1', '.'));

  let right = arr.findLastIndex((n) => n !== -1);
  let left = arr.findIndex((n, i) => n === -1 && sizes[i] >= sizes[right]);
  outer: while (right !== -1 && left !== -1) {
    // console.log({ right });
    if (right === 20) debugger;
    const rSize = sizes[right];
    const lSize = sizes[left];
    for (let i = 0; i < rSize; i++) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      [sizes[left], sizes[right]] = [sizes[right], sizes[left]];
      left++;
      right--;
    }
    for (let i = 0; i < lSize - rSize; i++) {
      sizes[left] -= rSize;
      left++;
    }

    right = arr.findLastIndex((n, i) => i <= right && n !== -1);
    left = arr.findIndex(
      (n, i) => n === -1 && sizes[i] >= sizes[right] && i < right
    );
    while (left === -1) {
      right = arr.findLastIndex(
        (n, i) => i <= right - sizes[right] && n !== -1
      );
      left = arr.findIndex(
        (n, i) => n === -1 && sizes[i] >= sizes[right] && i < right
      );

      if (right === -1) {
        break outer;
      }
    }
    // console.log(arr.join('').replaceAll('-1', '.'));
  }
  console.log(arr.reduce((acc, n, i) => acc + i * Math.max(0, n)));
}
solve(input);
