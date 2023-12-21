import { readFileSync } from 'node:fs';

var input = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;
var input = readFileSync('./day-21-input.txt', 'utf8').trimEnd();

function safeMod(a, b) {
  return a < 0 ? (b - (-a % b)) % b : a % b;
}

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// function solve1(input) {
//   console.log(input);
//   let positions = new Set();
//   const map = input.split('\n').map((line, i) =>
//     line.split('').map((char, j) => {
//       if (char === 'S') {
//         positions.add([i, j].join());
//       }
//       return +(char !== '#');
//     })
//   );
//   console.log(map.map((row) => row.join('')).join('\n'));
//   console.log(positions);
//
//   for (let i = 0; i < 64; i++) {
//     const nextPositions = new Set();
//     for (const p of positions) {
//       const [r, c] = p.split(',').map(Number);
//       for (const [dr, dc] of dirs) {
//         if (map[r + dr]?.[c + dc]) {
//           nextPositions.add([r + dr, c + dc].join());
//         }
//       }
//     }
//     positions = nextPositions;
//     console.log(positions);
//   }
//   console.log(positions.size);
// }
// solve1(input);

// function solveSlow(input) {
//   console.log(input);
//   let positions = new Set(); // i, j, mapI, mapJ
//   const map = input.split('\n').map((line, i) =>
//     line.split('').map((char, j) => {
//       if (char === 'S') {
//         positions.add([i, j].join());
//       }
//       return +(char !== '#');
//     })
//   );
//   const width = map[0].length;
//   const height = map.length;
//   console.log(map.map((row) => row.join('')).join('\n'));
//   console.log(positions);
//
//   for (let i = 0; i < 1000; i++) {
//     const nextPositions = new Set();
//     let startCount = 0;
//     for (const p of positions) {
//       const [r, c] = p.split(',').map(Number);
//       if (r >= 0 && r < height && c >= 0 && c < width) {
//         startCount++;
//       }
//       for (const [dr, dc] of dirs) {
//         const r2 = r + dr;
//         const c2 = c + dc;
//         if (map[safeMod(r2, height)][safeMod(c2, width)]) {
//           nextPositions.add([r2, c2].join());
//         }
//       }
//     }
//
//     positions = nextPositions;
//     console.log(i, positions.size, startCount);
//   }
//   console.log(positions.size);
//
//   // console.log(
//   //   map
//   //     .map((row, r) =>
//   //       row.map((col, c) => +positions.has([r, c].join())).join('')
//   //     )
//   //     .join('\n')
//   // );
// }
// solveSlow(input);

// function solveRemovingInteriors(input) {
//   console.log(input);
//   let positions = new Set(); // i, j, mapI, mapJ
//   const map = input.split('\n').map((line, i) =>
//     line.split('').map((char, j) => {
//       if (char === 'S') {
//         positions.add([i, j].join());
//       }
//       return +(char !== '#');
//     })
//   );
//   const width = map[0].length;
//   const height = map.length;
//   console.log(map.map((row) => row.join('')).join('\n'));
//   console.log(positions);
//
//   // example cycles between 39 and 42 starting at i=13 (19 and 22 excluding interior)
//   // input cycles between 7451 and 7458 starting at i=130 (7191 and 7198 excluding interior)
//   const cyclingMaps = new Set();
//   for (let i = 0; i < 500; i++) {
//     if (i === 13) debugger;
//     const nextPositions = new Set();
//     let startCount = 0;
//     for (const p of positions) {
//       const [r, c] = p.split(',').map(Number);
//       if (r >= 0 && r < height && c >= 0 && c < width) {
//         startCount++;
//       }
//       for (const [dr, dc] of dirs) {
//         const r2 = r + dr;
//         const c2 = c + dc;
//         const safeModR = safeMod(r2, height);
//         const safeModC = safeMod(c2, width);
//         const mapR = Math.floor(r2 / height);
//         const mapC = Math.floor(c2 / width);
//         const isInterior =
//           safeModR >= 1 &&
//           safeModR < height - 1 &&
//           safeModC >= 1 &&
//           safeModC < width - 1;
//         if (
//           map[safeMod(r2, height)][safeMod(c2, width)] &&
//           !(cyclingMaps.has([mapR, mapC].join()) && isInterior)
//         ) {
//           nextPositions.add([r2, c2].join());
//         }
//       }
//     }
//     positions = nextPositions;
//
//     // remove interior positions from cycling maps
//     let deleteCount = 0;
//     for (const p of positions) {
//       const [r, c] = p.split(',').map(Number);
//       const safeModR = safeMod(r, height);
//       const safeModC = safeMod(c, width);
//       const mapR = Math.floor(r / height);
//       const mapC = Math.floor(c / width);
//       const isInterior =
//         safeModR >= 1 &&
//         safeModR < height - 1 &&
//         safeModC >= 1 &&
//         safeModC < width - 1;
//
//       if (cyclingMaps.has([mapR, mapC].join()) && isInterior) {
//         positions.delete(p);
//         deleteCount++;
//       } else if (
//         // check 4 corners
//         positions.has([r - safeModR, c - safeModC].join()) &&
//         positions.has([r - safeModR, c - safeModC + width - 1].join()) &&
//         positions.has([r - safeModR + height - 1, c - safeModC].join()) &&
//         positions.has(
//           [r - safeModR + height - 1, c - safeModC + width - 1].join()
//         )
//       ) {
//         cyclingMaps.add([mapR, mapC].join());
//         if (isInterior) {
//           positions.delete(p);
//           deleteCount++;
//         }
//       }
//     }
//
//     console.log(
//       i,
//       positions.size + cyclingMaps.size * (i % 2 ? 22 : 19),
//       startCount + +!!cyclingMaps.size * (i % 2 ? 19 : 22),
//       cyclingMaps.size,
//       deleteCount
//     );
//   }
//   console.log(positions.size);
//   console.log(cyclingMaps);
//
//   // console.log(
//   //   map
//   //     .map((row, r) =>
//   //       row.map((col, c) => +positions.has([r, c].join())).join('')
//   //     )
//   //     .join('\n')
//   // );
// }
// solveRemovingInteriors(input);

function solve(input) {
  let positions = new Set();
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        positions.add([i, j].join());
      }
      return +(char !== '#');
    })
  );
  const size = map.length;
  console.log(map.map((row) => row.join('')).join('\n'));
  console.log(positions);

  const target = 26501365;
  const counts = [];
  for (let i = 0; i < 16 * size + (target % size); i++) {
    const nextPositions = new Set();
    for (const p of positions) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        const r2 = r + dr;
        const c2 = c + dc;
        if (map[safeMod(r2, size)][safeMod(c2, size)]) {
          nextPositions.add([r2, c2].join());
        }
      }
    }

    positions = nextPositions;
    if ((i + 1) % size === target % size) {
      if (
        counts.length >= 3 &&
        positions.size - 2 * counts.at(-1) + counts.at(-2) ===
          counts.at(-1) - 2 * counts.at(-2) + counts.at(-3)
      ) {
        // converged
        break;
      }
      counts.push(positions.size);
    }
    console.log(i, positions.size, (i + 1) % size === target % size ? '<' : '');
  }
  console.log(positions.size);
  console.log(counts);
  console.log(counts.at(-1) - 2 * counts.at(-2) + counts.at(-3));

  const d2 = counts.at(-1) - 2 * counts.at(-2) + counts.at(-3);

  for (let i = counts.length * size + (target % size); i <= target; i += size) {
    counts.push(d2 + 2 * counts.at(-1) - counts.at(-2));
  }
  console.log(counts.at(-1));
}
solve(input);
