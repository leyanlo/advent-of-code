const fs = require('fs');

var input = `.....
.S-7.
.|.|.
.L-J.
.....`;
var input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
var input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
  startPipe = 'F';
var input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
  startPipe = 'F';
var input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
  startPipe = '7';
var input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd(),
  startPipe = 'J';
// 450 too high
// 28 wrong
// 444 too high
// 435 correct

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// function solve(input) {
//   console.log(input);
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
//   const seen = new Set([start.join()]);
//   let queue = [[...start, 0]];
//   let maxSteps = 0;
//   const countsMap = map.map((row) => row.map(() => '.'));
//   countsMap[start[0]][start[1]] = 0;
//   while (queue.length) {
//     const [i, j, steps] = queue.shift();
//     maxSteps = Math.max(maxSteps, steps);
//     for (const [di, dj] of dirs) {
//       if (seen.has([i + di, j + dj].join())) continue;
//       switch (map[i + di]?.[j + dj]) {
//         case '|':
//           if (dj) continue;
//           break;
//         case '-':
//           if (di) continue;
//           break;
//         case 'L':
//           if (di === -1 || dj === 1) continue;
//           break;
//         case 'J':
//           if (di === -1 || dj === -1) continue;
//           break;
//         case '7':
//           if (di === 1 || dj === -1) continue;
//           break;
//         case 'F':
//           if (di === 1 || dj === 1) continue;
//           break;
//         case '.':
//           continue;
//         case 'S':
//           continue;
//         default:
//           continue;
//       }
//       queue.push([i + di, j + dj, steps + 1]);
//       seen.add([i + di, j + dj].join());
//       countsMap[i + di][j + dj] = steps + 1;
//     }
//   }
//   console.log(maxSteps);
//   // console.log(countsMap.map((row) => row.join('')).join('\n'));
// }
// solve(input);
function solve(input) {
  console.log(input);
  let start;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      if (char === 'S') {
        start = [i, j];
      }
      return char;
    })
  );

  let maxPath = [start];
  let queue = [[...start, maxPath]];
  let maxSteps = 0;
  const countsMap = map.map((row) => row.map(() => '.'));
  countsMap[start[0]][start[1]] = 0;
  while (queue.length) {
    const [i, j, path] = queue.shift();
    if (path.length > maxPath.length) {
      maxSteps = path.length;
      maxPath = path;
    }
    for (const [di, dj] of dirs) {
      if (path.find(([i2, j2]) => i2 === i + di && j2 === j + dj)) continue;
      switch (map[i + di]?.[j + dj]) {
        case '|':
          if (dj) continue;
          break;
        case '-':
          if (di) continue;
          break;
        case 'L':
          if (di === -1 || dj === 1) continue;
          break;
        case 'J':
          if (di === -1 || dj === -1) continue;
          break;
        case '7':
          if (di === 1 || dj === -1) continue;
          break;
        case 'F':
          if (di === 1 || dj === 1) continue;
          break;
        case '.':
          continue;
        case 'S':
          continue;
        default:
          continue;
      }
      queue.push([i + di, j + dj, [...path, [i + di, j + dj]]]);
      countsMap[i + di][j + dj] = path.length + 1;
    }
  }
  console.log(maxSteps);
  console.log(maxPath);
  console.log(maxPath[1], maxPath.at(-1));
  console.log(map.map((row) => row.join('')).join('\n') + '\n');

  // TODO calculate based on path
  map[maxPath[0][0]][maxPath[0][1]] = startPipe;
  console.log(map.map((row) => row.join('')).join('\n'));
  console.log();

  const pathMap = map.map((row) => row.map(() => 0));
  const iMin = Math.min(...maxPath.map(([i]) => i));
  const jMin = Math.min(...maxPath.map(([, j]) => j));
  const iMax = Math.max(...maxPath.map(([i]) => i));
  const jMax = Math.max(...maxPath.map(([, j]) => j));
  for (const [i, j] of maxPath) {
    pathMap[i][j] = 1;
  }
  console.log(pathMap.map((row) => row.join('')).join('\n') + '\n');
  let nTiles = 0;
  for (let i = iMin; i <= iMax; i++) {
    let nIntersects = 0;
    let bend = null;
    for (let j = jMin; j <= jMax; j++) {
      if (pathMap[i][j]) {
        const curr = map[i][j];
        if (curr === '|') {
          nIntersects++;
        } else if (curr !== '-') {
          if (bend) {
            if (
              (bend === 'L' && curr === '7') ||
              (bend === 'F' && curr === 'J')
            ) {
              nIntersects++;
            }
            bend = null;
          } else {
            bend = curr;
          }
        }
      } else if (nIntersects % 2) {
        nTiles++;
        pathMap[i][j] = 2;
      }
    }
  }
  console.log(pathMap.map((row) => row.join('')).join('\n') + '\n');
  console.log(nTiles);
}
solve(input);
