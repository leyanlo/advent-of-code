const fs = require('fs');

var input = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;
var input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd();
// 18726 too low
// 30389 too high
// 30529 too high

function solve(input) {
  const clayCoords = input.split('\n').map((row) =>
    ['x', 'y'].map((dimen) =>
      row
        .match(new RegExp(`${dimen}=([\\d.]+)`))[1]
        .split('..')
        .map(Number)
    )
  );

  // initialize range
  let xMin, xMax, yMin, yMax;
  for (const [xx, yy] of clayCoords) {
    xMin = Math.min(xMin ?? xx[0], ...xx);
    xMax = Math.max(xMax ?? xx[0], ...xx);
    yMin = Math.min(yMin ?? yy[0], ...yy);
    yMax = Math.max(yMax ?? yy[0], ...yy);
  }

  // initialize map
  let map = [];
  for (let y = yMin; y <= yMax; y++) {
    map[y] = [];
    for (let x = xMin - 1; x <= xMax + 1; x++) {
      map[y][x] = '.';
    }
  }
  for (const [xx, yy] of clayCoords) {
    for (let y = yy[0]; y <= (yy[1] ?? yy[0]); y++) {
      for (let x = xx[0]; x <= (xx[1] ?? xx[0]); x++) {
        map[y][x] = '#';
      }
    }
  }

  let sources = [[500, yMin]];
  while (sources.length) {
    // console.log(map.map((row) => row.join('')).join('\n'));
    // console.log('\n\n\n');
    let [x, y] = sources.shift();

    // fall as far as possible
    while (map[y]?.[x] === '.') {
      map[y][x] = '|';
      y++;
    }

    // abort if falls off map or hits an overflowed area
    if (y > yMax || map[y][x] === '|') {
      continue;
    }

    // TODO: fill container until overflows
    let hasOverflowed = false;
    while (!hasOverflowed) {
      y--;

      const [left, right] = [-1, 1].map((dx) => {
        let x2 = x;
        while (map[y][x2 + dx] !== '#') {
          x2 += dx;
          if (map[y + 1][x2] === '.' || map[y + 1][x2] === '|') {
            hasOverflowed = true;
            sources.push([x2, y + 1]);
            break;
          }
        }
        return x2;
      });

      for (let x2 = left; x2 <= right; x2++) {
        map[y][x2] = hasOverflowed ? '|' : '~';
      }
    }
  }

  console.log(map.map((row) => row.join('')).join('\n'));
  console.log('\n\n\n');

  console.log(
    map.reduce(
      (acc, row, y) =>
        acc + row.reduce((acc, char) => acc + /[|~]/.test(char), 0),
      0
    )
  );
  console.log(
    map.reduce(
      (acc, row, y) =>
        acc + row.reduce((acc, char) => acc + /~/.test(char), 0),
      0
    )
  );
}
solve(input);
