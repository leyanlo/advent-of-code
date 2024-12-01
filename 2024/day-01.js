import { readFileSync } from 'node:fs';

const input = readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const lines = input.split('\n');
  const lefts = [];
  const rights = [];
  for (const line of lines) {
    const [a, b] = line.split(/\s+/);
    lefts.push(+a);
    rights.push(+b);
  }
  lefts.sort((a, b) => a - b);
  rights.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < lefts.length; i++) {
    sum += Math.abs(lefts[i] - rights[i]);
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  const lines = input.split('\n');
  const lefts = [];
  const rights = {};
  for (const line of lines) {
    const [a, b] = line.split(/\s+/);
    lefts.push(+a);
    rights[b] ??= 0;
    rights[b]++;
  }
  let sum = 0;
  for (let i = 0; i < lefts.length; i++) {
    const n = lefts[i];
    sum += n * (rights[n] ?? 0);
  }
  console.log(sum);
}
solve2(input);
