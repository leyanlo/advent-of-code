const fs = require('fs');

var input = `30373
25512
65332
33549
35390`;
var input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// function solve(input) {
//   const map = input.split('\n').map((line) => line.split('').map(Number));
//   const visibles = map.map((row, i) =>
//     row.map(
//       (_, j) =>
//         +(i === 0 || j === 0 || i === map.length - 1 || j === map[i].length - 1)
//     )
//   );
//   console.log(map);
//   console.log(visibles);
//   for (let i = 1; i < map.length - 1; i++) {
//     for (let j = 1; j < map[i].length - 1; j++) {
//       outer: for (const [di, dj] of dirs) {
//         if (di) {
//           for (let i2 = i + di; i2 >= 0 && i2 < map.length; i2 += di) {
//             if (map[i][j] <= map[i2][j]) {
//               continue outer;
//             }
//           }
//         } else {
//           for (let j2 = j + dj; j2 >= 0 && j2 < map[i].length; j2 += dj) {
//             if (map[i][j] <= map[i][j2]) {
//               continue outer;
//             }
//           }
//         }
//         visibles[i][j] = 1;
//         break outer;
//       }
//     }
//   }
//   console.log(visibles);
//   console.log(visibles.flat().reduce((acc, n) => acc + n));
// }
// solve(input);
function solve(input) {
  const map = input.split('\n').map((line) => line.split('').map(Number));
  const scores = map.map((row, i) => row.map((_, j) => 1));
  console.log(map);
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
      outer: for (const [di, dj] of dirs) {
        if (di) {
          for (let i2 = i + di; i2 >= 0 && i2 < map.length; i2 += di) {
            if (map[i][j] <= map[i2][j]) {
              scores[i][j] *= Math.abs(i - i2);
              continue outer;
            }
          }
          scores[i][j] *= Math.abs(i - (di > 0 ? map.length - 1 : 0));
        } else {
          for (let j2 = j + dj; j2 >= 0 && j2 < map[i].length; j2 += dj) {
            if (map[i][j] <= map[i][j2]) {
              scores[i][j] *= Math.abs(j - j2);
              continue outer;
            }
          }
          scores[i][j] *= Math.abs(j - (dj > 0 ? map[i].length - 1 : 0));
        }
      }
    }
  }
  console.log(Math.max(...scores.flat()));
}
solve(input);
