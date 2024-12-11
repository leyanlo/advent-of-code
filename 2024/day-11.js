import { readFileSync } from 'node:fs';

const input = readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function solve(input, t) {
  let stones = input.split(' ');
  let counts = stones.reduce((acc, n) => {
    acc[n] = (acc[n] ?? 0) + 1;
    return acc;
  }, {});
  for (let i = 0; i < t; i++) {
    const nextCounts = {};
    for (const stone of Object.keys(counts)) {
      if (stone === '0') {
        nextCounts[1] = (nextCounts[1] ?? 0) + counts[stone];
        continue;
      }

      const len = stone.length;
      if (len % 2 === 0) {
        const [left, right] = [+stone.slice(0, len / 2), +stone.slice(len / 2)];
        nextCounts[left] = (nextCounts[left] ?? 0) + counts[stone];
        nextCounts[right] = (nextCounts[right] ?? 0) + counts[stone];
        continue;
      }

      const newStone = +stone * 2024;
      nextCounts[newStone] = (nextCounts[newStone] ?? 0) + counts[stone];
    }
    counts = nextCounts;
  }

  console.log(Object.values(counts).reduce((acc, n) => acc + n));
}
solve(input, 25);
solve(input, 75);
