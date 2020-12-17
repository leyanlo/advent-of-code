const inputIdx = 1;

// coords are z, y, x
const dirs = [
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

// coords are w,z,y,x
const dirs2 = [
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
  let prev = input.reduce(
    (prev, line, i) => {
      prev[0][i + (-line.length + 1) / 2] = line.split('').reduce((y, x, j) => {
        y[j + (-line.length + 1) / 2] = x;
        return y;
      }, {});
      return prev;
    },
    { 0: {} }
  );
  for (let t = 0; t < 6; t++) {
    const next = {};
    const zSize = Object.keys(prev).length + 2;
    for (let z = (-zSize + 1) / 2; z < (zSize + 1) / 2; z++) {
      const ySize = Object.keys(prev[0]).length + 2;
      for (let y = (-ySize + 1) / 2; y < (ySize + 1) / 2; y++) {
        const xSize = Object.keys(prev[0][0]).length + 2;
        for (let x = (-xSize + 1) / 2; x < (xSize + 1) / 2; x++) {
          let count = 0;
          for (let [dz, dy, dx] of dirs) {
            count +=
              (prev[z + dz] &&
                prev[z + dz][y + dy] &&
                prev[z + dz][y + dy][x + dx]) === '#'
                ? 1
                : 0;
          }
          next[z] = next[z] || {};
          next[z][y] = next[z][y] || {};
          next[z][y][x] = count;
          if ((prev[z] && prev[z][y] && prev[z][y][x]) === '#') {
            if (count === 2 || count === 3) {
              next[z][y][x] = '#';
            } else {
              next[z][y][x] = '.';
            }
          } else {
            if (count === 3) {
              next[z][y][x] = '#';
            } else {
              next[z][y][x] = '.';
            }
          }
        }
      }
    }
    prev = next;
  }

  for (let z of Object.keys(prev).sort((a, b) => +a - +b)) {
    console.log(`z=${z}`);
    Object.keys(prev[z])
      .sort((a, b) => +a - +b)
      .forEach((y) => {
        console.log(
          Object.keys(prev[z][y])
            .sort((a, b) => +a - +b)
            .map((x) => prev[z][y][x])
            .join('')
        );
      });
    console.log();
  }

  const sum = Object.keys(prev).reduce((sumZ, z) => {
    return (
      sumZ +
      Object.keys(prev[z]).reduce((sumY, y) => {
        return (
          sumY +
          Object.keys(prev[z][y]).reduce((sumX, x) => {
            return sumX + (prev[z][y][x] === '#');
          }, 0)
        );
      }, 0)
    );
  }, 0);
  console.log(sum);
}

function solve2(input) {
  let prev = input.reduce(
    (prev, line, i) => {
      prev[0][0][i + (-line.length + 1) / 2] = line
        .split('')
        .reduce((y, x, j) => {
          y[j + (-line.length + 1) / 2] = x;
          return y;
        }, {});
      return prev;
    },
    { 0: { 0: {} } }
  );
  for (let t = 0; t < 6; t++) {
    const next = {};
    const wSize = Object.keys(prev).length + 2;
    for (let w = (-wSize + 1) / 2; w < (wSize + 1) / 2; w++) {
      const zSize = Object.keys(prev[0]).length + 2;
      for (let z = (-zSize + 1) / 2; z < (zSize + 1) / 2; z++) {
        const ySize = Object.keys(prev[0][0]).length + 2;
        for (let y = (-ySize + 1) / 2; y < (ySize + 1) / 2; y++) {
          const xSize = Object.keys(prev[0][0][0]).length + 2;
          for (let x = (-xSize + 1) / 2; x < (xSize + 1) / 2; x++) {
            let count = 0;
            for (let [dw, dz, dy, dx] of dirs2) {
              count +=
                (prev[w + dw] &&
                  prev[w + dw][z + dz] &&
                  prev[w + dw][z + dz][y + dy] &&
                  prev[w + dw][z + dz][y + dy][x + dx]) === '#'
                  ? 1
                  : 0;
            }
            next[w] = next[w] || {};
            next[w][z] = next[w][z] || {};
            next[w][z][y] = next[w][z][y] || {};
            next[w][z][y][x] = count;
            if (
              (prev[w] && prev[w][z] && prev[w][z][y] && prev[w][z][y][x]) ===
              '#'
            ) {
              if (count === 2 || count === 3) {
                next[w][z][y][x] = '#';
              } else {
                next[w][z][y][x] = '.';
              }
            } else {
              if (count === 3) {
                next[w][z][y][x] = '#';
              } else {
                next[w][z][y][x] = '.';
              }
            }
          }
        }
      }
    }
    prev = next;
  }

  for (let w of Object.keys(prev).sort((a, b) => +a - +b)) {
    for (let z of Object.keys(prev[w]).sort((a, b) => +a - +b)) {
      console.log(`z=${z}, w=${w}`);
      Object.keys(prev[w][z])
        .sort((a, b) => +a - +b)
        .forEach((y) => {
          console.log(
            Object.keys(prev[w][z][y])
              .sort((a, b) => +a - +b)
              .map((x) => prev[w][z][y][x])
              .join('')
          );
        });
      console.log();
    }
  }

  const sum = Object.keys(prev).reduce((sumW, w) => {
    return (
      sumW +
      Object.keys(prev[w]).reduce((sumZ, z) => {
        return (
          sumZ +
          Object.keys(prev[w][z]).reduce((sumY, y) => {
            return (
              sumY +
              Object.keys(prev[w][z][y]).reduce((sumX, x) => {
                return sumX + (prev[w][z][y][x] === '#');
              }, 0)
            );
          }, 0)
        );
      }, 0)
    );
  }, 0);
  console.log(sum);
}

let inputs = [];
inputs.push(`.#.
..#
###`);

inputs.push(`......##.
####.#...
.##....#.
.##.#..#.
.........
.#.#.###.
#.##.....
####.#...
.........`);

inputs = inputs.map((s) => s.split('\n'));

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
