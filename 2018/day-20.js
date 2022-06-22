const fs = require('fs');

var input = `^WNE$`;
var input = `^ENWWW(NEEE|SSE(EE|N))$`;
var input = `^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$`;
var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();
// 3280 too high
// 59 wrong

const branchRegex = /\([^()]+\)/;
function solve(input) {
  console.log(input);
  let longestPath = input.slice(1, -1);
  while (branchRegex.test(longestPath)) {
    longestPath = longestPath.replace(branchRegex, (str) => {
      return str
        .split(/\W/)
        .slice(1, -1)
        .reduce((acc, s) =>
          !acc || !s ? '' : acc.length > s.length ? acc : s
        );
    });
  }
  console.log(longestPath);
  console.log(longestPath.length);
}
solve(input);
