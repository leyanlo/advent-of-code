const fs = require('fs');

var input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;
var input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = input
    .split('\n')
    .map((line) => line.split(' <-> ')[1].split(', ').map(Number));
  console.log(map);

  const group = new Set([0]);
  const queue = [0];
  while (queue.length) {
    const id = queue.shift();
    for (const next of map[id]) {
      if (!group.has(next)) {
        group.add(next);
        queue.push(next);
      }
    }
  }
  console.log(group.size);
}
solve(input);
