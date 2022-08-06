const fs = require('fs');

var input = ``;
var input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function solve(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    const split = line.split('-');
    const name = split.slice(0, -1);
    let [id, checksum] = split[split.length - 1].split(/[[\]]/);
    id = +id;
    const chars = name.map((part) => part.split('')).flat();
    const map = chars.reduce((acc, c) => {
      acc[c] = (acc[c] ?? 0) + 1;
      return acc;
    }, {});
    if (
      checksum ===
      Object.entries(map)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 5)
        .map(([char]) => char)
        .join('')
    ) {
      sum += id;
    }
  }
  console.log(sum)
}
solve(input);
