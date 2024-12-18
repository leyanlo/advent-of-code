import { readFileSync } from 'node:fs';

var input = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`,
  w = 7,
  h = 7,
  n = 12;
var input = readFileSync('./day-18-input.txt', 'utf8').trimEnd(),
  w = 71,
  h = 71,
  n = 1024;

const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

// function solve(input) {
//   const coords = input.split('\n').map((line) => line.split(',').map(Number));
//   const map = Array.from({ length: h }).map(() =>
//     Array.from({ length: w }).fill(1)
//   );
//   for (let i = 0; i < n; i++) {
//     const [x, y] = coords[i];
//     map[y][x] = 0;
//   }
//   // console.log(map.map((row) => row.join('')).join('\n'));
//
//   const minSteps = map.map((row) => row.map(() => Number.MAX_SAFE_INTEGER));
//   let queue = [[0, 0, 0]];
//   while (queue.length !== 0) {
//     const nextQueue = [];
//     for (const [x, y, s] of queue) {
//       if (!map[y]?.[x] || s >= minSteps[y][x]) {
//         continue;
//       }
//       minSteps[y][x] = s;
//
//       nextQueue.push(...DIRS.map(([dx, dy]) => [x + dx, y + dy, s + 1]));
//     }
//     queue = nextQueue;
//   }
//   console.log(minSteps[h - 1][w - 1]);
// }
// solve(input);

function solve(input) {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));

  for (let n2 = n + 1; n2 < coords.length; n2++) {
    const map = Array.from({ length: h }).map(() =>
      Array.from({ length: w }).fill(1)
    );
    for (let i = 0; i < n2; i++) {
      const [x, y] = coords[i];
      map[y][x] = 0;
    }
    // console.log(map.map((row) => row.join('')).join('\n'));

    const minSteps = map.map((row) => row.map(() => Number.MAX_SAFE_INTEGER));
    let queue = [[0, 0, 0]];
    while (queue.length !== 0) {
      const nextQueue = [];
      for (const [x, y, s] of queue) {
        if (!map[y]?.[x] || s >= minSteps[y][x]) {
          continue;
        }
        minSteps[y][x] = s;

        nextQueue.push(...DIRS.map(([dx, dy]) => [x + dx, y + dy, s + 1]));
      }
      queue = nextQueue;
    }
    if (minSteps[h - 1][w - 1] === Number.MAX_SAFE_INTEGER) {
      console.log(coords[n2 - 1].join());
      break;
    }
  }
}
solve(input);
