const fs = require('fs');

const input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd(),
  steps = 100;

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

function solve(input, part) {
  let state = input
    .split('\n')
    .map((line) => line.split('').map((char) => +(char === '#')));
  const size = state.length;
  function updateState() {
    if (part === 2) {
      state[0][0] = 1;
      state[0][size - 1] = 1;
      state[size - 1][0] = 1;
      state[size - 1][size - 1] = 1;
    }
  }
  updateState();
  for (let step = 0; step < steps; step++) {
    const nextState = state.map((row) => row.map(() => '.'));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const neighbors = dirs
          .map(([di, dj]) => state[i + di]?.[j + dj] ?? 0)
          .reduce((acc, n) => acc + n);
        nextState[i][j] = state[i][j]
          ? neighbors === 2 || neighbors === 3
          : neighbors === 3;
      }
    }
    state = nextState;
    updateState();
  }
  console.log(state.flat().reduce((acc, n) => acc + n));
}
solve(input, 1);
solve(input, 2);
