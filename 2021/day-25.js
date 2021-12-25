const fs = require('fs');

var input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;
var input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();

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
          if (map[i][(j + 1) % map[i].length] === '.') {
            nextMap[i][(j + 1) % map[i].length] = '>';
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
          if (nextMap[(i + 1) % nextMap.length][j] === '.') {
            nextNextMap[(i + 1) % nextMap.length][j] = 'v';
            nextNextMap[i][j] = '.';
          }
        }
      }
    }

    // console.log(step, '\n' + map.map((row) => row.join('')).join('\n'), '\n');
    if (
      map.map((row) => row.join('')).join('\n') ===
      nextNextMap.map((row) => row.join('')).join('\n')
    ) {
      break;
    }

    map = nextNextMap;
  }
  // console.log(step, '\n' + map.map((row) => row.join('')).join('\n'), '\n');
  console.log(step);
}
solve(input);
