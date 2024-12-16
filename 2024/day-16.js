import { readFileSync } from 'node:fs';

var input = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;
var input=`#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`
var input = readFileSync('./day-16-input.txt', 'utf8').trimEnd();

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function mod(a, b) {
  return a < 0 ? b - (-a % b) : a % b;
}

// function solve(input) {
//   let start;
//   const map = input.split('\n').map((line, i) =>
//     line.split('').map((char, j) => {
//       if (char === 'S') {
//         start = [i, j];
//       }
//       return char;
//     })
//   );
//
//   let queue = [[...start, 0, 0]];
//   const seen = map.map((row) =>
//     row.map(() => DIRS.map(() => Number.POSITIVE_INFINITY))
//   );
//   let minScore = Number.POSITIVE_INFINITY;
//   while (queue.length !== 0) {
//     const nextQueue = [];
//     for (const [i, j, dirIdx, score] of queue) {
//       if (score >= minScore) {
//         continue;
//       }
//
//       if (map[i][j] === 'E') {
//         minScore = Math.min(minScore, score);
//       }
//
//       if (seen[i][j][dirIdx] < score) {
//         continue;
//       }
//       seen[i][j][dirIdx] = score;
//
//       for (let dirIdx2 = 0; dirIdx2 < 4; dirIdx2++) {
//         if (dirIdx2 === mod(dirIdx + 2, 4)) {
//           continue;
//         }
//
//         const [di, dj] = DIRS[dirIdx2];
//         const [i2, j2] = [i + di, j + dj];
//         if ('.E'.includes(map[i2][j2])) {
//           nextQueue.push([
//             i2,
//             j2,
//             dirIdx2,
//             score + 1 + (dirIdx2 !== dirIdx) * 1000,
//           ]);
//         }
//       }
//     }
//     queue = nextQueue.sort((a, b) => a[3] - b[3]);
//   }
//   console.log(minScore)
// }
// solve(input);

function solve(input) {
  let start;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [i, j];
      }
      return char;
    })
  );

  let queue = [[...start, 0, 0, [start]]];
  const paths = {};
  const seen = map.map((row) =>
    row.map(() => DIRS.map(() => Number.POSITIVE_INFINITY))
  );
  let minScore = Number.POSITIVE_INFINITY;
  while (queue.length !== 0) {
    const nextQueue = [];
    for (const [i, j, dirIdx, score, path] of queue) {
      if (score > minScore) {
        continue;
      }

      if (map[i][j] === 'E') {
        minScore = Math.min(minScore, score);
        if (score === minScore) {
          (paths[minScore] ??= []).push(path);
        }
      }

      if (seen[i][j][dirIdx] < score) {
        continue;
      }
      seen[i][j][dirIdx] = score;

      for (let dirIdx2 = 0; dirIdx2 < 4; dirIdx2++) {
        if (dirIdx2 === mod(dirIdx + 2, 4)) {
          continue;
        }

        const [di, dj] = DIRS[dirIdx2];
        const [i2, j2] = [i + di, j + dj];
        if ('.E'.includes(map[i2][j2])) {
          nextQueue.push([
            i2,
            j2,
            dirIdx2,
            score + 1 + (dirIdx2 !== dirIdx) * 1000,
            [...path, [i2, j2]],
          ]);
        }
      }
    }
    queue = nextQueue.sort((a, b) => a[3] - b[3]);
  }
  console.log(
    minScore,
    new Set(paths[minScore].flat().map((coords) => coords.join())).size
  );
}
solve(input);
