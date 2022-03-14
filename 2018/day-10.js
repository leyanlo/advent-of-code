const fs = require('fs');

var input = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;
var input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

function solve(input) {
  const points = input
    .split('\n')
    .map((line) => line.match(/[-\d]+/g).map(Number));
  const [[x1, y1, vx1, vy1], [x2, y2, vx2, vy2]] = points;
  const t0 =
    -((x2 - x1) * (vx2 - vx1) + (y2 - y1) * (vy2 - vy1)) /
    ((vx2 - vx1) * (vx2 - vx1) + (vy2 - vy1) * (vy2 - vy1));
  console.log({ t0 });
  for (let t = ~~t0 - 5; t < ~~t0 + 5; t++) {
    const p = points.map(([x, y, vx, vy]) => [x + vx * t, y + vy * t, vx, vy]);
    const minX = Math.min(...p.map(([x]) => x));
    const maxX = Math.max(...p.map(([x]) => x));
    const minY = Math.min(...p.map(([, y]) => y));
    const maxY = Math.max(...p.map(([, y]) => y));
    const map = [...Array(maxY - minY + 1)].map(() =>
      Array(maxX - minX + 1).fill('.')
    );
    for (const [x, y] of p) {
      map[y - minY][x - minX] = '#';
    }
    console.log(t);
    console.log(map.map((line) => line.join('')).join('\n'));
    console.log();
  }
}
solve(input);
