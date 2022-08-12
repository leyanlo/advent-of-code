const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input) {
  const nodes = input
    .split('\n')
    .slice(2)
    .map((line) => {
      const [x, y, size, used, avail, usePct] = line.match(/\d+/g).map(Number);
      return { x, y, size, used, avail, usePct };
    });
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

  const maxAvail = Math.max(...nodes.map(({ avail }) => avail));
  const map = [];
  let pos;
  for (const { x, y, used } of nodes) {
    map[y] = map[y] ?? [];
    map[y][x] = used === 0 ? '_' : used > maxAvail ? '#' : '.';
    if (map[y][x] === '_') {
      pos = [x, y];
    }
  }
  map[0][map[0].length - 1] = 'G';

  const queue = [{ pos, steps: 0 }];
  const seen = map.map((row) => row.map(() => false));
  let stepsToG;
  outer: while (queue.length) {
    const {
      pos: [x, y],
      steps,
    } = queue.shift();
    if (seen[y][x]) {
      continue;
    }
    seen[y][x] = true;
    for (const [dx, dy] of dirs) {
      const [x2, y2] = [x + dx, y + dy];
      switch (map[y2]?.[x2]) {
        case '.':
          queue.push({ pos: [x2, y2], steps: steps + 1 });
          break;
        case 'G':
          stepsToG = steps + 1;
          break outer;
      }
    }
  }
  console.log(stepsToG + 5 * (map[0].length - 2));
}
solve(input);
