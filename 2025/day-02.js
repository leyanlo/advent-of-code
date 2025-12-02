import { readFileSync } from 'node:fs';

const input = readFileSync('./day-02-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const invalids = [];
  const ranges = input.split(',').map((range) => range.split('-').map(Number));
  for (const [start, end] of ranges) {
    for (let id = start; id <= end; id++) {
      const str = id.toString();
      const len = str.length;
      if (str.substring(0, len / 2) === str.substring(len / 2)) {
        invalids.push(id);
      }
    }
  }
  console.log(invalids.reduce((acc, n) => acc + n, 0));
}
solve1(input);

function solve2(input) {
  const invalids = [];
  const ranges = input.split(',').map((range) => range.split('-').map(Number));
  for (const [start, end] of ranges) {
    for (let id = start; id <= end; id++) {
      const str = id.toString();
      const len = str.length;
      for (let l = 1; l <= len / 2; l++) {
        if (len % l === 0 && str.substring(0, l).repeat(len / l) === str) {
          invalids.push(id);
          break;
        }
      }
    }
  }
  console.log(invalids.reduce((acc, n) => acc + n, 0));
}
solve2(input);
