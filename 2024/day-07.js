import { readFileSync } from 'node:fs';

const input = readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  let sum = 0;
  for (const line of input.split('\n')) {
    const [left, ...right] = line.match(/\d+/g).map(Number);

    let combos = [right[0]];
    for (let i = 1; i < right.length; i++) {
      const n = right[i];
      const nextCombos = [];
      for (const combo of combos) {
        nextCombos.push(combo + n);
        nextCombos.push(combo * n);
        if (part === 2) {
          nextCombos.push(parseInt('' + combo + n, 10));
        }
      }
      combos = nextCombos.filter((combo) => combo <= left);
    }
    if (combos.some((combo) => combo === left)) {
      sum += left;
    }
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
