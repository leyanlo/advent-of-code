import { readFileSync } from 'node:fs';

const input = readFileSync('./day-06-input.txt', 'utf8').trimEnd();

const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function run(map, start) {
  let dirIdx = 0;
  let [dy, dx] = DIRS[0];
  let [y, x] = start;
  const seen = map.map((row) => row.map(() => []));

  while (map[y]?.[x] !== undefined) {
    if (seen[y][x].includes(dirIdx)) {
      return {
        seen,
        loops: 1,
      };
    }

    seen[y][x].push(dirIdx);

    let y2 = y + dy;
    let x2 = x + dx;
    while (map[y2]?.[x2] === 1) {
      dirIdx = (dirIdx + 1) % 4;
      [dy, dx] = DIRS[dirIdx];
      y2 = y + dy;
      x2 = x + dx;
    }
    [y, x] = [y2, x2];
  }
  return {
    seen,
    loops: 0,
  };
}

function solve(input) {
  let start;
  const map = input.split('\n').map((row, i) =>
    row.split('').map((char, j) => {
      if (char === '^') {
        start = [i, j];
      }
      return char === '#' ? 1 : 0;
    })
  );

  const { seen } = run(map, start);
  console.log(seen.flat().filter((arr) => arr.length).length);

  let count = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (!seen[i][j].length) {
        continue;
      }

      map[i][j] = 1;
      const { loops } = run(map, start);
      count += loops;
      map[i][j] = 0;
    }
  }
  console.log(count);
}
solve(input);
