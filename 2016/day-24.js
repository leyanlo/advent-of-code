const fs = require('fs');

var input = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input) {
  const map = input.split('\n').map((line) => line.split(''));
  const numCoords = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (/\d/.test(map[i][j])) {
        numCoords[map[i][j]] = [i, j];
      }
    }
  }
  const completePaths = [];
  const paths = [{ path: ['0'], coords: numCoords[0], steps: 0 }];
  while (paths.length) {
    const {
      path,
      coords: [i0, j0],
      steps: steps0,
    } = paths.shift();
    if (new Set(path).size === numCoords.length) {
      completePaths.push({ path, steps: steps0 });
      continue;
    }
    const seen = map.map((row) => row.map(() => false));
    seen[i0][j0] = true;
    const queue = dirs.map(([di, dj]) => ({
      coords: [i0 + di, j0 + dj],
      steps: steps0 + 1,
    }));
    while (queue.length) {
      const {
        coords: [i, j],
        steps,
      } = queue.shift();
      if (!/\d|\./.test(map[i][j]) || seen[i][j]) {
        continue;
      }
      seen[i][j] = true;
      if (/\d/.test(map[i][j]) && !path.includes(map[i][j])) {
        paths.push({
          path: [...path, map[i][j]],
          coords: [i, j],
          steps,
        });
        continue;
      }
      queue.push(
        ...dirs.map(([di, dj]) => ({
          coords: [i + di, j + dj],
          steps: steps + 1,
        }))
      );
    }
  }
  console.log(completePaths)
  console.log(completePaths.sort((a, b) => a.steps - b.steps)[0].steps);
}
solve(input);
