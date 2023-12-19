import { readFileSync } from 'node:fs';

var input = `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`;
var input = readFileSync('./day-19-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   let [workflows, ratings] = input.split('\n\n');
//
//   const map = {};
//   for (const line of workflows.split('\n')) {
//     let [name, rules] = line.split(/[{}]/g);
//     map[name] = (parts) => {
//       for (const rule of rules.split(',')) {
//         if (rule.includes(':')) {
//           let [expr, target] = rule.split(':');
//           let op = expr.match(/[\W]/g)[0];
//           let [left, right] = expr.split(op);
//           if (op === '>' ? parts[left] > +right : parts[left] < +right) {
//             return target;
//           }
//         } else {
//           return rule;
//         }
//       }
//     };
//   }
//
//   let sum = 0;
//   for (const line of ratings.split('\n')) {
//     const words = line.split(/\W/g).slice(1, -1);
//     const parts = {};
//     for (let i = 0; i < words.length; i += 2) {
//       parts[words[i]] = +words[i + 1];
//     }
//     console.log(parts);
//
//     let curr = 'in';
//     while (curr !== 'A' && curr !== 'R') {
//       console.log(curr);
//       curr = map[curr](parts);
//     }
//     console.log(curr);
//
//     if (curr === 'A') {
//       sum += Object.values(parts).reduce((acc, n) => acc + n);
//     }
//   }
//   console.log(sum);
// }
// solve(input);

function getCombos(conditions) {
  const ranges = {
    x: Array(4000).fill(1),
    m: Array(4000).fill(1),
    a: Array(4000).fill(1),
    s: Array(4000).fill(1),
  };
  for (const { part, op, val } of conditions) {
    for (let i = 0; i < 4000; i++) {
      if ((op === '>' && i + 1 <= val) || (op === '<' && i + 1) >= val) {
        ranges[part][i] = 0;
      }
      if ((op === '>' && i + 1 <= val) || i + 1 >= val) {
        ranges[part][i] = 0;
      }
    }
  }
  return Object.values(ranges)
    .map((r) => r.filter(Boolean).length)
    .reduce((acc, n) => acc * n);
}

function solve2(input) {
  console.log(input);
  let [workflows, ratings] = input.split('\n\n');

  const map = {};
  for (const line of workflows.split('\n')) {
    let [name, rules] = line.split(/[{}]/g);
    map[name] = (conditions = [], path = ['in']) => {
      let sum = 0;
      for (const rule of rules.split(',')) {
        if (rule.includes(':')) {
          let [expr, target] = rule.split(':');
          let op = expr.match(/[\W]/g)[0];
          let [part, val] = expr.split(op);
          val = +val;
          const yesConditions = conditions.concat({ part, op, val });
          const yesPath = path.concat(target);
          conditions = conditions.concat({
            part,
            op: op === '<' ? '>' : '<',
            val: op === '<' ? val - 1 : val + 1,
          });
          if (target === 'A') {
            const combos = getCombos(yesConditions);
            if (combos) {
              console.log(combos, yesPath, yesConditions);
              debugger;
            }
            sum += combos;
          } else if (target !== 'R') {
            sum += map[target](yesConditions, yesPath);
          }
        } else {
          const target = rule;
          if (target === 'A') {
            const combos = getCombos(conditions);
            if (combos) {
              console.log(combos, path, conditions);
              debugger;
            }
            sum += combos;
          } else if (target !== 'R') {
            sum += map[target](conditions, path);
          }
        }
      }
      return sum;
    };
  }

  console.log(map.in());

  // expected: 167409079868000
  // actual: 117623085000000
}
solve2(input);
