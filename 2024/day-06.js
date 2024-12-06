import { readFileSync } from 'node:fs';

var input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
var input = readFileSync('./day-06-input.txt', 'utf8').trimEnd();

const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// function solve(input) {
//   let map = input.split('\n').map((row) => row.split(''));
//   let dirIdx = 0;
//   let [dy, dx] = DIRS[0];
//   let y, x;
//   outer: for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[0].length; j++) {
//       if (map[i][j] === '^') {
//         [y, x] = [i, j];
//         break outer;
//       }
//     }
//   }
//
//   map = map.map((row) => row.map((cell) => (cell === '#' ? 1 : 0)));
//
//   let count = 0;
//   const seen = map.map((row) => row.map(() => 0));
//
//   while (map[y]?.[x] !== undefined) {
//     if (!seen[y][x]) {
//       seen[y][x] = 1;
//       count++;
//     }
//
//     let y2 = y + dy;
//     let x2 = x + dx;
//     while (map[y2]?.[x2] === 1) {
//       dirIdx = (dirIdx + 1) % 4;
//       [dy, dx] = DIRS[dirIdx];
//       y2 = y + dy;
//       x2 = x + dx;
//     }
//     [y, x] = [y2, x2];
//   }
//   console.log(count);
// }
// solve(input);

function solve(input) {
  let map = input.split('\n').map((row) => row.split(''));
  let start;
  outer: for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === '^') {
        start = [i, j];
        break outer;
      }
    }
  }

  map = map.map((row) => row.map((cell) => (cell === '#' ? 1 : 0)));

  let count = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (i === 6 && j === 3) {
        debugger;
      }
      let dirIdx = 0;
      let [dy, dx] = DIRS[0];
      let [y, x] = start;
      const seen = map.map((row) => row.map(() => []));

      while (map[y]?.[x] !== undefined) {
        if (seen[y][x].includes(dirIdx)) {
          count++;
          break;
        }

        seen[y][x].push(dirIdx);

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
