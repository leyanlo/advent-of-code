import { readFileSync } from 'node:fs';

const input = readFileSync('./day-14-input.txt', 'utf8').trimEnd();
const w = 101;
const h = 103;

function mod(a, b) {
  return a < 0 ? b - (-a % b) : a % b;
}

// function solve(input, w, h) {
//   console.log(input);
//   const robots = input
//     .split('\n')
//     .map((line) => line.match(/-?\d+/g).map(Number));
//   console.log(robots);
//
//   // const map = Array.from({ length: h }).map(() =>
//   //   Array.from({ length: w }).map(() => [])
//   // );
//
//   for (let t = 0; t < 100; t++) {
//     for (const robot of robots) {
//       const [px, py, vx, vy] = robot;
//       robot[0] = mod(px + vx, w);
//       robot[1] = mod(py + vy, h);
//     }
//   }
//
//   const quads = [0, 0, 0, 0];
//   console.log('after', robots);
//   for (const [px, py] of robots) {
//     if (py < h / 2 - 1) {
//       if (px < w / 2 - 1) {
//         quads[0]++;
//       } else if (px > w / 2) {
//         quads[1]++;
//       }
//     } else if (py > h / 2) {
//       if (px < w / 2 - 1) {
//         quads[2]++;
//       } else if (px > w / 2) {
//         quads[3]++;
//       }
//     }
//   }
//   console.log(quads);
//   console.log(quads.reduce((acc, n) => acc * n));
// }
// solve(input, w, h);

function solve(input, w, h, part) {
  const robots = input
    .split('\n')
    .map((line) => line.match(/-?\d+/g).map(Number));

  const map = Array.from({ length: h }).map(() =>
    Array.from({ length: w }).map(() => 0)
  );

  let t = 0;
  while (true) {
    t++;
    for (const robot of robots) {
      const [px, py, vx, vy] = robot;
      robot[0] = mod(px + vx, w);
      robot[1] = mod(py + vy, h);
    }

    if (part === 1 && t === 100) {
      const counts = [
        [0, 0],
        [0, 0],
      ];
      for (const [px, py] of robots) {
        const x = px < w / 2 - 1 ? 0 : px > w / 2 ? 1 : -1;
        const y = py < h / 2 - 1 ? 0 : py > h / 2 ? 1 : -1;
        if (x !== -1 && y !== -1) {
          counts[x][y]++;
        }
      }
      console.log(counts.flat().reduce((acc, n) => acc * n));

      break;
    } else {
      for (const [px, py] of robots) {
        map[py][px] = 1;
      }
      if (map.flat().join('').includes('11111111')) {
        console.log(
          map
            .map((row) => row.map((cell) => (cell ? '⬜️' : '⬛️')).join(''))
            .join('\n')
        );
        console.log(t);

        break;
      }
      for (const [px, py] of robots) {
        map[py][px] = 0;
      }
    }
  }
}
solve(input, w, h, 1);
solve(input, w, h, 2);
