const fs = require('fs');

var input = ``;
var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function solve(input) {
  const nodes = input
    .split('\n')
    .slice(2)
    .map((line) => {
      const [x, y, size, used, avail, usePct] = line.match(/\d+/g).map(Number);
      return { x, y, size, used, avail, usePct };
    });
  console.log(nodes);
  let n = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      n +=
        (a.used > 0 && a.used <= b.avail) || (b.used > 0 && b.used <= a.avail);
    }
  }
  console.log(n);
}
solve(input);
