const fs = require('fs');

const input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input) {
  const map = input.split('\n').map((line) => line.split('').map(Number));
  const lows = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        dirs.every(
          ([di, dj]) =>
            map[i + di]?.[j + dj] === undefined ||
            map[i][j] < map[i + di][j + dj]
        )
      ) {
        lows.push([i, j]);
      }
    }
  }
  console.log(lows.reduce((acc, [i, j]) => acc + map[i][j] + 1, 0));

  const basinSizes = [];
  for (const [i, j] of lows) {
    const basin = new Set();
    basin.add([i, j].join());
    const queue = dirs.map(([di, dj]) => [i + di, j + dj]);
    while (queue.length) {
      const [i2, j2] = queue.shift();
      if (
        map[i2]?.[j2] === undefined ||
        map[i2][j2] === 9 ||
        basin.has([i2, j2].join())
      ) {
        continue;
      }
      basin.add([i2, j2].join());
      queue.push(...dirs.map(([di, dj]) => [i2 + di, j2 + dj]));
    }
    basinSizes.push(basin.size);
  }
  console.log(
    basinSizes
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((acc, n) => acc * n)
  );
}
solve(input);
