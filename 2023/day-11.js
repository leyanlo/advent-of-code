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
    const [r1, c1] = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const [r2, c2] = galaxies[j];
      const rows = [r1, r2].sort((a, b) => a - b);
      const cols = [c1, c2].sort((a, b) => a - b);
      let nCrosses = 0;
      for (const r of emptyRows) {
        if (rows[0] < r && r < rows[1]) {
          nCrosses++;
        }
      }
      for (const c of emptyCols) {
        if (cols[0] < c && c < cols[1]) {
          nCrosses++;
        }
      }
      sum += rows[1] - rows[0] + cols[1] - cols[0] + nCrosses * (expansion - 1);
    }
  }
  console.log(sum);
}
solve(input, 2);
solve(input, 1000000);
