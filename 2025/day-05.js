import { readFileSync } from 'node:fs';

const input = readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function mergeRanges(ranges) {
  const merged = [];
  ranges = ranges.toSorted((a, b) => a[0] - b[0]);
  let range = ranges[0];
  for (let i = 1; i < ranges.length; i++) {
    const [, max] = range;
    const [nextMin, nextMax] = ranges[i];
    if (nextMin <= max + 1) {
      range[1] = Math.max(max, nextMax);
    } else {
      merged.push(range);
      range = ranges[i];
    }
  }
  merged.push(range);
  return merged;
}

function solve(input) {
  let [ranges, ids] = input.split('\n\n');
  ranges = ranges.split('\n').map((line) => line.split('-').map(Number));
  ids = ids.split('\n').map(Number);
  let nFresh = 0;
  for (let id of ids) {
    for (const [min, max] of ranges) {
      if (id >= min && id <= max) {
        nFresh++;
        break;
      }
    }
  }
  console.log(nFresh);
  console.log(
    mergeRanges(ranges).reduce((acc, [min, max]) => acc + (max - min + 1), 0)
  );
}
solve(input);
