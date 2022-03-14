const fs = require('fs');

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

function solve(input) {
  const points = input
    .split('\n')
    .map((line) => line.match(/[-\d]+/g).map(Number));
  const [[x1, y1, vx1, vy1], [x2, y2, vx2, vy2]] = points;
  const t0 =
    -((x2 - x1) * (vx2 - vx1) + (y2 - y1) * (vy2 - vy1)) /
    ((vx2 - vx1) * (vx2 - vx1) + (vy2 - vy1) * (vy2 - vy1));
  for (let t = ~~t0 - 3; t <= ~~t0 + 3; t++) {
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
