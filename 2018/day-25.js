const fs = require('fs');

var input = `1,-1,-1,-2
-2,-2,0,1
0,2,1,3
-2,3,-2,1
0,2,3,-2
-1,-1,1,-2
0,-2,-1,0
-2,2,3,-1
1,2,2,0
-1,-2,0,-2`;
var input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function getDist(p1, p2) {
  return p1.map((_, i) => Math.abs(p1[i] - p2[i])).reduce((acc, n) => acc + n);
}

function solve(input) {
  const points = input
    .split('\n')
    .map((line) => line.trim().split(',').map(Number));
  const seen = new Set();
  let nConstellations = 0;
  for (const point of points) {
    if (seen.has(point)) {
      continue;
    }
    nConstellations++;
    const queue = [point];
    while (queue.length) {
      const p1 = queue.shift();
      if (seen.has(p1)) {
        continue;
      }
      seen.add(p1);
      for (const p2 of points) {
        if (!seen.has(p2) && getDist(p1, p2) <= 3) {
          queue.push(p2);
        }
      }
    }
  }
  console.log(nConstellations);
}
solve(input);
