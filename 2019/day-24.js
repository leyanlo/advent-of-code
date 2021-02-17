const inputIdx = 1;

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function hash(state) {
  return state.flat().map(Number).join('');
}

function solve(input) {
  let state = input
    .split('\n')
    .map((line) => line.split('').map((char) => char === '#'));
  const seen = {};
  while (!seen[hash(state)]) {
    seen[hash(state)] = true;
    const nextState = [];
    for (let i = 0; i < state.length; i++) {
      nextState.push([]);
      for (let j = 0; j < state[i].length; j++) {
        const nNeighbors = dirs.reduce((acc, [di, dj]) => {
          return acc + (!!state[i + di] && !!state[i + di][j + dj]);
        }, 0);
        if (state[i][j]) {
          nextState[i].push(nNeighbors === 1);
        } else {
          nextState[i].push(nNeighbors === 1 || nNeighbors === 2);
        }
      }
    }
    state = nextState;
  }
  console.log(parseInt(state.flat().map(Number).reverse().join(''), 2));
}

const inputs = [];
inputs.push(`....#
#..#.
#..##
..#..
#....`);

inputs.push(`#.###
.....
#..#.
##.##
..#.#`);

solve(inputs[inputIdx]);
