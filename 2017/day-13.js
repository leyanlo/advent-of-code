const fs = require('fs');

var input = `0: 3
1: 2
4: 4
6: 4`;
var input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = input
    .split('\n')
    .map((line) => line.split(': ').map(Number))
    .reduce((acc, [left, right]) => {
      acc[left] = right;
      return acc;
    }, []);
  console.log(map);

  let severity = 0;
  for (let depth = 0; depth <= map.length; depth++) {
    const range = map[depth];
    if (!range) {
      continue;
    }
    const tMod = depth % (2 * range - 2);
    const pos = Math.min(tMod, 2 * range - 2 - tMod);
    if (!pos) {
      severity += depth * range
    }
  }
  console.log(severity)
}
solve(input);
