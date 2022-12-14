const fs = require('fs');

const input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  let paths = input
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((coords) => coords.split(',').map(Number))
    );

  const minY = 0;
  // add 2 rows for part 2
  const maxY = Math.max(...paths.flat().map(([x, y]) => y)) + 2;
  const yRange = maxY - minY;
  // part 2 will be isosceles triangle centered at 500
  let minX = 500 - yRange;
  let maxX = 500 + yRange;

  // shift x for debuggability
  const startX = 500 - minX;
  paths = paths.map((path) => path.map(([x, y]) => [x - minX, y]));
  maxX -= minX;
  minX = 0;

  // add bottom row for part 2
  const map = [...Array(maxY + 1).keys()].map((y) =>
    [...Array(maxX + 1)].fill(+(part === 2 && y === maxY))
  );

  // draw paths
  for (const path of paths) {
    for (let i = 0; i < path.length - 1; i++) {
      const dir = [
        Math.sign(path[i + 1][0] - path[i][0]),
        Math.sign(path[i + 1][1] - path[i][1]),
      ];
      for (
        let [x, y] = path[i];
        x !== path[i + 1][0] + dir[0] || y !== path[i + 1][1] + dir[1];
        x += dir[0], y += dir[1]
      ) {
        map[y][x] = 1;
      }
    }
  }

  let count = 0;
  outer: do {
    let [x, y] = [startX, 0];
    do {
      if (map[y]?.[x] === undefined || map[y][x] === 2) {
        break outer;
      }
      if (!map[y + 1]?.[x]) {
        y++;
        continue;
      }
      if (!map[y + 1]?.[x - 1]) {
        y++;
        x--;
        continue;
      }
      if (!map[y + 1]?.[x + 1]) {
        y++;
        x++;
        continue;
      }
      map[y][x] = 2;
      break;
    } while (true);
    count++;
  } while (true);
  console.log(count);
}
solve(input, 1);
solve(input, 2);
