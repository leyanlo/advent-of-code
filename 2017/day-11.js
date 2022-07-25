const fs = require('fs');

const input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

const toCartesian = {
  n: [0, 1],
  ne: [1, 0.5],
  se: [1, -0.5],
  s: [0, -1],
  sw: [-1, -0.5],
  nw: [-1, 0.5],
};

function getDist(x, y) {
  return Math.abs(x) + Math.max(0, Math.abs(y) - Math.abs(x / 2));
}

function solve(input) {
  let [x, y] = [0, 0];
  let maxDist = 0;
  for (const dir of input.split(',')) {
    const [dx, dy] = toCartesian[dir];
    x += dx;
    y += dy;
    maxDist = Math.max(maxDist, getDist(x, y));
  }
  console.log(getDist(x, y));
  console.log(maxDist);
}
solve(input);
