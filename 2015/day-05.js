const fs = require('fs');

const input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve(input) {
  const strings = input.split('\n');
  console.log(
    strings.filter(
      (s) =>
        s.match(/[aeiou]/g)?.length >= 3 &&
        /(.)\1/.test(s) &&
        !/(ab|cd|pq|xy)/.test(s)
    ).length
  );
  console.log(
    strings.filter((s) => /(..).*\1/.test(s) && /(.).\1/.test(s)).length
  );
}
solve(input);
