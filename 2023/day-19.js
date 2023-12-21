import { readFileSync } from 'node:fs';

const input = readFileSync('./day-19-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let [workflows, ratings] = input.split('\n\n');

  const map = {};
  for (const line of workflows.split('\n')) {
    let [name, rules] = line.split(/[{}]/g);
    map[name] = (parts) => {
      function isAccepted(target) {
        return target === 'A' || (target !== 'R' && map[target](parts));
      }

      for (const rule of rules.split(',')) {
        if (rule.includes(':')) {
          let [expr, target] = rule.split(':');
          let op = expr.match(/[\W]/g)[0];
          let [left, right] = expr.split(op);
          if (op === '>' ? parts[left] > +right : parts[left] < +right) {
            return isAccepted(target);
          }
        } else {
          return isAccepted(rule);
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
      function getCombos(target, ranges) {
        return target === 'A'
          ? Object.values(ranges)
              .map(([min, max]) => max - min + 1)
              .reduce((acc, n) => acc * n)
          : target !== 'R'
            ? map[target](ranges)
            : 0;
      }

      let sum = 0;
      for (const rule of rules.split(',')) {
        if (rule.includes(':')) {
          let [expr, target] = rule.split(':');
          let op = expr.match(/[\W]/g)[0];
          let [part, val] = expr.split(op);
          val = +val;
          const yesRanges = structuredClone(ranges);
          if (op === '>') {
            yesRanges[part][0] = Math.max(yesRanges[part][0], val + 1);
            ranges[part][1] = Math.min(ranges[part][1], val);
          } else {
            yesRanges[part][1] = Math.min(yesRanges[part][1], val - 1);
            ranges[part][0] = Math.max(ranges[part][0], val);
          }
          sum += getCombos(target, yesRanges);
        } else {
          sum += getCombos(rule, ranges);
        }
      }
      return sum;
    };
  }

  const ranges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };
  console.log(map.in(ranges));
}
solve2(input);
