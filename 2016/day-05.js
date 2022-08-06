const crypto = require('crypto');
const fs = require('fs');

var input = `abc`;
var input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve(input) {
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
solve(input);
