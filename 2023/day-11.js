const fs = require('fs');

const input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function solve(input, expansion) {
  const img = input
    .split('\n')
    .map((line) => line.split('').map((char) => +(char === '#')));

  const emptyRows = [];
  for (let i = 0; i < img.length; i++) {
    if (!img[i].some(Boolean)) {
      emptyRows.push(i);
    }
  }

  const emptyCols = [];
  for (let j = 0; j < img[0].length; j++) {
    if (!img.map((row) => row[j]).some(Boolean)) {
      emptyCols.push(j);
    }
  }

  const galaxies = [];
  for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < img[i].length; j++) {
      if (img[i][j]) {
        galaxies.push([i, j]);
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [row1, col1] = galaxies[i];
      const [row2, col2] = galaxies[j];
      const minRow = Math.min(row1, row2);
      const maxRow = Math.max(row1, row2);
      const minCol = Math.min(col1, col2);
      const maxCol = Math.max(col1, col2);
      let nCrosses = 0;
      for (const row of emptyRows) {
        if (minRow < row && row < maxRow) {
          nCrosses++;
        }
      }
      for (const col of emptyCols) {
        if (minCol < col && col < maxCol) {
          nCrosses++;
        }
      }
      sum +=
        Math.abs(row2 - row1) +
        Math.abs(col2 - col1) +
        nCrosses * (expansion - 1);
    }
  }
  console.log(sum);
}
solve(input, 2);
solve(input, 1000000);
