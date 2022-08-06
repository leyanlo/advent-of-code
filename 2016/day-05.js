const crypto = require('crypto');
const fs = require('fs');

const input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const chars = [];
  let i = 0;
  while (chars.length < 8) {
    const hash = crypto.createHash('md5').update(`${input}${i}`).digest('hex');
    if (hash.startsWith('00000')) {
      chars.push(hash[5]);
    }
    i++;
  }
  console.log(chars.join(''));
}
solve1(input);

function solve2(input) {
  const chars = [];
  let i = 0;
  let missing = new Set([...Array(8).keys()]);
  while (missing.size > 0) {
    const hash = crypto.createHash('md5').update(`${input}${i}`).digest('hex');
    if (hash.startsWith('00000')) {
      const idx = +hash[5];
      if (missing.has(idx)) {
        chars[idx] = hash[6];
        missing.delete(idx);
      }
    }
    i++;
  }
  console.log(chars.join(''));
}
solve2(input);
