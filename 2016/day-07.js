const fs = require('fs');

var input = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function hasAbba(str) {
  for (let i = 0; i <= str.length - 4; i++) {
    const [a, b, c, d] = str.slice(i, i + 4);
    if (a !== b && b === c && a === d) {
      return true;
    }
  }
  return false;
}

function solve(input) {
  console.log(input.split('\n'));
  let count = 0;
  for (const line of input.split('\n')) {
    const insides = line
      .match(/\[\w+]/g)
      .map((match) => match.substring(1, match.length - 1));
    const outsides = line.split(/\[\w+]/);
    if (outsides.some(hasAbba) && !insides.some(hasAbba)) {
      count++;
    }
  }
  console.log(count);
}
solve(input);
