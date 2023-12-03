const fs = require('fs');

var input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
var input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// function solve(input) {
//   console.log(input);
//   const map = input.split('\n').map((line) => line.split(''));
//   let sum = 0;
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[i].length; j++) {
//       if (/[^\d^.]/.test(map[i][j])) {
//         console.log(map[i][j]);
//         for (let [di, dj] of dirs) {
//           if (/\d/.test(map[i + di][j + dj])) {
//             const digits = [map[i + di][j + dj]];
//             for (let jj = j + dj - 1; jj >= 0; jj--) {
//               if (/\d/.test(map[i + di][jj])) {
//                 digits.unshift(map[i + di][jj]);
//                 map[i + di][jj] = '.';
//               } else {
//                 break;
//               }
//             }
//             for (let jj = j + dj + 1; jj < map[i + di].length; jj++) {
//               if (/\d/.test(map[i + di][jj])) {
//                 digits.push(map[i + di][jj]);
//                 map[i + di][jj] = '.';
//               } else {
//                 break;
//               }
//             }
//             sum += +digits.join('');
//           }
//         }
//       }
//     }
//   }
//   console.log(sum)
// }
// solve(input);
function solve(input) {
  console.log(input);
  const map = input.split('\n').map((line) => line.split(''));
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (/\*/.test(map[i][j])) {
        console.log(map[i][j]);
        let gears = [];
        for (let [di, dj] of dirs) {
          if (/\d/.test(map[i + di][j + dj])) {
            const digits = [map[i + di][j + dj]];
            for (let jj = j + dj - 1; jj >= 0; jj--) {
              if (/\d/.test(map[i + di][jj])) {
                digits.unshift(map[i + di][jj]);
                map[i + di][jj] = '.';
              } else {
                break;
              }
            }
            for (let jj = j + dj + 1; jj < map[i + di].length; jj++) {
              if (/\d/.test(map[i + di][jj])) {
                digits.push(map[i + di][jj]);
                map[i + di][jj] = '.';
              } else {
                break;
              }
            }
            gears.push(+digits.join(''));
          }
        }
        if (gears.length === 2) {
          sum += gears[0] * gears[1];
        }
      }
    }
  }
  console.log(sum);
}
solve(input);
