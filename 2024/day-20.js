import { readFileSync } from 'node:fs';

var input = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
  minCheat = 50;
var input = readFileSync('./day-20-input.txt', 'utf8').trimEnd(),
  minCheat = 100;
// 1243052 wrong

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// function solve(input) {
//   let start, end;
//   const map = input.split('\n').map((line, i) =>
//     line.split('').map((char, j) => {
//       if (char === 'S') {
//         start = [i, j];
//       } else if (char === 'E') {
//         end = [i, j];
//       }
//       return char === '#' ? 0 : 1;
//     })
//   );
//
//   const maxTime = map.flat().filter(Boolean).length - 1;
//
//   let curr = start;
//   let t = maxTime;
//   const times = map.map((row) => row.map(() => Number.MAX_SAFE_INTEGER));
//   while (t >= 0) {
//     const [i, j] = curr;
//     times[i][j] = t;
//     t--;
//     for (const [di, dj] of DIRS) {
//       const i2 = i + di;
//       const j2 = j + dj;
//       if (map[i2][j2] && times[i2][j2] === Number.MAX_SAFE_INTEGER) {
//         curr = [i + di, j + dj];
//         break;
//       }
//     }
//   }
//
//   const cheats = {};
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[i].length; j++) {
//       if (map[i][j] === 0) {
//         continue;
//       }
//
//       const t = times[i][j];
//       for (const [di, dj] of DIRS) {
//         const [i2, j2] = [i + 2 * di, j + 2 * dj];
//         const t2 = times[i2]?.[j2];
//         if (t2 !== undefined && t2 < t - 2) {
//           cheats[t - t2 - 2] = (cheats[t - t2 - 2] ?? 0) + 1;
//         }
//       }
//     }
//   }
//   console.log(Object.entries(cheats)
//     .filter(([t]) => t >= 100)
//     .map(([, c]) => c)
//     .reduce((acc, c) => acc + c))
// }
// solve(input);

function solve(input) {
  let start, end;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [i, j];
      } else if (char === 'E') {
        end = [i, j];
      }
      return char === '#' ? 0 : 1;
    })
  );

  const maxTime = map.flat().filter(Boolean).length - 1;

  let curr = start;
  let t = maxTime;
  const times = map.map((row) => row.map(() => Number.MAX_SAFE_INTEGER));
  while (t >= 0) {
    const [i, j] = curr;
    times[i][j] = t;
    t--;
    for (const [di, dj] of DIRS) {
      const i2 = i + di;
      const j2 = j + dj;
      if (map[i2][j2] && times[i2][j2] === Number.MAX_SAFE_INTEGER) {
        curr = [i + di, j + dj];
        break;
      }
    }
  }

  const cheats = {};
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        continue;
      }

      const t = times[i][j];
      for (let i2 = i - 20; i2 <= i + 20; i2++) {
        const di = Math.abs(i2 - i);
        for (let j2 = j - (20 - di); j2 <= j + (20 - di); j2++) {
          const dj = Math.abs(j2 - j);
          const dist = di + dj;
          const t2 = times[i2]?.[j2] ?? Number.MAX_SAFE_INTEGER;
          if (t2 < t - dist) {
            const tSaved = t - t2 - dist;
            cheats[tSaved] = (cheats[tSaved] ?? 0) + 1;
          }
        }
      }
    }
  }
  console.log(cheats);
  console.log(
    Object.entries(cheats)
      .filter(([t]) => t >= minCheat)
      .map(([, c]) => c)
      .reduce((acc, c) => acc + c)
  );
}
solve(input);
