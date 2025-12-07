import { readFileSync } from 'node:fs';

const input = readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input) {
  const lines = input.split('\n');
  let nSplits = 0;
  let timelines = Array.from({ length: lines[0].length }, () => 0);
  timelines[lines[0].indexOf('S')] = 1;
  for (let i = 1; i < lines.length; i++) {
    for (let j = 0; j < timelines.length; j++) {
      const t = timelines[j];
      if (t && lines[i][j] === '^') {
        timelines[j - 1] += t;
        timelines[j] = 0;
        timelines[j + 1] += t;
        nSplits++;
      }
    }
  }
  console.log(nSplits);
  console.log(Object.values(timelines).reduce((a, b) => a + b, 0));
}
solve(input);
