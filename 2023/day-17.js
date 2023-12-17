import { readFileSync } from 'node:fs';

var input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;
var input = `111111111111
999999999991
999999999991
999999999991
999999999991`;
var input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

const DIRS = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

// function solve(input) {
//   console.log(input);
//   const map = input.split('\n').map((line) => line.split('').map(Number));
//
//   const queue = [
//     [1, 0, 0, ['D']],
//     [0, 1, 0, ['R']],
//   ];
//   const seen = map.map((row) => row.map(() => ({})));
//   while (queue.length) {
//     const [i, j, heat, dirs] = queue.shift();
//     const d = dirs.at(-1);
//     const key = d + (dirs.at(-2) !== d ? 1 : dirs.at(-3) !== d ? 2 : 3);
//     if (!map[i]?.[j] || (seen[i][j][key] && heat > seen[i][j][key])) {
//       continue;
//     }
//     // console.log(heat, i, j);
//
//     seen[i][j][key] = heat;
//
//     if (i === map.length - 1 && j === map[0].length - 1) {
//       console.log(heat + map[i][j], dirs.join(''));
//       break;
//     }
//
//     const nextDirs = [];
//     switch (d) {
//       case 'U':
//       case 'D':
//         nextDirs.push('L');
//         nextDirs.push('R');
//         break;
//       case 'L':
//       case 'R':
//         nextDirs.push('U');
//         nextDirs.push('D');
//     }
//     if (dirs.at(-2) !== d || dirs.at(-3) !== d) {
//       nextDirs.push(d);
//     }
//     for (const dir of nextDirs) {
//       const [di, dj] = DIRS[dir];
//       queue.push([i + di, j + dj, heat + map[i][j], dirs.concat(dir)]);
//     }
//     queue.sort((a, b) => a[2] - b[2] || b[0] + b[1] - a[0] - a[1]);
//   }
// }
// console.time();
// solve(input);
// console.timeEnd();

function solve(input) {
  console.log(input);
  const map = input.split('\n').map((line) => line.split('').map(Number));

  const queue = [
    [1, 0, 0, ['D'], 1],
    [0, 1, 0, ['R'], 1],
  ];
  const seen = map.map((row) => row.map(() => ({})));
  while (queue.length) {
    const [i, j, heat, dirs, momentum] = queue.shift();
    const d = dirs.at(-1);
    const key = d + momentum;
    if (!map[i]?.[j] || seen[i][j][key]) {
      continue;
    }
    console.log(heat, i, j);

    seen[i][j][key] = 1;

    if (i === map.length - 1 && j === map[0].length - 1 && momentum >= 4) {
      console.log(heat + map[i][j], dirs.join(''));
      break;
    }

    const nextDirs = [];
    switch (momentum >= 4 && d) {
      case 'U':
      case 'D':
        nextDirs.push('L');
        nextDirs.push('R');
        break;
      case 'L':
      case 'R':
        nextDirs.push('U');
        nextDirs.push('D');
    }
    if (momentum < 10) {
      nextDirs.push(d);
    }
    for (const dir of nextDirs) {
      const [di, dj] = DIRS[dir];
      queue.push([
        i + di,
        j + dj,
        heat + map[i][j],
        dirs.concat(dir),
        1 + +(dir === d) * momentum,
      ]);
    }
    queue.sort((a, b) => a[2] - b[2] || b[0] + b[1] - a[0] - a[1]);
  }
}
console.time();
solve(input);
console.timeEnd();
