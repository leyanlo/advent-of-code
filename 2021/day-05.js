const fs = require('fs');

var input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;
var input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const lines = input
//     .split('\n')
//     .map((line) =>
//       line.split(' -> ').map((coords) => coords.split(',').map(Number))
//     );
//   let maxX = 0;
//   let maxY = 0;
//   const diagram = [];
//   for (const line of lines) {
//     const [[x1, y1], [x2, y2]] = line;
//     if (x1 !== x2 && y1 !== y2) continue;
//     maxX = Math.max(maxX, x1, x2);
//     maxY = Math.max(maxY, y1, y2);
//     for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
//       for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
//         diagram[x] = diagram[x] ?? [];
//         diagram[x][y] = (diagram[x][y] ?? 0) + 1;
//       }
//     }
//   }
//   // console.log(
//   //   [...Array(maxY + 1).keys()]
//   //     .map((y) =>
//   //       [...Array(maxX + 1).keys()].map((x) => diagram[x]?.[y] ?? '.').join('')
//   //     )
//   //     .join('\n')
//   // );
//   console.log(diagram.flat().filter((n) => n >= 2).length);
// }
// solve(input);
function solve(input) {
  const lines = input
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((coords) => coords.split(',').map(Number))
    );
  let maxX = 0;
  let maxY = 0;
  const diagram = [];
  for (const line of lines) {
    const [[x1, y1], [x2, y2]] = line;
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx !== 0 && dy !== 0 && Math.abs(dy / dx) !== 1) continue;
    maxX = Math.max(maxX, x1, x2);
    maxY = Math.max(maxY, y1, y2);
    for (
      let [x, y] = [x1, y1];
      (x2 > x1 ? x <= x2 : x >= x2) && (y2 > y1 ? y <= y2 : y >= y2);
      x += x2 > x1 ? 1 : x2 === x1 ? 0 : -1,
        y += y2 > y1 ? 1 : y2 === y1 ? 0 : -1
    ) {
      diagram[x] = diagram[x] ?? [];
      diagram[x][y] = (diagram[x][y] ?? 0) + 1;
    }
    // console.log(line);
    // console.log(
    //   [...Array(maxY + 1).keys()]
    //     .map((y) =>
    //       [...Array(maxX + 1).keys()]
    //         .map((x) => diagram[x]?.[y] ?? '.')
    //         .join('')
    //     )
    //     .join('\n')
    // );
  }
  console.log(diagram.flat().filter((n) => n >= 2).length);
}
solve(input);
