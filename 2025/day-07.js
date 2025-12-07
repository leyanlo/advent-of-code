import { readFileSync } from 'node:fs';

const input = readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const lines = input.split('\n');
  let nSplits = 0;
  let beams = [lines[0].indexOf('S')];
  for (let i = 1; i < lines.length; i++) {
    const nextBeams = new Set();
    for (const beam of beams) {
      if (lines[i][beam] === '^') {
        nextBeams.add(beam - 1);
        nextBeams.add(beam + 1);
        nSplits++;
      } else {
        nextBeams.add(beam);
      }
    }
    beams = Array.from(nextBeams);
  }
  console.log(nSplits);
}
solve1(input);

function solve2(input) {
  const lines = input.split('\n');
  const zeroes = Array.from({ length: lines[0].length }, () => 0);
  let timelines = [...zeroes];
  timelines[lines[0].indexOf('S')] = 1;
  for (let i = 1; i < lines.length; i++) {
    const nextTimelines = [...zeroes];
    for (let j = 0; j < timelines.length; j++) {
      const t = timelines[j];
      if (lines[i][j] === '^') {
        nextTimelines[j - 1] += t;
        nextTimelines[j + 1] += t;
      } else {
        nextTimelines[j] += t;
      }
    }
    timelines = nextTimelines;
  }
  console.log(Object.values(timelines).reduce((a, b) => a + b, 0));
}
solve2(input);
