import { readFileSync } from 'node:fs';

var input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
var input = readFileSync('./day-04-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, -1],
  [1, 1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];

const XMAS = 'XMAS';

// function solve(input) {
//   const lines = input.split('\n');
//   let count = 0;
//   for (let i = 0; i < lines.length; i++) {
//     for (let j = 0; j < lines[0].length; j++) {
//       if (lines[i][j] === XMAS[0]) {
//         outer: for (const [di, dj] of DIRS) {
//           let i2 = i + di;
//           let j2 = j + dj;
//           for (let k = 1; k < XMAS.length; k++) {
//             if (lines[i2]?.[j2] !== XMAS[k]) {
//               continue outer;
//             }
//             i2 += di;
//             j2 += dj;
//           }
//           count++;
//         }
//       }
//     }
//   }
//   console.log(count);
// }
// solve(input);

const S_TO_M = {
  M: 'S',
  S: 'M',
};

const DIRS2 = [
  [1, 1],
  [1, -1],
];

function solve(input) {
  const lines = input.split('\n');
  let count = 0;
  const seen = lines.map((line) => line.split('').fill(0));
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 'M' || lines[i][j] === 'S') {
        outer: for (const [di, dj] of DIRS2) {
          let i2 = i + di;
          let j2 = j + dj;
          if (lines[i2]?.[j2] !== 'A') {
            continue outer;
          }

          i2 += di;
          j2 += dj;
          if (lines[i2]?.[j2] !== S_TO_M[lines[i][j]]) {
            continue outer;
          }

          if (seen[i2 - di][j2 - dj] === 1) {
            count++;
          }
          seen[i2 - di][j2 - dj] = 1;
        }
      }
    }
  }
  console.log(count);
}
solve(input);
