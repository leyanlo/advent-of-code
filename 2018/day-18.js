const fs = require('fs');

const input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

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

function getValue(map) {
  const counts = map.flat().reduce((acc, char) => {
    acc[char] = (acc[char] ?? 0) + 1;
    return acc;
  }, {});
  return counts['|'] * counts['#'];
}

function solve(input, minutes) {
  let map = input.split('\n').map((row) => row.split(''));
  const values = [];
  let cycleLength = 0;
  for (let t = 0; t < minutes; t++) {
    values[t] = getValue(map);
    if (t > 1000 && values.lastIndexOf(values[t], t - 1) !== -1) {
      cycleLength = t - values.lastIndexOf(values[t], t - 1);
      break;
    }

    const nextMap = map.map((row) => [...row]);
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const neighbors = DIRS.reduce((acc, [di, dj]) => {
          const char = map[i + di]?.[j + dj];
          char && (acc[char] = (acc[char] ?? 0) + 1);
          return acc;
        }, {});
        switch (map[i][j]) {
          case '.':
            neighbors['|'] >= 3 && (nextMap[i][j] = '|');
            break;
          case '|':
            neighbors['#'] >= 3 && (nextMap[i][j] = '#');
            break;
          case '#':
            (!neighbors['#'] || !neighbors['|']) && (nextMap[i][j] = '.');
            break;
        }
      }
    }
    map = nextMap;
  }

  console.log(
    cycleLength
      ? values.slice(-cycleLength)[(minutes - values.length) % cycleLength]
      : getValue(map)
  );
}
solve(input, 10);
solve(input, 1000000000);
