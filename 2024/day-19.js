import { readFileSync } from 'node:fs';

const input = readFileSync('./day-19-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  let [patterns, designs] = input.split('\n\n');
  patterns = patterns.match(/\w+/g);
  designs = designs.split('\n');

  let count = 0;
  outer: for (const design of designs) {
    let remaining = [[design, 1]];
    while (remaining.length !== 0) {
      const nextRemaining = {};
      for (const [r, c] of remaining) {
        if (r === '') {
          if (part === 1) {
            count++;
            continue outer;
          }

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
solve(input, 1);
solve(input, 2);
