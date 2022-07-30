const fs = require('fs');

var input = `p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`;
var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

// Manhattan distance
function abs(v) {
  return v.reduce((acc, x) => acc + Math.abs(x), 0);
}

function solve(input) {
  const particles = input.split('\n').map((line, id) => {
    const [px, py, pz, vx, vy, vz, ax, ay, az] = line
      .match(/[\-\d]+/g)
      .map(Number);
    return { p: [px, py, pz], v: [vx, vy, vz], a: [ax, ay, az], id };
  });
  console.log(
    particles.sort((a, b) => abs(a.a) - abs(b.a) || abs(a.v) - abs(b.v))[0].id
  );
}
solve(input);
