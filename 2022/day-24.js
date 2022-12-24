const fs = require('fs');

var input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();
// 100 rows, 35 cols
// 143 wrong

const dirs = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
  [0, 0],
];

function gcd(...nums) {
  function _gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }
  return nums.reduce((acc, n) => _gcd(acc, n));
}

function lcm(...nums) {
  return nums.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

function mod(a, b) {
  while (a < 0) {
    a += b;
  }
  return a % b;
}

// function solve(input) {
//   console.log(input);
//   const map = input.split('\n').map((line) => line.split(''));
//
//   const height = map.length - 2;
//   const width = map[0].length - 2;
//   const nMaps = lcm(height, width);
//   const maps = [...Array(nMaps)].map(() =>
//     map.map((line) => line.map((char) => (char === '#' ? 1 : 0)))
//   );
//
//   for (let y = 0; y < map.length; y++) {
//     for (let x = 0; x < map[y].length; x++) {
//       switch (map[y][x]) {
//         case '^':
//           for (let i = 0; i < nMaps; i++) {
//             maps[i][mod(y - 1 - i, height) + 1][x] = 1;
//           }
//           break;
//         case '>':
//           for (let i = 0; i < nMaps; i++) {
//             maps[i][y][mod(x - 1 + i, width) + 1] = 1;
//           }
//           break;
//         case 'v':
//           for (let i = 0; i < nMaps; i++) {
//             maps[i][mod(y - 1 + i, height) + 1][x] = 1;
//           }
//           break;
//         case '<':
//           for (let i = 0; i < nMaps; i++) {
//             maps[i][y][mod(x - 1 - i, width) + 1] = 1;
//           }
//           break;
//       }
//     }
//   }
//
//   for (let i = 0; i < maps.length; i++) {
//     console.log(i);
//     console.log(
//       maps[i]
//         .map((line) => line.map((char) => (char ? '#' : ' ')).join(''))
//         .join('\n')
//     );
//   }
//
//   const [yStart, xStart] = [0, map[0].indexOf('.')];
//   const [yEnd, xEnd] = [map.length - 1, map[map.length - 1].indexOf('.')];
//   const queue = [[yStart, xStart, 0, [[yStart, xStart]]]];
//   const seen = {};
//   while (queue.length) {
//     const [y, x, t, path] = queue.shift();
//     if (seen[[y, x, t % nMaps].join()]) {
//       continue;
//     }
//     seen[[y, x, t % nMaps].join()] = 1;
//
//     if (y === yEnd && x === xEnd) {
//       console.log(t, path);
//       break;
//     }
//
//     for (const [dy, dx] of dirs) {
//       if (maps[(t + 1) % nMaps][y + dy]?.[x + dx] === 0) {
//         queue.push([y + dy, x + dx, t + 1, [...path, [y + dy, x + dx]]]);
//       }
//     }
//   }
// }
// solve(input);
function solve(input) {
  const map = input.split('\n').map((line) => line.split(''));

  const height = map.length - 2;
  const width = map[0].length - 2;
  const nMaps = lcm(height, width);
  const maps = [...Array(nMaps)].map(() =>
    map.map((line) => line.map((char) => (char === '#' ? 1 : 0)))
  );

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      switch (map[y][x]) {
        case '^':
          for (let i = 0; i < nMaps; i++) {
            maps[i][mod(y - 1 - i, height) + 1][x] = 1;
          }
          break;
        case '>':
          for (let i = 0; i < nMaps; i++) {
            maps[i][y][mod(x - 1 + i, width) + 1] = 1;
          }
          break;
        case 'v':
          for (let i = 0; i < nMaps; i++) {
            maps[i][mod(y - 1 + i, height) + 1][x] = 1;
          }
          break;
        case '<':
          for (let i = 0; i < nMaps; i++) {
            maps[i][y][mod(x - 1 - i, width) + 1] = 1;
          }
          break;
      }
    }
  }

  let tStart = 0;
  let [yStart, xStart] = [0, map[0].indexOf('.')];
  let [yEnd, xEnd] = [map.length - 1, map[map.length - 1].indexOf('.')];
  let queue = [[yStart, xStart, tStart]];
  let seen = {};
  while (queue.length) {
    const [y, x, t] = queue.shift();
    if (seen[[y, x, t % nMaps].join()]) {
      continue;
    }
    seen[[y, x, t % nMaps].join()] = 1;

    if (y === yEnd && x === xEnd) {
      console.log(t);
      tStart = t;
      break;
    }

    for (const [dy, dx] of dirs) {
      if (maps[(t + 1) % nMaps][y + dy]?.[x + dx] === 0) {
        queue.push([y + dy, x + dx, t + 1]);
      }
    }
  }

  queue = [[yEnd, xEnd, tStart]];
  seen = {};
  while (queue.length) {
    const [y, x, t] = queue.shift();
    if (seen[[y, x, t % nMaps].join()]) {
      continue;
    }
    seen[[y, x, t % nMaps].join()] = 1;

    if (y === yStart && x === xStart) {
      console.log(t);
      tStart = t;
      break;
    }

    for (const [dy, dx] of dirs) {
      if (maps[(t + 1) % nMaps][y + dy]?.[x + dx] === 0) {
        queue.push([y + dy, x + dx, t + 1]);
      }
    }
  }

  queue = [[yStart, xStart, tStart]];
  seen = {};
  while (queue.length) {
    const [y, x, t] = queue.shift();
    if (seen[[y, x, t % nMaps].join()]) {
      continue;
    }
    seen[[y, x, t % nMaps].join()] = 1;

    if (y === yEnd && x === xEnd) {
      console.log(t);
      tStart = t;
      break;
    }

    for (const [dy, dx] of dirs) {
      if (maps[(t + 1) % nMaps][y + dy]?.[x + dx] === 0) {
        queue.push([y + dy, x + dx, t + 1]);
      }
    }
  }
}
solve(input);
