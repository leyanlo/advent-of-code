const fs = require('fs');

var input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
var input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();
// not 2851

// function solve(input) {
//   let [template, rules] = input.split('\n\n');
//   rules = rules.split('\n').reduce((acc, rule) => {
//     const [left, right] = rule.split(' -> ');
//     acc[left] = right;
//     return acc;
//   }, {});
//   console.log(template, rules);
//   let result;
//   for (let step = 0; step < 10; step++) {
//     result = [template[0]];
//     for (let i = 0; i < template.length - 1; i++) {
//       result.push(rules[template.slice(i, i + 2)], template[i + 1]);
//     }
//     template = result.join('');
//   }
//   const counts = result.reduce((acc, char) => {
//     acc[char] = (acc[char] ?? 0) + 1;
//     return acc;
//   }, {});
//   console.log(counts);
//   console.log(
//     Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
//   );
// }
// solve(input);

// class Pointer {
//   constructor(char, next) {
//     this.char = char;
//     this.next = next;
//   }
// }
//
// function print(result) {
//   let x = [];
//   let tmp = result;
//   while (tmp) {
//     x.push(tmp.char);
//     tmp = tmp.next;
//   }
//   console.log('x', x.join(''));
// }
//
// function solve2(input) {
//   let [template, rules] = input.split('\n\n');
//   rules = rules.split('\n').reduce((acc, rule) => {
//     const [left, right] = rule.split(' -> ');
//     acc[left] = right;
//     return acc;
//   }, {});
//   console.log(template, rules);
//
//   let result = new Pointer(template[template.length - 1], null);
//   for (const char of template.split('').slice(0, -1).reverse()) {
//     result = new Pointer(char, result);
//   }
//
//   for (let step = 0; step < 40; step++) {
//     const nextResult = result;
//     while (result.next) {
//       result.next = new Pointer(
//         rules[result.char + result.next.char],
//         result.next
//       );
//       result = result.next.next;
//     }
//     result = nextResult;
//   }
//
//   const counts = {};
//   let tmp = result;
//   while (tmp) {
//     counts[tmp.char] = (counts[tmp.char] ?? 0) + 1;
//     tmp = tmp.next;
//   }
//   console.log(counts);
//   console.log(
//     Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))
//   );
// }
// solve2(input);

function solve2(input) {
  let [template, rules] = input.split('\n\n');
  rules = rules.split('\n').reduce((acc, rule) => {
    const [left, right] = rule.split(' -> ');
    acc[left] = right;
    return acc;
  }, {});
  console.log({ template, rules });

  for (const pair in rules) {
    rules[pair] = [pair[0] + rules[pair], rules[pair] + pair[1]];
  }
  console.log({ rules });

  let counts = {};
  for (let i = 0; i < template.length - 1; i++) {
    counts[template.slice(i, i + 2)] =
      (counts[template.slice(i, i + 2)] ?? 0) + 1;
  }
  console.log({ counts });

  for (let steps = 0; steps < 40; steps++) {
    const nextCounts = {};
    for (const pair in counts) {
      for (const newPair of rules[pair]) {
        nextCounts[newPair] = (nextCounts[newPair] ?? 0) + counts[pair];
      }
    }
    counts = nextCounts;
    console.log({ counts });
  }
  const letterCounts = {
    [template[0]]: 1,
  };
  for (const pair in counts) {
    letterCounts[pair[1]] = (letterCounts[pair[1]] ?? 0) + counts[pair];
  }
  console.log({ letterCounts });

  // let result = new Pointer(template[template.length - 1], null);
  // for (const char of template.split('').slice(0, -1).reverse()) {
  //   result = new Pointer(char, result);
  // }
  //
  // for (let step = 0; step < 40; step++) {
  //   const nextResult = result;
  //   while (result.next) {
  //     result.next = new Pointer(
  //       rules[result.char + result.next.char],
  //       result.next
  //     );
  //     result = result.next.next;
  //   }
  //   result = nextResult;
  // }
  //
  // const counts = {};
  // let tmp = result;
  // while (tmp) {
  //   counts[tmp.char] = (counts[tmp.char] ?? 0) + 1;
  //   tmp = tmp.next;
  // }
  // console.log(counts);
  console.log(
    Math.max(...Object.values(letterCounts)) -
      Math.min(...Object.values(letterCounts))
  );
}
solve2(input);
