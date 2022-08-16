const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const grid = [...Array(1000)].map(() => [...Array(1000)].fill(0));
  for (const line of input.split('\n')) {
    let [, cmd, y1, x1, y2, x2] = line.match(
      /(.+) (\d+),(\d+) through (\d+),(\d+)/
    );
    [y1, x1, y2, x2] = [y1, x1, y2, x2].map(Number);
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        grid[y][x] =
          cmd === 'turn on' ? 1 : cmd === 'turn off' ? 0 : +!grid[y][x];
      }
    }
  }
  console.log(grid.flat().reduce((acc, n) => acc + n));
}
solve1(input);

function solve2(input) {
  const grid = [...Array(1000)].map(() => [...Array(1000)].fill(0));
  for (const line of input.split('\n')) {
    let [, cmd, y1, x1, y2, x2] = line.match(
      /(.+) (\d+),(\d+) through (\d+),(\d+)/
    );
    [y1, x1, y2, x2] = [y1, x1, y2, x2].map(Number);
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        grid[y][x] =
          cmd === 'turn on'
            ? grid[y][x] + 1
            : cmd === 'turn off'
            ? Math.max(grid[y][x] - 1, 0)
            : grid[y][x] + 2;
      }
    }
  }
  console.log(grid.flat().reduce((acc, n) => acc + n));
}
solve2(input);
