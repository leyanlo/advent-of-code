require = require('esm')(module);
const $C = require('js-combinatorics');
const fs = require('fs');

var input = `###########
#0.1.....2#
#.#######.#
#4.......3#
###########`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input) {
  const map = input.split('\n').map((line) => line.split(''));
  const numCoords = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (/\d/.test(map[i][j])) {
        numCoords[map[i][j]] = [i, j];
      }
    }
  }

  const matrix = numCoords.map(() => numCoords.map(() => 0));
  for (let num = 0; num < numCoords.length; num++) {
    const [i0, j0] = numCoords[num];
    const seen = map.map((row) => row.map(() => false));
    seen[i0][j0] = true;
    const queue = dirs.map(([di, dj]) => ({
      coords: [i0 + di, j0 + dj],
      steps: 1,
    }));
    while (queue.length) {
      const {
        coords: [i, j],
        steps,
      } = queue.shift();
      if (!/\d|\./.test(map[i][j]) || seen[i][j]) {
        continue;
      }
      seen[i][j] = true;
      if (/\d/.test(map[i][j])) {
        matrix[num][map[i][j]] = steps;
        matrix[map[i][j]][num] = steps;
        if (matrix[num].every(Boolean)) {
          break;
        } else {
          continue;
        }
      }
      queue.push(
        ...dirs.map(([di, dj]) => ({
          coords: [i + di, j + dj],
          steps: steps + 1,
        }))
      );
    }
  }
  console.log(matrix);

  const permutations = [
    ...new $C.Permutation(
      [...Array(numCoords.length - 1).keys()].map((i) => i + 1)
    ),
  ];
  const steps = permutations.map((p) => {
    return p
      .map((num, i) => matrix[num][p[i - 1] ?? 0])
      .reduce((acc, n) => acc + n);
  });
  console.log(Math.min(...steps));

  const steps2 = permutations.map((p) => {
    return [...p, 0]
      .map((num, i) => matrix[num][p[i - 1] ?? 0])
      .reduce((acc, n) => acc + n);
  });
  console.log(Math.min(...steps2));
}
solve(input);
