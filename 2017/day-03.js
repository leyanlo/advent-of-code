const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function solve(input) {
  const n = +input;
  const r = ~~((Math.sqrt(n - 1) + 1) / 2);
  const corner = (2 * r + 1) ** 2;
  const arcLength = Math.abs(((corner - n) % (2 * r)) - r);
  console.log(r + arcLength);
}
solve(input);

const neighbors = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function* spiral() {
  let i = 0;
  while (true) {
    yield {
      dir: dirs[i % dirs.length],
      steps: ~~(i / 2) + 1,
    };
    i++;
  }
}

function solve2(input) {
  const n = +input;
  const grid = { 0: { 0: 1 } };
  let [x, y] = [0, 0];
  for (const {
    dir: [dx, dy],
    steps,
  } of spiral()) {
    for (let i = 0; i < steps; i++) {
      x += dx;
      y += dy;
      grid[y] = grid[y] || {};
      const value = neighbors
        .map(([dx2, dy2]) => grid[y + dy2]?.[x + dx2] ?? 0)
        .reduce((acc, n) => acc + n);
      if (value > n) {
        console.log(value);
        return;
      }
      grid[y][x] = value;
    }
  }
}
solve2(input);
