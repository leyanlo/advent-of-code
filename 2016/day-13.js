const fs = require('fs');

var input = `10`,
  target = [7, 4];
var input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd(),
  target = [31, 39];

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input) {
  input = +input;
  console.log(input);
  const seen = [];
  const queue = [{ steps: 0, coords: [1, 1] }];
  while (queue.length) {
    const {
      steps,
      coords: [x, y],
    } = queue.shift();
    if (x === target[0] && y === target[1]) {
      console.log(steps);
      break;
    }
    if (seen[y]?.[x]) {
      continue;
    }
    seen[y] = seen[y] ?? [];
    seen[y][x] = true;
    if (
      (x * x + 3 * x + 2 * x * y + y + y * y + input)
        .toString(2)
        .split('')
        .filter((char) => char === '1').length %
        2 ===
      1
    ) {
      // wall
      continue;
    }
    for (const [dx, dy] of dirs) {
      queue.push({ steps: steps + 1, coords: [x + dx, y + dy] });
    }
  }
}
solve(input);
