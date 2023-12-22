import { readFileSync } from 'node:fs';

var input = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;
var input = readFileSync('./day-22-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   // console.log(input);
//   const bricks = [];
//   let maxX = 0;
//   let maxY = 0;
//   let maxZ = 0;
//   for (const line of input.split('\n')) {
//     const [[x1, y1, z1], [x2, y2, z2]] = line
//       .split('~')
//       .map((coord) => coord.split(',').map(Number));
//     maxX = Math.max(maxX, x2);
//     maxY = Math.max(maxY, y2);
//     maxZ = Math.max(maxZ, z2);
//     bricks.push([
//       [x1, y1, z1],
//       [x2, y2, z2],
//     ]);
//   }
//   console.log(bricks);
//
//   const map = [...Array(maxZ + 1)].map((_, z) =>
//     [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(z ? 0 : -1))
//   );
//   console.log(map);
//   for (let i = 0; i < bricks.length; i++) {
//     const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
//     for (let x = x1; x <= x2; x++) {
//       for (let y = y1; y <= y2; y++) {
//         for (let z = z1; z <= z2; z++) {
//           map[z][y][x] = i + 1;
//         }
//       }
//     }
//   }
//   console.log(map);
//
//   let isFalling = true;
//   while (isFalling) {
//     isFalling = false;
//     outer: for (let i = 0; i < bricks.length; i++) {
//       const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
//       for (let x = x1; x <= x2; x++) {
//         for (let y = y1; y <= y2; y++) {
//           for (let z = z1; z <= z2; z++) {
//             const below = map[z - 1][y][x];
//             if (below && below !== i + 1) {
//               continue outer;
//             }
//           }
//         }
//       }
//
//       isFalling = true;
//       for (let x = x1; x <= x2; x++) {
//         for (let y = y1; y <= y2; y++) {
//           for (let z = z1; z <= z2; z++) {
//             map[z][y][x] = 0;
//             map[z - 1][y][x] = i + 1;
//           }
//         }
//       }
//       bricks[i] = [
//         [x1, y1, z1 - 1],
//         [x2, y2, z2 - 1],
//       ];
//     }
//   }
//   console.log(map);
//
//   let count = bricks.length;
//   for (let i = 0; i < bricks.length; i++) {
//     const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
//     const map2 = structuredClone(map);
//     for (let x = x1; x <= x2; x++) {
//       for (let y = y1; y <= y2; y++) {
//         for (let z = z1; z <= z2; z++) {
//           map2[z][y][x] = 0;
//         }
//       }
//     }
//
//     outer: for (let j = 0; j < bricks.length; j++) {
//       if (j === i) continue;
//
//       const [[x1, y1, z1], [x2, y2, z2]] = bricks[j];
//       for (let x = x1; x <= x2; x++) {
//         for (let y = y1; y <= y2; y++) {
//           for (let z = z1; z <= z2; z++) {
//             const below = map2[z - 1][y][x];
//             if (below && below !== j + 1) {
//               continue outer;
//             }
//           }
//         }
//       }
//
//       console.log('brick', i + 1, 'cannot be removed');
//       count--;
//       break;
//     }
//   }
//   console.log(count);
// }
// solve(input);
function solve(input) {
  // console.log(input);
  const bricks = [];
  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;
  for (const line of input.split('\n')) {
    const [[x1, y1, z1], [x2, y2, z2]] = line
      .split('~')
      .map((coord) => coord.split(',').map(Number));
    maxX = Math.max(maxX, x2);
    maxY = Math.max(maxY, y2);
    maxZ = Math.max(maxZ, z2);
    bricks.push([
      [x1, y1, z1],
      [x2, y2, z2],
    ]);
  }
  console.log(bricks);

  const map = [...Array(maxZ + 1)].map((_, z) =>
    [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(z ? 0 : -1))
  );
  console.log(map);
  for (let i = 0; i < bricks.length; i++) {
    const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          map[z][y][x] = i + 1;
        }
      }
    }
  }
  console.log(map);

  let isFalling = true;
  while (isFalling) {
    isFalling = false;
    outer: for (let i = 0; i < bricks.length; i++) {
      const [[x1, y1, z1], [x2, y2, z2]] = bricks[i];
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          for (let z = z1; z <= z2; z++) {
            const below = map[z - 1][y][x];
            if (below && below !== i + 1) {
              continue outer;
            }
          }
        }
      }

      isFalling = true;
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          for (let z = z1; z <= z2; z++) {
            map[z][y][x] = 0;
            map[z - 1][y][x] = i + 1;
          }
        }
      }
      bricks[i] = [
        [x1, y1, z1 - 1],
        [x2, y2, z2 - 1],
      ];
    }
  }
  console.log(map);

  let count = 0;
  for (let i = 0; i < bricks.length; i++) {
    const bricks2 = structuredClone(bricks);
    const [[x1, y1, z1], [x2, y2, z2]] = bricks2[i];

    const map2 = structuredClone(map);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          map2[z][y][x] = 0;
        }
      }
    }

    let isFalling = true;
    const fallingBricks = new Set();
    while (isFalling) {
      isFalling = false;
      outer: for (let j = 0; j < bricks2.length; j++) {
        if (j === i) continue;

        const [[x1, y1, z1], [x2, y2, z2]] = bricks2[j];
        for (let x = x1; x <= x2; x++) {
          for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
              const below = map2[z - 1][y][x];
              if (below && below !== j + 1) {
                continue outer;
              }
            }
          }
        }

        isFalling = true;
        fallingBricks.add(j);
        for (let x = x1; x <= x2; x++) {
          for (let y = y1; y <= y2; y++) {
            for (let z = z1; z <= z2; z++) {
              map2[z][y][x] = 0;
              map2[z - 1][y][x] = j + 1;
            }
          }
        }
        bricks2[j] = [
          [x1, y1, z1 - 1],
          [x2, y2, z2 - 1],
        ];
      }
    }
    count += fallingBricks.size;
  }
  console.log(count);
}
solve(input);
