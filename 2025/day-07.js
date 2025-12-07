import { readFileSync } from 'node:fs';

const input = readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input) {
  const lines = input.split('\n');
  let nSplits = 0;
  const timelines = Array.from({ length: lines[0].length }, () => 0);
  timelines[lines[0].indexOf('S')] = 1;
  for (let i = 1; i < lines.length; i++) {
    for (const { index: j } of lines[i].matchAll(/\^/g)) {
      const t = timelines[j];
      timelines[j - 1] += t;
      timelines[j] = 0;
      timelines[j + 1] += t;
      nSplits++;
    }
  }
  console.log(nSplits);
  console.log(Object.values(timelines).reduce((a, b) => a + b, 0));
}
solve(input);
