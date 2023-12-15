import { readFileSync } from 'node:fs';

import crypto from 'crypto';

const input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

const dirChars = ['U', 'D', 'L', 'R'];

const dirs = [
  [0, -1],
  [0, 1],
  [-1, 0],
  [1, 0],
];

function solve(input, part) {
  const queue = [{ code: input, coords: [0, 0] }];
  let longest = 0;
  while (queue.length) {
    const {
      code,
      coords: [x, y],
    } = queue.shift();
    if (x === 3 && y === 3) {
      if (part === 1) {
        console.log(code.slice(input.length));
        return;
      } else {
        longest = code.length - input.length;
        continue;
      }
    }
    const hash = crypto.createHash('md5').update(code).digest('hex');
    const isOpenArr = hash
      .slice(0, 4)
      .split('')
      .map((char) => char.codePointAt(0) >= 'b'.codePointAt(0));
    for (let i = 0; i < isOpenArr.length; i++) {
      const isOpen = isOpenArr[i];
      const [dx, dy] = dirs[i];
      if (isOpen && x + dx >= 0 && x + dx < 4 && y + dy >= 0 && y + dy < 4) {
        queue.push({
          code: `${code}${dirChars[i]}`,
          coords: [x + dx, y + dy],
        });
      }
    }
  }
  console.log(longest);
}
solve(input, 1);
solve(input, 2);
