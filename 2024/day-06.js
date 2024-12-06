import { readFileSync } from 'node:fs';

const input = readFileSync('./day-06-input.txt', 'utf8').trimEnd();

const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

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

  let dirIdx = 0;
  let [dy, dx] = DIRS[0];
  let [y, x] = start;
  let count = 0;
  const seen = map.map((row) => row.map(() => 0));

  while (map[y]?.[x] !== undefined) {
    if (!seen[y][x]) {
      seen[y][x] = 1;
      count++;
    }

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
  console.log(count);

  count = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (!seen[i][j]) {
        continue;
      }

      let dirIdx = 0;
      let [dy, dx] = DIRS[0];
      let [y, x] = start;
      const seenDir = map.map((row) => row.map(() => []));

      while (map[y]?.[x] !== undefined) {
        if (seenDir[y][x].includes(dirIdx)) {
          count++;
          break;
        }

        seenDir[y][x].push(dirIdx);

        let y2 = y + dy;
        let x2 = x + dx;
        while (map[y2]?.[x2] === 1 || (y2 === i && x2 === j)) {
          dirIdx = (dirIdx + 1) % 4;
          [dy, dx] = DIRS[dirIdx];
          y2 = y + dy;
          x2 = x + dx;
        }
        [y, x] = [y2, x2];
      }
    }
  }
  console.log(count);
}
solve(input);
