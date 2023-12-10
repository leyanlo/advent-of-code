const fs = require('fs');

const DIR = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd(),
  startPipe = 'J',
  startDir = DIR.U;

function solve(input) {
  let start;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [i, j];
      }
      return char;
    })
  );

  const path = [start];
  let curr = start;
  // TODO: calculate dir based on neighbors
  let dir = startDir;
  do {
    const [i, j] = path.at(-1);
    switch (map[i][j]) {
      case '|':
      case '-':
        break;
      case 'L':
        dir = dir === DIR.D ? DIR.R : DIR.U;
        break;
      case 'J':
        dir = dir === DIR.D ? DIR.L : DIR.U;
        break;
      case '7':
        dir = dir === DIR.U ? DIR.L : DIR.D;
        break;
      case 'F':
        dir = dir === DIR.U ? DIR.R : DIR.D;
        break;
    }
    const [di, dj] = dir;
    curr = [i + di, j + dj];
    path.push(curr);
  } while (map[curr[0]][curr[1]] !== 'S');
  console.log(~~(path.length / 2));

  map[start[0]][start[1]] = startPipe;

  const pathMap = map.map((row) => row.map(() => 0));
  const iMin = Math.min(...path.map(([i]) => i));
  const jMin = Math.min(...path.map(([, j]) => j));
  const iMax = Math.max(...path.map(([i]) => i));
  const jMax = Math.max(...path.map(([, j]) => j));
  for (const [i, j] of path) {
    pathMap[i][j] = 1;
  }
  let nTiles = 0;
  for (let i = iMin; i <= iMax; i++) {
    let nIntersects = 0;
    let bend = null;
    for (let j = jMin; j <= jMax; j++) {
      if (pathMap[i][j]) {
        const curr = map[i][j];
        if (curr === '|') {
          nIntersects++;
        } else if (curr !== '-') {
          if (bend) {
            if (
              (bend === 'L' && curr === '7') ||
              (bend === 'F' && curr === 'J')
            ) {
              nIntersects++;
            }
            bend = null;
          } else {
            bend = curr;
          }
        }
      } else if (nIntersects % 2) {
        nTiles++;
        pathMap[i][j] = 2;
      }
    }
  }
  console.log(nTiles);
}
solve(input);
