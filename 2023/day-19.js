import { readFileSync } from 'node:fs';

const input = readFileSync('./day-19-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let [workflows, ratings] = input.split('\n\n');

  const map = {};
  for (const line of workflows.split('\n')) {
    let [name, rules] = line.split(/[{}]/g);
    map[name] = (parts) => {
      for (const rule of rules.split(',')) {
        if (rule.includes(':')) {
          let [expr, target] = rule.split(':');
          let op = expr.match(/[\W]/g)[0];
          let [left, right] = expr.split(op);
          if (op === '>' ? parts[left] > +right : parts[left] < +right) {
            return target === 'A' || (target !== 'R' && map[target](parts));
          }
        } else {
          return rule === 'A' || (rule !== 'R' && map[rule](parts));
        }
      }
    };
  }

  let sum = 0;
  for (const line of ratings.split('\n')) {
    const words = line.split(/\W/g).slice(1, -1);
    const parts = {};
    for (let i = 0; i < words.length; i += 2) {
      parts[words[i]] = +words[i + 1];
    }

    if (map.in(parts)) {
      sum += Object.values(parts).reduce((acc, n) => acc + n);
    }
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  let [workflows] = input.split('\n\n');

  const map = {};
  for (const line of workflows.split('\n')) {
    let [name, rules] = line.split(/[{}]/g);
    map[name] = (ranges) => {
      let sum = 0;
      for (const rule of rules.split(',')) {
        if (rule.includes(':')) {
          let [expr, target] = rule.split(':');
          let op = expr.match(/[\W]/g)[0];
          let [part, val] = expr.split(op);
          val = +val;
          const yesRanges = structuredClone(ranges);
          for (let i = 0; i < 4000; i++) {
            if ((op === '>' && i + 1 <= val) || (op === '<' && i + 1 >= val)) {
              yesRanges[part][i] = 0;
            } else {
              ranges[part][i] = 0;
            }
          }
          if (target === 'A') {
            sum += Object.values(yesRanges)
              .map((r) => r.filter(Boolean).length)
              .reduce((acc, n) => acc * n);
          } else if (target !== 'R') {
            sum += map[target](yesRanges);
          }
        } else {
          const target = rule;
          if (target === 'A') {
            sum += Object.values(ranges)
              .map((r) => r.filter(Boolean).length)
              .reduce((acc, n) => acc * n);
          } else if (target !== 'R') {
            sum += map[target](ranges);
          }
        }
      }
      return sum;
    };
  }

  const ranges = {
    x: Array(4000).fill(1),
    m: Array(4000).fill(1),
    a: Array(4000).fill(1),
    s: Array(4000).fill(1),
  };
  console.log(map.in(ranges));
}
solve2(input);
