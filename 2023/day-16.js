import { readFileSync } from 'node:fs';

var input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;
var input = readFileSync('./day-16-input.txt', 'utf8').trimEnd();
// 6048 wrong

// function solve(input) {
//   console.log(input);
//   const map = input.split('\n').map((line) => line.split(''));
//   const beam = map.map((row) => row.map(() => []));
//
//   let queue = [[0, 0, 0, 1]];
//   while (queue.length) {
//     let [i, j, di, dj] = queue.shift();
//     switch (!beam[i]?.[j]?.includes([di, dj].join()) && map[i]?.[j]) {
//       case '.':
//         queue.push([i + di, j + dj, di, dj]);
//         beam[i][j].push([di, dj].join());
//         break;
//       case '#':
//         break;
//       case '\\':
//         beam[i][j].push([di, dj].join());
//         if (di === 1) {
//           di = 0;
//           dj = 1;
//         } else if (di === -1) {
//           di = 0;
//           dj = -1;
//         } else if (dj === 1) {
//           di = 1;
//           dj = 0;
//         } else {
//           di = -1;
//           dj = 0;
//         }
//         queue.push([i + di, j + dj, di, dj]);
//         break;
//       case '/':
//         beam[i][j].push([di, dj].join());
//         if (di === 1) {
//           di = 0;
//           dj = -1;
//         } else if (di === -1) {
//           di = 0;
//           dj = 1;
//         } else if (dj === 1) {
//           di = -1;
//           dj = 0;
//         } else {
//           di = 1;
//           dj = 0;
//         }
//         queue.push([i + di, j + dj, di, dj]);
//         break;
//       case '|':
//         beam[i][j].push([di, dj].join());
//         if (dj) {
//           queue.push([i + 1, j, 1, 0]);
//           queue.push([i - 1, j, -1, 0]);
//         } else {
//           queue.push([i + di, j + dj, di, dj]);
//         }
//         break;
//       case '-':
//         beam[i][j].push([di, dj].join());
//         if (di) {
//           queue.push([i, j + 1, 0, 1]);
//           queue.push([i, j - 1, 0, -1]);
//         } else {
//           queue.push([i + di, j + dj, di, dj]);
//         }
//         break;
//     }
//   }
//   console.log(
//     beam.map((row) => row.map((b) => +!!b.length).join('')).join('\n')
//   );
//   console.log(
//     beam
//       .map((row) => row.map((b) => +!!b.length))
//       .flat()
//       .reduce((acc, n) => acc + n)
//   );
// }
// solve(input);
function solve(input) {
  console.log(input);
  const map = input.split('\n').map((line) => line.split(''));

  const queues = [];
  for (let i = 0; i < map.length; i++) {
    queues.push([[i, 0, 0, 1]]);
    queues.push([[i, map[0].length - 1, 0, -1]]);
  }
  for (let j = 0; j < map[0].length; j++) {
    queues.push([[0, j, 1, 0]]);
    queues.push([[map.length - 1, j, -1, -0]]);
  }

  let max = 0;
  for (const queue of queues) {
    const beam = map.map((row) => row.map(() => []));
    while (queue.length) {
      let [i, j, di, dj] = queue.shift();
      switch (!beam[i]?.[j]?.includes([di, dj].join()) && map[i]?.[j]) {
        case '.':
          queue.push([i + di, j + dj, di, dj]);
          beam[i][j].push([di, dj].join());
          break;
        case '#':
          break;
        case '\\':
          beam[i][j].push([di, dj].join());
          if (di === 1) {
            di = 0;
            dj = 1;
          } else if (di === -1) {
            di = 0;
            dj = -1;
          } else if (dj === 1) {
            di = 1;
            dj = 0;
          } else {
            di = -1;
            dj = 0;
          }
          queue.push([i + di, j + dj, di, dj]);
          break;
        case '/':
          beam[i][j].push([di, dj].join());
          if (di === 1) {
            di = 0;
            dj = -1;
          } else if (di === -1) {
            di = 0;
            dj = 1;
          } else if (dj === 1) {
            di = -1;
            dj = 0;
          } else {
            di = 1;
            dj = 0;
          }
          queue.push([i + di, j + dj, di, dj]);
          break;
        case '|':
          beam[i][j].push([di, dj].join());
          if (dj) {
            queue.push([i + 1, j, 1, 0]);
            queue.push([i - 1, j, -1, 0]);
          } else {
            queue.push([i + di, j + dj, di, dj]);
          }
          break;
        case '-':
          beam[i][j].push([di, dj].join());
          if (di) {
            queue.push([i, j + 1, 0, 1]);
            queue.push([i, j - 1, 0, -1]);
          } else {
            queue.push([i + di, j + dj, di, dj]);
          }
          break;
      }
    }
    // console.log(
    //   beam.map((row) => row.map((b) => +!!b.length).join('')).join('\n')
    // );
    console.log(
      beam
        .map((row) => row.map((b) => +!!b.length))
        .flat()
        .reduce((acc, n) => acc + n)
    );
    max = Math.max(
      max,
      beam
        .map((row) => row.map((b) => +!!b.length))
        .flat()
        .reduce((acc, n) => acc + n)
    );
  }
  console.log('max', max);
}
solve(input);
