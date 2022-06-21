const fs = require('fs');

var input = `.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`;
var input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function solve(input) {
  let map = input.split('\n').map((row) => row.split(''));
  for (let t = 0; t < 10; t++) {
    console.log(t);
    console.log(map.map((row) => row.join('')).join('\n'));
    console.log('\n');

    const nextMap = map.map((row) => [...row]);
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const counts = DIRS.reduce((acc, [di, dj]) => {
          const char = map[i + di]?.[j + dj];
          char && (acc[char] = (acc[char] ?? 0) + 1);
          return acc;
        }, {});
        switch (map[i][j]) {
          case '.':
            counts['|'] >= 3 && (nextMap[i][j] = '|');
            break;
          case '|':
            counts['#'] >= 3 && (nextMap[i][j] = '#');
            break;
          case '#':
            (!counts['#'] || !counts['|']) && (nextMap[i][j] = '.');
            break;
        }
      }
    }
    map = nextMap;
  }

  console.log(10);
  console.log(map.map((row) => row.join('')).join('\n'));
  console.log('\n');

  const counts = map.flat().reduce((acc, char) => {
    acc[char] = (acc[char] ?? 0) + 1;
    return acc;
  }, {});
  console.log(counts['|'] * counts['#']);
}
solve(input);
