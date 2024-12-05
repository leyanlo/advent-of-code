import { readFileSync } from 'node:fs';

const input = readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const [rules, updates] = input.split('\n\n');
  const map = {};
  for (const rule of rules.split('\n')) {
    const [left, right] = rule.split('|').map(Number);
    map[left] ??= {};
    map[left][right] = -1;
    map[right] ??= {};
    map[right][left] = 1;
  }

  let sum = 0;
  for (const update of updates.split('\n')) {
    const pages = update.split(',').map(Number);
    const sorted = pages.toSorted((a, b) => map[a]?.[b] ?? 0);
    if (pages.every((_, i) => pages[i] === sorted[i])) {
      if (part === 1) {
        sum += pages[(pages.length - 1) / 2];
      }
    } else if (part === 2) {
      sum += sorted[(sorted.length - 1) / 2];
    }
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
