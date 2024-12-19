import { readFileSync } from 'node:fs';

var input = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;
var input = readFileSync('./day-19-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let [patterns, designs] = input.split('\n\n');
//   patterns = patterns.match(/\w+/g);
//   designs = designs.split('\n');
//
//   let count = 0;
//   outer: for (const design of designs) {
//     let remaining = [design];
//     while (remaining.length !== 0) {
//       const nextRemaining = new Set();
//       for (const r of remaining) {
//         if (r === '') {
//           count++;
//           continue outer;
//         }
//
//         for (const pattern of patterns) {
//           if (r.startsWith(pattern)) {
//             nextRemaining.add(r.substring(pattern.length));
//           }
//         }
//       }
//       remaining = Array.from(nextRemaining);
//     }
//   }
//   console.log(count);
// }
// solve(input);

function solve(input) {
  let [patterns, designs] = input.split('\n\n');
  patterns = patterns.match(/\w+/g);
  designs = designs.split('\n');

  let count = 0;
  for (const design of designs) {
    let remaining = [[design, 1]];
    while (remaining.length !== 0) {
      const nextRemaining = {};
      for (const [r, c] of remaining) {
        if (r === '') {
          count += c;
        }

        for (const pattern of patterns) {
          if (r.startsWith(pattern)) {
            const next = r.substring(pattern.length);
            nextRemaining[next] ??= 0;
            nextRemaining[next] += c;
          }
        }
      }
      remaining = Object.entries(nextRemaining);
    }
  }
  console.log(count);
}
solve(input);
