const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = input
    .split('\n')
    .map((line) => line.split(' <-> ')[1].split(', ').map(Number));

  const groups = map.map(() => null);
  for (let i = 0; i < map.length; i++) {
    if (groups[i]) {
      continue;
    }
    const queue = [i];
    const group = new Set(queue);
    while (queue.length) {
      const id = queue.shift();
      groups[id] = group;
      for (const nextId of map[id]) {
        if (!group.has(nextId)) {
          group.add(nextId);
          queue.push(nextId);
        }
      }
    }
  }
  console.log(groups[0].size);
  console.log(new Set(groups).size);
}
solve(input);
