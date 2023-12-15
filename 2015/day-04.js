import { readFileSync } from 'node:fs';

import crypto from 'crypto';

const input = readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function solve(input) {
  let i = 0;
  let part1, part2;
  while (true) {
    i++;
    const hash = crypto.createHash('md5').update(`${input}${i}`).digest('hex');
    if (hash.startsWith('00000')) {
      part1 = part1 ?? i;
      if (hash.startsWith('000000')) {
        part2 = i;
        break;
      }
    }
  }
  console.log(part1);
  console.log(part2);
}
solve(input);
