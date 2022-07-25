const fs = require('fs');

var input = `ne,ne,ne`;
var input = `ne,ne,sw,sw`;
var input = `ne,ne,s,s`;
var input = `se,sw,se,sw,sw`;
var input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

const toCartesian = {
  n: [0, 1],
  ne: [1, 0.5],
  se: [1, -0.5],
  s: [0, -1],
  sw: [-1, -0.5],
  nw: [-1, 0.5],
};

function solve(input) {
  console.log(input.split(','));
  let [x, y] = [0, 0];
  for (const dir of input.split(',')) {
    const [dx, dy] = toCartesian[dir];
    x += dx;
    y += dy;
  }
  console.log(Math.abs(x) + Math.max(0, Math.abs(y) - Math.abs(x / 2)));
}
solve(input);
