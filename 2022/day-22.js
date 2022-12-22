const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

const facing = {
  0: { 1: 0, [-1]: 2 },
  1: { 0: 1 },
  [-1]: { 0: 3 },
};

function solve1(input) {
  let [map, path] = input.split('\n\n');

  map = map
    .split('\n')
    .map((line) =>
      line.split('').map((char) => (char === ' ' ? 0 : char === '.' ? 1 : 2))
    );

  path = path.match(/\d+|R|L/g);

  let [x, y, dx, dy] = [map[0].indexOf(0), 0, 1, 0];

  for (const instr of path) {
    if (/R|L/.test(instr)) {
      [dx, dy] = instr === 'R' ? [-dy, dx] : [dy, -dx];
    } else {
      for (let i = 0; i < +instr; i++) {
        let [x2, y2] = [
          (x + dx + map[y].length) % map[y].length,
          (y + dy + map.length) % map.length,
        ];
        while (!map[y2]?.[x2]) {
          [x2, y2] = [
            (x2 + dx + map[y].length) % map[y].length,
            (y2 + dy + map.length) % map.length,
          ];
        }
        if (map[y2][x2] === 1) {
          [x, y] = [x2, y2];
        } else {
          break;
        }
      }
    }
  }
  console.log(1000 * (y + 1) + 4 * (x + 1) + facing[dy][dx]);
}
solve1(input);

function solve2(input) {
  let [map, path] = input.split('\n\n');

  map = map
    .split('\n')
    .map((line) => line.split('').map((char) => [' ', '.', '#'].indexOf(char)));

  path = path.match(/\d+|[A-Z]/g);

  let [x, y, dx, dy] = [map[0].indexOf(1), 0, 1, 0];

  for (const instr of path) {
    if (/R|L/.test(instr)) {
      [dx, dy] = instr === 'R' ? [-dy, dx] : [dy, -dx];
    } else {
      for (let i = 0; i < +instr; i++) {
        let [x2, y2, dx2, dy2] = [x + dx, y + dy, dx, dy];
        if (!map[y2]?.[x2]) {
          if (y2 === -1 && x2 < 100) {
            [x2, y2, dx2, dy2] = [0, x2 + 100, 1, 0];
          } else if (y2 === -1) {
            [x2, y2, dx2, dy2] = [x2 - 100, 199, 0, -1];
          } else if (x2 === 150) {
            [x2, y2, dx2, dy2] = [99, 149 - y2, -1, 0];
          } else if (y2 === 50 && x2 >= 100) {
            [x2, y2, dx2, dy2] = [99, x2 - 50, -1, 0];
          } else if (x2 === 100 && y2 < 100) {
            [x2, y2, dx2, dy2] = [y2 + 50, 49, 0, -1];
          } else if (x2 === 100) {
            [x2, y2, dx2, dy2] = [149, 149 - y2, -1, 0];
          } else if (y2 === 150 && x2 >= 50) {
            [x2, y2, dx2, dy2] = [49, x2 + 100, -1, 0];
          } else if (x2 === 50) {
            [x2, y2, dx2, dy2] = [y2 - 100, 149, 0, -1];
          } else if (y2 === 200) {
            [x2, y2, dx2, dy2] = [x2 + 100, 0, 0, 1];
          } else if (x2 === -1 && y2 >= 150) {
            [x2, y2, dx2, dy2] = [y2 - 100, 0, 0, 1];
          } else if (x2 === -1) {
            [x2, y2, dx2, dy2] = [50, 149 - y2, 0, 1];
          } else if (y2 === 99) {
            [x2, y2, dx2, dy2] = [50, x2 + 50, 1, 0];
          } else if (y2 >= 50) {
            [x2, y2, dx2, dy2] = [y2 - 50, 100, 0, 1];
          } else {
            [x2, y2, dx2, dy2] = [0, 149 - y2, 1, 0];
          }
        }
        if (map[y2][x2] === 1) {
          [x, y, dx, dy] = [x2, y2, dx2, dy2];
        } else {
          break;
        }
      }
    }
  }
  console.log(1000 * (y + 1) + 4 * (x + 1) + facing[dy][dx]);
}
solve2(input);
