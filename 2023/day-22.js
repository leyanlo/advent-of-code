import { readFileSync } from 'node:fs';

const input = readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function solve(input) {
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

  const map = [...Array(maxZ + 1)].map((_, z) =>
    [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(+!!z - 1))
  );
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

  let part1 = bricks.length;
  let part2 = 0;
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
    part2 += fallingBricks.size;
    part1 -= +!!fallingBricks.size;
  }
  console.log(part1);
  console.log(part2);
}
solve(input);
