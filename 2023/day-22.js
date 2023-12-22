import { readFileSync } from 'node:fs';

const input = readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function fall(bricks, map) {
  const fallingBricks = new Set();
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
              // brick is supported
              continue outer;
            }
          }
        }
      }

      isFalling = true;
      fallingBricks.add(i);
      // move brick down
      bricks[i] = [
        [x1, y1, z1 - 1],
        [x2, y2, z2 - 1],
      ];
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          for (let z = z1; z <= z2; z++) {
            // update map
            map[z][y][x] = 0;
            map[z - 1][y][x] = i + 1;
          }
        }
      }
    }
  }
  return fallingBricks.size;
}

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

  // initialize map to all zeros except ground is -1
  const map = [...Array(maxZ + 1)].map((_, z) =>
    [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(+!!z - 1))
  );
  // add bricks to map as index + 1 (zeros are empty space)
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

  fall(bricks, map);

  let part1 = bricks.length;
  let part2 = 0;
  for (let i = 0; i < bricks.length; i++) {
    const bricks2 = structuredClone(bricks);
    const [[x1, y1, z1], [x2, y2, z2]] = bricks2[i];

    const map2 = structuredClone(map);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        for (let z = z1; z <= z2; z++) {
          // remove brick
          map2[z][y][x] = 0;
        }
      }
    }

    const count = fall(bricks2, map2);
    part1 -= +!!count;
    part2 += count;
  }
  console.log(part1);
  console.log(part2);
}
solve(input);
