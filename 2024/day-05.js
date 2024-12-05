import { readFileSync } from 'node:fs';

var input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
var input = readFileSync('./day-05-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const [rules, updates] = input.split('\n\n');
//   const map = {};
//   for (const rule of rules.split('\n')) {
//     const [left, right] = rule.split('|').map(Number);
//     map[left] ??= [];
//     map[left].push(right);
//   }
//
//   let sum = 0;
//   outer: for (const update of updates.split('\n')) {
//     const pages = update.split(',').map(Number);
//     for (let i = 0; i < pages.length - 1; i++) {
//       const p1 = pages[i];
//       for (let j = i + 1; j < pages.length; j++) {
//         const p2 = pages[j];
//         if (map[p2]?.includes(p1)) {
//           continue outer;
//         }
//       }
//     }
//     sum += pages[(pages.length - 1) / 2];
//   }
//   console.log(sum);
// }
// solve(input);

// function solve(input) {
//   const [rules, updates] = input.split('\n\n');
//   const map = {};
//   for (const rule of rules.split('\n')) {
//     const [left, right] = rule.split('|').map(Number);
//     map[left] ??= {};
//     map[left][right] = -1;
//     map[right] ??= {};
//     map[right][left] = 1;
//   }
//
//   let sum = 0;
//   for (const update of updates.split('\n')) {
//     const pages = update.split(',').map(Number);
//     const sorted = pages.toSorted((a, b) => map[a]?.[b] ?? 0);
//     if (pages.every((_, i) => pages[i] === sorted[i])) {
//       sum += pages[(pages.length - 1) / 2];
//     }
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
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
    if (pages.some((_, i) => pages[i] !== sorted[i])) {
      sum += sorted[(sorted.length - 1) / 2];
    }
  }
  console.log(sum);
}
solve(input);
