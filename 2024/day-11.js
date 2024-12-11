import { readFileSync } from 'node:fs';

// var input = `0 1 10 99 999`;
var input = `125 17`;
var input = readFileSync('./day-11-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let stones = input.split(' ').map(Number);
//   for (let i = 0; i < 25; i++) {
//     stones = stones.flatMap((stone) => {
//       if (stone === 0) {
//         return [1];
//       }
//
//       const str = '' + stone;
//       const len = str.length;
//       if (len % 2 === 0) {
//         return [+str.slice(0, len / 2), +str.slice(len / 2)];
//       }
//
//       return [stone * 2024];
//     });
//   }
//   console.log(stones.length);
// }
// solve(input);

// 2024 = 2^3 * 11 * 23
// 0 -> 1 -> 2024 -> 20,24 => 2,0,2,4 => 4048,1,4048,8096
// 329997051555697 wrong

function solve(input) {
  let stones = input.split(' ').map(Number);
  let counts = stones.reduce((acc, n) => {
    acc[n] = (acc[n] ?? 0) + 1;
    return acc;
  }, {});
  console.log(counts);
  for (let i = 0; i < 75; i++) {
    const nextCounts = {};
    for (const stone of Object.keys(counts).map(Number)) {
      if (stone === 0) {
        nextCounts[1] = (nextCounts[1] ?? 0) + counts[stone];
        continue;
      }

      const str = '' + stone;
      const len = str.length;
      if (len % 2 === 0) {
        const [left, right] = [+str.slice(0, len / 2), +str.slice(len / 2)];
        nextCounts[left] = (nextCounts[left] ?? 0) + counts[stone];
        nextCounts[right] = (nextCounts[right] ?? 0) + counts[stone];
        continue;
      }

      nextCounts[stone * 2024] =
        (nextCounts[stone * 2024] ?? 0) + counts[stone];
    }
    counts = nextCounts;
    console.log(
      i,
      Object.values(counts).reduce((acc, n) => acc + n),
      counts
    );
  }

  console.log(Object.values(counts).reduce((acc, n) => acc + n));
}
solve(input);
