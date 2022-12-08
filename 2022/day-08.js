const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

const dirs = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

function solve1(input) {
  const map = input.split('\n').map((line) => line.split('').map(Number));
  const visibles = map.map((row) => row.map(() => 0));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      outer: for (const [di, dj] of dirs) {
        let [i2, j2] = [i + di, j + dj];
        for (; map[i2]?.[j2] !== undefined; i2 += di, j2 += dj) {
          if (map[i2][j2] >= map[i][j]) {
            continue outer;
          }
        }
        visibles[i][j] = 1;
        break;
      }
    }
  }
  console.log(visibles.flat().reduce((acc, n) => acc + n));
}
solve1(input);

function solve2(input) {
  const map = input.split('\n').map((line) => line.split('').map(Number));
  const scores = map.map((row) => row.map(() => 1));
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      for (const [di, dj] of dirs) {
        let [i2, j2] = [i + di, j + dj];
        for (; map[i2]?.[j2] !== undefined; i2 += di, j2 += dj) {
          if (map[i2][j2] >= map[i][j]) {
            i2 += di;
            j2 += dj;
            break;
          }
        }
        scores[i][j] *= Math.abs(i2 - di - i) + Math.abs(j2 - dj - j);
      }
    }
  }
  console.log(Math.max(...scores.flat()));
}
solve2(input);
