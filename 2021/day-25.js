const fs = require('fs');

const input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function solve(input) {
  let map = input.split('\n').map((row) => row.split(''));
  let step = 0;
  while (true) {
    step++;

    const nextMap = map.map((row) => row.map((c) => c));
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const char = map[i][j];
        if (char === '>') {
          const nextJ = (j + 1) % map[i].length;
          if (map[i][nextJ] === '.') {
            nextMap[i][nextJ] = '>';
            nextMap[i][j] = '.';
          }
        }
      }
    }

    const nextNextMap = nextMap.map((row) => row.map((c) => c));
    for (let i = 0; i < nextMap.length; i++) {
      for (let j = 0; j < nextMap[i].length; j++) {
        const char = nextMap[i][j];
        if (char === 'v') {
          const nextI = (i + 1) % nextMap.length;
          if (nextMap[nextI][j] === '.') {
            nextNextMap[nextI][j] = 'v';
            nextNextMap[i][j] = '.';
          }
        }
      }
    }

    if (
      map.map((row) => row.join('')).join('\n') ===
      nextNextMap.map((row) => row.join('')).join('\n')
    ) {
      break;
    }

    map = nextNextMap;
  }
  console.log(step);
}
solve(input);
