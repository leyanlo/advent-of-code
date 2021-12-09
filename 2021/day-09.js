const fs = require('fs');

var input = `2199943210
3987894921
9856789892
8767896789
9899965678`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

// function solve(input) {
//   const map = input.split('\n').map((line) => line.split('').map(Number));
//   console.log(map);
//   const lows = [];
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[i].length; j++) {
//       if (
//         dirs.every(
//           ([di, dj]) =>
//             map[i + di]?.[j + dj] === undefined ||
//             map[i][j] < map[i + di][j + dj]
//         )
//       ) {
//         lows.push([i, j]);
//       }
//     }
//   }
//   console.log(lows);
//   let sum = 0;
//   for (const [i, j] of lows) {
//     sum += map[i][j] + 1;
//   }
//   console.log(sum);
// }
// solve(input);
function solve(input) {
  const map = input.split('\n').map((line) => line.split('').map(Number));
  console.log(map);
  const lows = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        dirs.every(
          ([di, dj]) =>
            map[i + di]?.[j + dj] === undefined ||
            map[i][j] < map[i + di][j + dj]
        )
      ) {
        lows.push([i, j]);
      }
    }
  }
  console.log(lows);
  const basinSizes = [];
  for (const [i, j] of lows) {
    const basin = new Set();
    basin.add([i, j].join());
    const queue = dirs.map(([di, dj]) => [i + di, j + dj]);
    while (queue.length) {
      const [i2, j2] = queue.shift();
      if (
        map[i2]?.[j2] === undefined ||
        map[i2][j2] === 9 ||
        basin.has([i2, j2].join())
      ) {
        continue;
      }
      basin.add([i2, j2].join());
      queue.push(...dirs.map(([di, dj]) => [i2 + di, j2 + dj]));
    }
    basinSizes.push(basin.size);
  }
  console.log(
    basinSizes
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((acc, n) => acc * n)
  );
}
solve(input);
