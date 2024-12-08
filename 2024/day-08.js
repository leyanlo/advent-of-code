import { readFileSync } from 'node:fs';

var input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
var input = readFileSync('./day-08-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const map = {};
//   const lines = input.split('\n');
//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     for (let j = 0; j < line.length; j++) {
//       const char = line[j];
//       if (char !== '.') {
//         (map[char] ??= []).push([i, j]);
//       }
//     }
//   }
//   console.log(map);
//
//   const antinodes = lines.map((line) => Array.from(line).fill(0));
//   for (const coords of Object.values(map)) {
//     for (let i = 0; i < coords.length - 1; i++) {
//       const [y, x] = coords[i];
//       for (let j = i + 1; j < coords.length; j++) {
//         const [y2, x2] = coords[j];
//         const dy = y2 - y;
//         const dx = x2 - x;
//
//         const y3 = y - dy;
//         const x3 = x - dx;
//         const y4 = y2 + dy;
//         const x4 = x2 + dx;
//
//         if (antinodes[y3]?.[x3] === 0) {
//           antinodes[y3][x3] = 1;
//         }
//         if (antinodes[y4]?.[x4] === 0) {
//           antinodes[y4][x4] = 1;
//         }
//       }
//     }
//   }
//   console.log(antinodes.flat().reduce((acc, n) => acc + n));
// }
// solve(input);

function solve(input) {
  const map = {};
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char !== '.') {
        (map[char] ??= []).push([i, j]);
      }
    }
  }
  console.log(map);

  const antinodes = lines.map((line) => Array.from(line).fill(0));
  for (const coords of Object.values(map)) {
    for (let i = 0; i < coords.length - 1; i++) {
      const [y, x] = coords[i];
      for (let j = i + 1; j < coords.length; j++) {
        const [y2, x2] = coords[j];
        const dy = y2 - y;
        const dx = x2 - x;

        let y3 = y;
        let x3 = x;
        while (antinodes[y3]?.[x3] !== undefined) {
          antinodes[y3][x3] = 1;
          y3 -= dy;
          x3 -= dx;
        }

        let y4 = y2;
        let x4 = x2;
        while (antinodes[y4]?.[x4] !== undefined) {
          antinodes[y4][x4] = 1;
          y4 += dy;
          x4 += dx;
        }
      }
    }
  }
  console.log(antinodes);
  console.log(antinodes.flat().reduce((acc, n) => acc + n));
}
solve(input);
