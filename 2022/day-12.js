const fs = require('fs');

var input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
var input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();
//280 wrong

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

// function solve(input) {
//   console.log(input);
//   let start, end;
//   const map = input.split('\n').map((line, i) =>
//     line.split('').map((char, j) => {
//       let elevation = char.codePointAt(0) - 'a'.codePointAt(0);
//       if (char === 'S') {
//         elevation = 0;
//         start = [i, j];
//       } else if (char === 'E') {
//         elevation = 25;
//         end = [i, j];
//       }
//       return elevation;
//     })
//   );
//   console.log(map, start, end);
//
//   let queue = [{ pos: [...start], steps: 0 }];
//   const seen = [];
//   while (queue[0].pos[0] !== end[0] || queue[0].pos[1] !== end[1]) {
//     const {
//       pos: [i, j],
//       steps,
//     } = queue.shift();
//     if (seen[i]?.[j]) {
//       continue;
//     }
//     for (const [di, dj] of dirs) {
//       if (
//         map[i + di]?.[j + dj] === undefined ||
//         map[i + di][j + dj] > map[i][j] + 1 ||
//         seen[i + di]?.[j + dj]
//       ) {
//         continue;
//       }
//       queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
//     }
//     seen[i] = seen[i] ?? [];
//     seen[i][j] = 1;
//     queue.sort((a, b) => a.steps - b.steps);
//   }
//   console.log(queue[0].steps);
// }
// solve(input);
function solve(input) {
  const starts = [];
  let end;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      let elevation = char.codePointAt(0) - 'a'.codePointAt(0);
      if (char === 'S' || !elevation) {
        elevation = 0;
        starts.push([i, j]);
      } else if (char === 'E') {
        elevation = 25;
        end = [i, j];
      }
      return elevation;
    })
  );

  let queue = starts.map((start) => ({ pos: [...start], steps: 0 }));
  const seen = [];
  while (queue[0].pos[0] !== end[0] || queue[0].pos[1] !== end[1]) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();
    if (seen[i]?.[j]) {
      continue;
    }
    for (const [di, dj] of dirs) {
      if (
        map[i + di]?.[j + dj] === undefined ||
        map[i + di][j + dj] > map[i][j] + 1 ||
        seen[i + di]?.[j + dj]
      ) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
    }
    seen[i] = seen[i] ?? [];
    seen[i][j] = 1;
    queue.sort((a, b) => a.steps - b.steps);
  }
  console.log(queue[0].steps);
}
solve(input);
