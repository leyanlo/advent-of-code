import { readFileSync } from 'node:fs';

var input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
var input = `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`;
var input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
var input = readFileSync('./day-10-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// function solve(input) {
//   console.log(input);
//   const map = input.split('\n').map((line) => line.split('').map(Number));
//   const trailheads = map
//     .flatMap((row, i) => row.map((cell, j) => (cell === 0 ? [i, j] : null)))
//     .filter(Boolean);
//   console.log(trailheads);
//   let sum = 0;
//   for (const [i0, j0] of trailheads) {
//     let score = 0;
//     const seen = map.map((row) => row.map(() => 0));
//     const queue = [[i0, j0, -1]];
//     if (i0 === 5 && j0 === 2) debugger;
//     while (queue.length !== 0) {
//       const [i, j, h] = queue.pop();
//       if (seen[i]?.[j] !== 0 || map[i][j] !== h + 1) {
//         continue;
//       }
//       seen[i][j] = 1;
//
//       if (map[i][j] === 9) {
//         console.log({ i0, j0, i, j });
//         score++;
//       } else {
//         queue.push(...DIRS.map(([di, dj]) => [i + di, j + dj, h + 1]));
//       }
//     }
//     console.log({ i0, j0, sum, score });
//     sum += score;
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
  console.log(input);
  const map = input
    .split('\n')
    .map((line) => line.split('').map((char) => (char === '.' ? -1 : +char)));
  const trailheads = map
    .flatMap((row, i) => row.map((cell, j) => (cell === 0 ? [i, j] : null)))
    .filter(Boolean);
  console.log(trailheads);
  let sum = 0;
  for (const [i0, j0] of trailheads) {
    let score = 0;
    const queue = [[i0, j0, -1]];
    while (queue.length !== 0) {
      const [i, j, h] = queue.pop();
      if (map[i]?.[j] !== h + 1) {
        continue;
      }

      if (map[i][j] === 9) {
        console.log({ i0, j0, i, j });
        score++;
      } else {
        queue.push(...DIRS.map(([di, dj]) => [i + di, j + dj, h + 1]));
      }
    }
    console.log({ i0, j0, sum, score });
    sum += score;
  }
  console.log(sum);
}
solve(input);
