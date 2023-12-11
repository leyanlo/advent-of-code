const fs = require('fs');

var input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
  mult = 100;
var input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd(),
  mult = 1000000;
// 9664516 wrong
// 9799681 right

// function solve(input) {
//   // console.log(input);
//   const img = input
//     .split('\n')
//     .map((line) => line.split('').map((char) => +(char === '#')));
//   // console.log(img.map((row) => row.join('')).join('\n'), '\n');
//
//   let nRows = 0;
//   for (let i = 0; i < img.length; i++) {
//     if (!img[i].some(Boolean)) {
//       nRows++;
//       img.splice(
//         i,
//         0,
//         img[0].map(() => 0)
//       );
//       i++;
//     }
//   }
//   console.log(nRows, 'rows contain no galaxies');
//   // console.log(img.map((row) => row.join('')).join('\n'), '\n');
//
//   let nCols = 0;
//   for (let j = 0; j < img[0].length; j++) {
//     if (!img.map((row) => row[j]).some(Boolean)) {
//       nCols++;
//       for (let i = 0; i < img.length; i++) {
//         img[i].splice(j, 0, 0);
//       }
//       j++;
//     }
//   }
//   console.log(nCols, 'columns contain no galaxies');
//   // console.log(img.map((row) => row.join('')).join('\n'), '\n');
//
//   const galaxies = [];
//   for (let i = 0; i < img.length; i++) {
//     for (let j = 0; j < img[i].length; j++) {
//       if (img[i][j]) {
//         galaxies.push([i, j]);
//       }
//     }
//   }
//   // console.log(galaxies);
//   console.log(galaxies.length, 'galaxies');
//
//   let sum = 0;
//   for (let i = 0; i < galaxies.length - 1; i++) {
//     const [i1, j1] = galaxies[i];
//     for (let j = i + 1; j < galaxies.length; j++) {
//       const [i2, j2] = galaxies[j];
//       // console.log(i + 1, j + 1, getDist(galaxies[i], galaxies[j]));
//       sum += Math.abs(i2 - i1) + Math.abs(j2 - j1);
//     }
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
  // console.log(input);
  const img = input
    .split('\n')
    .map((line) => line.split('').map((char) => +(char === '#')));
  // console.log(img.map((row) => row.join('')).join('\n'), '\n');

  const emptyRows = [];
  for (let i = 0; i < img.length; i++) {
    if (!img[i].some(Boolean)) {
      emptyRows.push(i);
    }
  }
  // console.log(img.map((row) => row.join('')).join('\n'), '\n');

  const emptyCols = [];
  for (let j = 0; j < img[0].length; j++) {
    if (!img.map((row) => row[j]).some(Boolean)) {
      emptyCols.push(j);
    }
  }
  // console.log(img.map((row) => row.join('')).join('\n'), '\n');

  const galaxies = [];
  for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < img[i].length; j++) {
      if (img[i][j]) {
        galaxies.push([i, j]);
      }
    }
  }
  // console.log(galaxies);
  console.log(galaxies.length, 'galaxies');

  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [i1, j1] = galaxies[i];
      const [i2, j2] = galaxies[j];
      const iMin = Math.min(i1, i2);
      const iMax = Math.max(i1, i2);
      const jMin = Math.min(j1, j2);
      const jMax = Math.max(j1, j2);
      let nCrosses = 0;
      for (const i3 of emptyRows) {
        if (iMin < i3 && i3 < iMax) {
          nCrosses++;
        }
      }
      for (const j3 of emptyCols) {
        if (jMin < j3 && j3 < jMax) {
          nCrosses++;
        }
      }
      sum += Math.abs(i2 - i1) + Math.abs(j2 - j1) + nCrosses * (mult - 1);
    }
  }
  console.log(sum);
}
solve(input);
