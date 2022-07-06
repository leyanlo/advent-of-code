const fs = require('fs');

var input = `pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`;
var input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function dist(p1, p2) {
  return p1.map((_, i) => Math.abs(p1[i] - p2[i])).reduce((acc, n) => acc + n);
}

function solve(input) {
  const nanobots = input.split('\n').map((line) => {
    let [pos, r] = line.split(', ');
    pos = pos.match(/[-\d]+/g).map(Number);
    r = r.match(/[-\d]+/g).map(Number)[0];
    return { pos, r };
  });
  const strongest = nanobots.reduce((acc, nanobot) =>
    acc.r > nanobot.r ? acc : nanobot
  );
  console.log(
    nanobots.filter(({ pos }) => dist(pos, strongest.pos) <= strongest.r).length
  );
}
solve(input);
