const fs = require('fs');

var input = `target area: x=20..30, y=-10..-5`;
var input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd();
//     [22,117],

function getVxMin(xMin) {
  let x = 0;
  let vx = 0;
  while (x <= xMin) {
    vx++;
    x += vx;
  }
  return vx;
}
// console.log(getVxMin(20)); // 6
// console.log(getVxMin(235)); // 22
// console.log(getVxMin(20)); // 6, max = 30
// console.log(getVxMin(235)); // 22

function getMaxY([vx, vy], [[xMin, xMax], [yMin, yMax]]) {
  let [x, y] = [0, 0];
  let maxY = 0;
  while (y >= yMin) {
    maxY = Math.max(maxY, y);
    x += vx;
    y += vy;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      return maxY;
    }
    vx = Math.sign(vx) * (Math.abs(vx) - 1);
    vy--;
  }
  return null;
}

// function solve(input) {
//   let [, xRange, yRange] = input.match(/x=(.+), y=(.+)/);
//   const [xMin, xMax] = xRange.split('..').map(Number);
//   const [yMin, yMax] = yRange.split('..').map(Number);
//
//   console.log([
//     [xMin, xMax],
//     [yMin, yMax],
//   ]);
//
//   let [vx, vy] = [getVx(xMin), 0];
//   let maxY = getMaxY(
//     [vx, vy],
//     [
//       [xMin, xMax],
//       [yMin, yMax],
//     ]
//   );
//   while (!maxY) {
//     vy++;
//     maxY = getMaxY(
//       [vx, vy],
//       [
//         [xMin, xMax],
//         [yMin, yMax],
//       ]
//     );
//   }
//   console.log(maxY);
//   while (maxY) {
//     vy++;
//     const nextMaxY = getMaxY(
//       [vx, vy],
//       [
//         [xMin, xMax],
//         [yMin, yMax],
//       ]
//     );
//     if (nextMaxY) {
//       maxY = nextMaxY;
//     } else {
//       break;
//     }
//   }
//   console.log(vx, vy, maxY);
//   console.log(getMaxY(
//     [22,117],
//     [
//       [xMin, xMax],
//       [yMin, yMax],
//     ]
//   ))
// }
// solve(input);
function solve(input) {
  let [, xRange, yRange] = input.match(/x=(.+), y=(.+)/);
  const [xMin, xMax] = xRange.split('..').map(Number);
  const [yMin, yMax] = yRange.split('..').map(Number);

  const velocities = [];
  for (let vx = getVxMin(xMin); vx <= xMax; vx++) {
    for (let vy = yMin; vy < -yMin; vy++) {
      if (
        getMaxY(
          [vx, vy],
          [
            [xMin, xMax],
            [yMin, yMax],
          ]
        ) !== null
      ) {
        velocities.push([vx, vy]);
      }
    }
  }
  console.log(velocities.length);
  // console.log(
  //   getMaxY(
  //     [22, 117],
  //     [
  //       [xMin, xMax],
  //       [yMin, yMax],
  //     ]
  //   )
  // );
}
solve(input);

const velocities = `23,-10  25,-9   27,-5   29,-6   22,-6   21,-7   9,0     27,-7   24,-5
25,-7   26,-6   25,-5   6,8     11,-2   20,-5   29,-10  6,3     28,-7
8,0     30,-6   29,-8   20,-10  6,7     6,4     6,1     14,-4   21,-6
26,-10  7,-1    7,7     8,-1    21,-9   6,2     20,-7   30,-10  14,-3
20,-8   13,-2   7,3     28,-8   29,-9   15,-3   22,-5   26,-8   25,-8
25,-6   15,-4   9,-2    15,-2   12,-2   28,-9   12,-3   24,-6   23,-7
25,-10  7,8     11,-3   26,-7   7,1     23,-9   6,0     22,-10  27,-6
8,1     22,-8   13,-4   7,6     28,-6   11,-4   12,-4   26,-9   7,4
24,-10  23,-8   30,-8   7,0     9,-1    10,-1   26,-5   22,-9   6,5
7,5     23,-6   28,-10  10,-2   11,-1   20,-9   14,-2   29,-7   13,-3
23,-5   24,-8   27,-9   30,-7   28,-5   21,-10  7,9     6,6     21,-5
27,-10  7,2     30,-9   21,-8   22,-7   24,-9   20,-6   6,9     29,-5
8,-2    27,-8   30,-5   24,-7`
  .split(/\s+/)
  .sort()
  .join('\n');
// .map((v) => v.split(',').map(Number));
// console.log(velocities);
