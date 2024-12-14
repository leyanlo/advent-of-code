import { readFileSync } from 'node:fs';

var input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
  w = 11,
  h = 7;
var input = readFileSync('./day-14-input.txt', 'utf8').trimEnd(),
  w = 101,
  h = 103;

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

function solve(input, w, h) {
  console.log(input);
  const robots = input
    .split('\n')
    .map((line) => line.match(/-?\d+/g).map(Number));
  console.log(robots);

  const map = Array.from({ length: h }).map(() =>
    Array.from({ length: w }).map(() => 0)
  );

  let t = 0;
  for (const [px, py] of robots) {
    map[py][px] = 1;
  }
  console.log(
    t,
    map
      .map((row) => row.map((cell) => (cell ? '◻️' : '◼️')).join(''))
      .join('\n')
  );
  for (const [px, py] of robots) {
    map[py][px] = 0;
  }

  while (true) {
    if (t > 10000) break;
    t++;

    for (const robot of robots) {
      const [px, py, vx, vy] = robot;
      robot[0] = mod(px + vx, w);
      robot[1] = mod(py + vy, h);
    }

    for (const [px, py] of robots) {
      map[py][px] = 1;
    }
    console.log(
      t,
      map
        .map((row) => row.map((cell) => (cell ? '◻️' : '◼️')).join(''))
        .join('\n')
    );
    for (const [px, py] of robots) {
      map[py][px] = 0;
    }
  }
}
solve(input, w, h);
