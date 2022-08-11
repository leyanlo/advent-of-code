const fs = require('fs');

const input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

// https://www.youtube.com/watch?v=uCsD3ZGzMgE
function solve1(input) {
  const nElves = +input;
  const s = nElves.toString(2);
  console.log(2 * parseInt(s.slice(1), 2) + 1);
}
solve1(input);

function solve2(input) {
  const nElves = +input;
  const s = (nElves - 1).toString(3);
  console.log(
    +s[0] * (parseInt(s.slice(1), 3) + 1) + (+s[0] - 1) * 3 ** (s.length - 1)
  );
}
solve2(input);
