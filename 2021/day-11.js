const fs = require('fs');

const dirs = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

var input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
var input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function flash(octopi, i, j) {
  let count = 0;
  for (const [di, dj] of dirs) {
    if (octopi[i + di]?.[j + dj] === undefined) continue;
    octopi[i + di][j + dj]++;
    if (octopi[i + di][j + dj] === 10) {
      count++;
      count += flash(octopi, i + di, j + dj);
    }
  }
  return count;
}

function solve(input) {
  let octopi = input.split('\n').map((line) => line.split('').map(Number));
  console.log(octopi.map((line) => line.join('')).join('\n'), '\n');

  let count = 0;
  let step = 0;
  while (!octopi.every((line) => line.every((o) => o === 0))) {
    step++
    // for (let step = 0; step < 100; step++) {
    for (let i = 0; i < octopi.length; i++) {
      for (let j = 0; j < octopi.length; j++) {
        octopi[i][j]++;
        if (octopi[i][j] === 10) {
          count++;
          count += flash(octopi, i, j);
        }
      }
    }
    octopi = octopi.map((line) => line.map((o) => (o > 9 ? 0 : o)));
    console.log('After step ', step );
    // console.log(octopi.map((line) => line.join('')).join('\n'), '\n');
    // console.log(count);
  }
}
solve(input);
