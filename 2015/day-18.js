const fs = require('fs');

var input = `.#.#.#
...##.
#....#
..#...
#.#..#
####..`,
  steps = 4;
var input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd(),steps=100;

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function solve(input) {
  let state = input
    .split('\n')
    .map((line) => line.split('').map((char) => +(char === '#')));
  for (let step = 0; step < steps; step++) {
    const nextState = state.map((row) => row.map(() => '.'));
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        const neighbors = dirs
          .map(([di, dj]) => state[i + di]?.[j + dj] ?? 0)
          .reduce((acc, n) => acc + n);
        nextState[i][j] = state[i][j]
          ? neighbors === 2 || neighbors === 3
          : neighbors === 3;
      }
    }
    state = nextState;
  }
  console.log(state.flat().reduce((acc, n) => acc + n));
}
solve(input);
