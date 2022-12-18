const inputIdx = 1;

// coords are z, y, x
const dirs3 = [
  [-1, -1, -1],
  [-1, -1, 0],
  [-1, -1, 1],
  [-1, 0, -1],
  [-1, 0, 0],
  [-1, 0, 1],
  [-1, 1, -1],
  [-1, 1, 0],
  [-1, 1, 1],
  [0, -1, -1],
  [0, -1, 0],
  [0, -1, 1],
  [0, 0, -1],
  [0, 0, 1],
  [0, 1, -1],
  [0, 1, 0],
  [0, 1, 1],
  [1, -1, -1],
  [1, -1, 0],
  [1, -1, 1],
  [1, 0, -1],
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, -1],
  [1, 1, 0],
  [1, 1, 1],
];

// coords are w, z, y, x
const dirs4 = [
  [-1, -1, -1, -1],
  [-1, -1, -1, 0],
  [-1, -1, -1, 1],
  [-1, -1, 0, -1],
  [-1, -1, 0, 0],
  [-1, -1, 0, 1],
  [-1, -1, 1, -1],
  [-1, -1, 1, 0],
  [-1, -1, 1, 1],
  [-1, 0, -1, -1],
  [-1, 0, -1, 0],
  [-1, 0, -1, 1],
  [-1, 0, 0, -1],
  [-1, 0, 0, 0],
  [-1, 0, 0, 1],
  [-1, 0, 1, -1],
  [-1, 0, 1, 0],
  [-1, 0, 1, 1],
  [-1, 1, -1, -1],
  [-1, 1, -1, 0],
  [-1, 1, -1, 1],
  [-1, 1, 0, -1],
  [-1, 1, 0, 0],
  [-1, 1, 0, 1],
  [-1, 1, 1, -1],
  [-1, 1, 1, 0],
  [-1, 1, 1, 1],
  [0, -1, -1, -1],
  [0, -1, -1, 0],
  [0, -1, -1, 1],
  [0, -1, 0, -1],
  [0, -1, 0, 0],
  [0, -1, 0, 1],
  [0, -1, 1, -1],
  [0, -1, 1, 0],
  [0, -1, 1, 1],
  [0, 0, -1, -1],
  [0, 0, -1, 0],
  [0, 0, -1, 1],
  [0, 0, 0, -1],
  [0, 0, 0, 1],
  [0, 0, 1, -1],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
  [0, 1, -1, -1],
  [0, 1, -1, 0],
  [0, 1, -1, 1],
  [0, 1, 0, -1],
  [0, 1, 0, 0],
  [0, 1, 0, 1],
  [0, 1, 1, -1],
  [0, 1, 1, 0],
  [0, 1, 1, 1],
  [1, -1, -1, -1],
  [1, -1, -1, 0],
  [1, -1, -1, 1],
  [1, -1, 0, -1],
  [1, -1, 0, 0],
  [1, -1, 0, 1],
  [1, -1, 1, -1],
  [1, -1, 1, 0],
  [1, -1, 1, 1],
  [1, 0, -1, -1],
  [1, 0, -1, 0],
  [1, 0, -1, 1],
  [1, 0, 0, -1],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [1, 0, 1, -1],
  [1, 0, 1, 0],
  [1, 0, 1, 1],
  [1, 1, -1, -1],
  [1, 1, -1, 0],
  [1, 1, -1, 1],
  [1, 1, 0, -1],
  [1, 1, 0, 0],
  [1, 1, 0, 1],
  [1, 1, 1, -1],
  [1, 1, 1, 0],
  [1, 1, 1, 1],
];

function solve1(input) {
  let curr = [
    input.split('\n').map((line) => line.split('').map((char) => char === '#')),
  ];

  for (let t = 0; t < 6; t++) {
    const next = [];
    for (let z = -1; z < curr.length + 1; z++) {
      for (let y = -1; y < curr[0].length + 1; y++) {
        for (let x = -1; x < curr[0][0].length + 1; x++) {
          const count = dirs3.reduce((count, [dz, dy, dx]) => {
            return (
              count +
              !!(
                curr[z + dz] &&
                curr[z + dz][y + dy] &&
                curr[z + dz][y + dy][x + dx]
              )
            );
          }, 0);
          next[z + 1] = next[z + 1] || [];
          next[z + 1][y + 1] = next[z + 1][y + 1] || [];
          next[z + 1][y + 1][x + 1] =
            curr[z] && curr[z][y] && curr[z][y][x]
              ? count === 2 || count === 3
              : count === 3;
        }
      }
    }
    curr = next;
  }

  console.log(curr.flat(2).reduce((count, active) => count + active, 0));
}

function solve2(input) {
  let curr = [
    [
      input
        .split('\n')
        .map((line) => line.split('').map((char) => char === '#')),
    ],
  ];

  for (let t = 0; t < 6; t++) {
    const next = [];
    for (let w = -1; w < curr.length + 1; w++) {
      for (let z = -1; z < curr[0].length + 1; z++) {
        for (let y = -1; y < curr[0][0].length + 1; y++) {
          for (let x = -1; x < curr[0][0][0].length + 1; x++) {
            const count = dirs4.reduce((count, [dw, dz, dy, dx]) => {
              return (
                count +
                !!(
                  curr[w + dw] &&
                  curr[w + dw][z + dz] &&
                  curr[w + dw][z + dz][y + dy] &&
                  curr[w + dw][z + dz][y + dy][x + dx]
                )
              );
            }, 0);
            next[w + 1] = next[w + 1] || [];
            next[w + 1][z + 1] = next[w + 1][z + 1] || [];
            next[w + 1][z + 1][y + 1] = next[w + 1][z + 1][y + 1] || [];
            next[w + 1][z + 1][y + 1][x + 1] =
              curr[w] && curr[w][z] && curr[w][z][y] && curr[w][z][y][x]
                ? count === 2 || count === 3
                : count === 3;
          }
        }
      }
    }
    curr = next;
  }

  console.log(curr.flat(3).reduce((count, active) => count + active, 0));
}

let inputs = [];
inputs.push(`.#.
..#
###`);

inputs.push(`......##
####.#..
.##....#
.##.#..#
........
.#.#.###
#.##....
####.#..`);

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
