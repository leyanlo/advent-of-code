const fs = require('fs');

var input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;
var input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function printMap(map) {
  console.log(
    map
      .map((row) =>
        row.map((char) => (char === 0 ? '.' : char === 1 ? '#' : 'o')).join('')
      )
      .join('\n')
  );
}

// function solve(input) {
//   console.log(input);
//   let coords = input
//     .split('\n')
//     .map((line) =>
//       line.split(' -> ').map((coords) => coords.split(',').map(Number))
//     );
//   let start = 500;
//   console.log(coords);
//   let minX = Math.min(...coords.flat().map(([x, y]) => x));
//   let maxX = Math.max(...coords.flat().map(([x, y]) => x));
//   const minY = 0;
//   const maxY = Math.max(...coords.flat().map(([x, y]) => y));
//   console.log([minX, maxX, minY, maxY]);
//
//   coords = coords.map((line) => line.map(([x, y]) => [x - minX, y]));
//   console.log(coords);
//
//   maxX -= minX;
//   start -= minX;
//   minX = 0;
//
//   console.log([minX, maxX, minY, maxY, start]);
//   const map = [...Array(maxY + 1)].map(() => [...Array(maxX + 1)].fill(0));
//   for (const row of coords) {
//     for (let i = 0; i < row.length - 1; i++) {
//       const dir = [
//         Math.sign(row[i + 1][0] - row[i][0]),
//         Math.sign(row[i + 1][1] - row[i][1]),
//       ];
//       for (
//         let [x, y] = row[i];
//         x !== row[i + 1][0] || y !== row[i + 1][1];
//         x += dir[0], y += dir[1]
//       ) {
//         map[y][x] = 1;
//       }
//       map[row[i + 1][1]][row[i + 1][0]] = 1;
//     }
//   }
//   console.log(map.map((row) => row.join('')).join('\n'));
//   printMap(map);
//
//   let count = 0;
//   outer: do {
//     let [x, y] = [start, 0];
//     do {
//       if (map[y]?.[x] === undefined) {
//         break outer;
//       }
//       if (!map[y + 1]?.[x]) {
//         y++;
//         continue;
//       }
//       if (!map[y + 1]?.[x - 1]) {
//         y++;
//         x--;
//         continue;
//       }
//       if (!map[y + 1]?.[x + 1]) {
//         y++;
//         x++;
//         continue;
//       }
//       map[y][x] = 2;
//       break;
//     } while (true);
//     count++;
//   } while (true);
//   console.log(count);
// }
// solve(input);
function solve(input) {
  console.log(input);
  let coords = input
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((coords) => coords.split(',').map(Number))
    );
  let start = 500;
  console.log(coords);
  let minX = Math.min(...coords.flat().map(([x, y]) => x));
  let maxX = Math.max(...coords.flat().map(([x, y]) => x));
  const minY = 0;
  const maxY = Math.max(...coords.flat().map(([x, y]) => y)) + 2;
  console.log([minX, maxX, minY, maxY]);

  const range = maxY - minY;
  minX = 500 - range;
  maxX = 500 + range;
  coords = coords.map((line) => line.map(([x, y]) => [x - minX, y]));
  console.log(coords);

  maxX -= minX;
  start -= minX;
  minX = 0;

  console.log([minX, maxX, minY, maxY, start]);
  const map = [...Array(maxY + 1).keys()].map((y) =>
    [...Array(maxX + 1)].fill(+(y === maxY))
  );
  for (const row of coords) {
    for (let i = 0; i < row.length - 1; i++) {
      const dir = [
        Math.sign(row[i + 1][0] - row[i][0]),
        Math.sign(row[i + 1][1] - row[i][1]),
      ];
      for (
        let [x, y] = row[i];
        x !== row[i + 1][0] || y !== row[i + 1][1];
        x += dir[0], y += dir[1]
      ) {
        map[y][x] = 1;
      }
      map[row[i + 1][1]][row[i + 1][0]] = 1;
    }
  }
  console.log(map.map((row) => row.join('')).join('\n'));
  printMap(map);

  let count = 0;
  outer: do {
    let [x, y] = [start, 0];
    do {
      if (map[y][x] === 2) {
        break outer;
      }
      if (!map[y + 1]?.[x]) {
        y++;
        continue;
      }
      if (!map[y + 1]?.[x - 1]) {
        y++;
        x--;
        continue;
      }
      if (!map[y + 1]?.[x + 1]) {
        y++;
        x++;
        continue;
      }
      map[y][x] = 2;
      break;
    } while (true);
    count++;
  } while (true);
  printMap(map);
  console.log(count);
}
solve(input);
