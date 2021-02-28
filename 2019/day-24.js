const fs = require('fs');

const input = fs.readFileSync('./day-24-input.txt', 'utf8');

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function hash(state) {
  return state.flat().map(Number).join('');
}

function solve1(input) {
  let state = input
    .split('\n')
    .map((line) => line.split('').map((char) => char === '#'));
  const seen = {};
  while (!seen[hash(state)]) {
    seen[hash(state)] = true;
    const nextState = [];
    for (let i = 0; i < 5; i++) {
      nextState.push([]);
      for (let j = 0; j < 5; j++) {
        const nNeighbors = dirs.reduce((acc, [di, dj]) => {
          return acc + !!state[i + di]?.[j + dj];
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

function getEdgeCounts(level) {
  const top = level[0].reduce((acc, cell) => acc + cell, 0);
  const right = level.reduce((acc, row) => acc + row[4], 0);
  const bottom = level[4].reduce((acc, cell) => acc + cell, 0);
  const left = level.reduce((acc, row) => acc + row[0], 0);
  return {
    top,
    right,
    bottom,
    left,
  };
}

function solve2(input) {
  let state = [
    input.split('\n').map((line) => line.split('').map((char) => char === '#')),
  ];
  for (let minute = 0; minute < 200; minute++) {
    const { minLevel, maxLevel } =
      minute % 2 === 0
        ? {
            minLevel: -1,
            maxLevel: state.length + 1,
          }
        : {
            minLevel: 0,
            maxLevel: state.length,
          };
    const nextState = [];
    for (let level = minLevel; level < maxLevel; level++) {
      const rows = [];
      for (let i = 0; i < 5; i++) {
        rows.push([]);
        for (let j = 0; j < 5; j++) {
          const nNeighbors = dirs.reduce((acc, [di, dj]) => {
            if (i === 2 && j === 2) {
              return acc;
            }
            const ii = i + di;
            const jj = j + dj;
            if (ii === -1) {
              return acc + !!state[level - 1]?.[1][2];
            } else if (ii === 5) {
              return acc + !!state[level - 1]?.[3][2];
            } else if (jj === -1) {
              return acc + !!state[level - 1]?.[2][1];
            } else if (jj === 5) {
              return acc + !!state[level - 1]?.[2][3];
            } else if (ii === 2 && jj === 2) {
              if (!state[level + 1]) {
                return acc;
              } else if (i === 1 && j === 2) {
                return acc + getEdgeCounts(state[level + 1]).top;
              } else if (i === 2 && j === 3) {
                return acc + getEdgeCounts(state[level + 1]).right;
              } else if (i === 3 && j === 2) {
                return acc + getEdgeCounts(state[level + 1]).bottom;
              } else if (i === 2 && j === 1) {
                return acc + getEdgeCounts(state[level + 1]).left;
              }
            }
            return acc + !!state[level]?.[ii][jj];
          }, 0);
          if (state[level]?.[i][j]) {
            rows[i].push(nNeighbors === 1);
          } else {
            rows[i].push(nNeighbors === 1 || nNeighbors === 2);
          }
        }
      }
      nextState.push(rows);
    }
    state = nextState;
  }
  console.log(state.flat(2).reduce((acc, cell) => acc + cell, 0));
}

solve1(input);
solve2(input);
