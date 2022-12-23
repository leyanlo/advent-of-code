const fs = require('fs');

var input = `.....
..##.
..#..
.....
..##.
.....`;
var input = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;
var input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();
// 6480 wrong
// 4132 wrong

const neighbors = [
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
  console.log(input);
  // const map = input
  //   .split('\n')
  //   .map((line) =>
  //     line
  //       .split('')
  //       .map((char) => +(char === '#'))
  //       .reduce((acc, char, j) => {
  //         acc[j] = char;
  //         return acc;
  //       }, {})
  //   )
  //   .reduce((acc, line, i) => {
  //     acc[i] = line;
  //     return acc;
  //   }, {});
  const map = input
    .split('\n')
    .map((line) => line.split('').map((char) => +(char === '#')));
  // console.log(map);
  const nElves = map.flat().filter(Boolean).length;

  let round = 0;
  while (true) {
    let proposals = [];
    for (let y in map) {
      y = +y;
      outer: for (let x in map[y]) {
        x = +x;
        if (map[y][x]) {
          if (neighbors.every(([dy, dx]) => !map[y + dy]?.[x + dx])) {
            continue;
          }
          for (let i = round; i < round + 4; i++) {
            if (
              i % 4 === 0 &&
              !map[y - 1]?.[x] &&
              !map[y - 1]?.[x - 1] &&
              !map[y - 1]?.[x + 1]
            ) {
              proposals.push([[x, y].join(), [x, y - 1].join()]);
              continue outer;
            }
            if (
              i % 4 === 1 &&
              !map[y + 1]?.[x] &&
              !map[y + 1]?.[x - 1] &&
              !map[y + 1]?.[x + 1]
            ) {
              proposals.push([[x, y].join(), [x, y + 1].join()]);
              continue outer;
            }
            if (
              i % 4 === 2 &&
              !map[y - 1]?.[x - 1] &&
              !map[y][x - 1] &&
              !map[y + 1]?.[x - 1]
            ) {
              proposals.push([[x, y].join(), [x - 1, y].join()]);
              continue outer;
            }
            if (
              i % 4 === 3 &&
              !map[y - 1]?.[x + 1] &&
              !map[y][x + 1] &&
              !map[y + 1]?.[x + 1]
            ) {
              proposals.push([[x, y].join(), [x + 1, y].join()]);
              continue outer;
            }
          }
        }
      }
    }
    // console.log(proposals);

    const counts = proposals.reduce((acc, [from, to]) => {
      acc[to] = (acc[to] ?? 0) + 1;
      return acc;
    }, {});
    // console.log(counts);

    proposals = proposals.filter(([from, to]) => counts[to] === 1);
    // console.log(proposals);

    if (!proposals.length) {
      break;
    }

    for (let [from, to] of proposals) {
      const [x1, y1] = from.split(',').map(Number);
      const [x2, y2] = to.split(',').map(Number);
      map[y1][x1] = 0;
      map[y2] = map[y2] ?? [];
      map[y2][x2] = 1;
    }
    // console.log(map);
    round++;
  }

  let yMin = 0,
    yMax = 0,
    xMin = 0,
    xMax = 0;
  for (let y in map) {
    y = +y;
    for (let x in map[y]) {
      x = +x;
      if (map[y][x]) {
        yMin = Math.min(y, yMin);
        yMax = Math.max(y, yMax);
        xMin = Math.min(x, xMin);
        xMax = Math.max(x, xMax);
      }
    }
  }
  console.log(map)
  console.log(yMin, yMax, xMin, xMax);
  console.log(nElves);
  console.log((yMax - yMin + 1) * (xMax - xMin + 1) - nElves);
  console.log(round+1);
}
solve(input);
