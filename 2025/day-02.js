import { readFileSync } from 'node:fs';

var input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;
var input = readFileSync('./day-02-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const invalids = [];
//   const ranges = input.split(',').map((range) => range.split('-').map(Number));
//   for (const [start, end] of ranges) {
//     for (let id = start; id <= end; id++) {
//       const str = id.toString();
//       const len = str.length;
//       if (str.substring(0, len / 2) === str.substring(len / 2)) {
//         invalids.push(id);
//       }
//     }
//   }
//   console.log(invalids.reduce((acc, n) => acc + n, 0));
// }
// solve(input);

function solve2(input) {
  const invalids = [];
  const ranges = input.split(',').map((range) => range.split('-').map(Number));
  for (const [start, end] of ranges) {
    for (let id = start; id <= end; id++) {
      const str = id.toString();
      const len = str.length;
      for (let l = 1; l <= len/2; l++) {
        if (len % l === 0 && str.substring(0, l).repeat(len/l) === str) {
          invalids.push(id);
          break;
        }
      }
    }
  }
  console.log(invalids.reduce((acc, n) => acc + n, 0));
}
solve2(input);
