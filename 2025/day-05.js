import { readFileSync } from 'node:fs';

var input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
var input = readFileSync('./day-05-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let [ranges, ids] = input.split('\n\n');
//   ranges = ranges.split('\n').map((line) => line.split('-').map(Number));
//   ids = ids.split('\n').map(Number);
//   let nFresh = 0;
//   for (let id of ids) {
//     for (const [min, max] of ranges) {
//       if (id >= min && id <= max) {
//         nFresh++;
//         break;
//       }
//     }
//   }
//   console.log(nFresh);
// }
// solve(input);

function mergeRanges(ranges) {
  const mergedRanges = [];
  ranges.sort((a, b) => a[0] - b[0]);
  let currentRange = ranges[0];
  for (let i = 1; i < ranges.length; i++) {
    const [currentMin, currentMax] = currentRange;
    const [nextMin, nextMax] = ranges[i];
    if (nextMin <= currentMax + 1) {
      currentRange[1] = Math.max(currentMax, nextMax);
    } else {
      mergedRanges.push(currentRange);
      currentRange = ranges[i];
    }
  }
  mergedRanges.push(currentRange);
  return mergedRanges;
}

function solve(input) {
  let [ranges, ids] = input.split('\n\n');
  ranges = ranges.split('\n').map((line) => line.split('-').map(Number));
  ids = ids.split('\n').map(Number);

  console.log(ranges)
  console.log(mergeRanges(ranges))
  console.log(mergeRanges(ranges).reduce((acc, [min, max]) => acc + (max - min + 1), 0));
}
solve(input);
