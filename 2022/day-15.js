const fs = require('fs');

var input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`,
  max = 20;
var input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd(),
  max = 4000000;
// 13106454697879 wrong
// 12111578718336 too low

function dist(x, y, x2, y2) {
  return Math.abs(x2 - x) + Math.abs(y2 - y);
}

// function solve(input) {
//   console.log(input);
//   const target = 2000000;
//   const targetLine = {};
//   for (const line of input.split('\n')) {
//     const [x, y, bx, by] = line.match(/[-\d]+/g).map(Number);
//     const d = dist(x, y, bx, by);
//     console.log(x, y, bx, by, d);
//     if (by === target) {
//       targetLine[bx] = 0;
//     }
//     let dx = 0;
//     do {
//       if (dist(x, y, x + dx, target) > d) {
//         break;
//       }
//       for (const x2 of [-1, 1].map((i) => x + dx * i)) {
//         if (targetLine[x2] !== 0 && dist(x, y, x2, target) <= d) {
//           targetLine[x2] = 1;
//         }
//       }
//       dx++;
//     } while (true);
//   }
//   console.log(Object.values(targetLine).reduce((acc, n) => acc + n));
// }
// solve(input);

// function solve(input) {
//   const targetMap = {};
//   for (const line of input.split('\n')) {
//     const [x, y, bx, by] = line.match(/[-\d]+/g).map(Number);
//     const d = dist(x, y, bx, by);
//     console.log(x, y, bx, by, d);
//     for (let target = 0; target < max; target++) {
//       targetMap[target] = targetMap[target] ?? {};
//       const targetLine = targetMap[target];
//       if (by === target) {
//         targetLine[bx] = 0;
//       }
//       let dx = 0;
//       do {
//         if (dist(x, y, x + dx, target) > d) {
//           break;
//         }
//         for (const x2 of [-1, 1].map((i) => x + dx * i)) {
//           if (
//             targetLine[x2] !== 0 &&
//             dist(x, y, x2, target) <= d &&
//             x2 >= 0 &&
//             x2 <= max
//           ) {
//             targetLine[x2] = 1;
//           }
//         }
//         dx++;
//       } while (true);
//     }
//   }
//   outer: for (const y in targetMap) {
//     if (Object.keys(targetMap[y]).length < max + 1) {
//       for (let x = 0; x < max; x++) {
//         if (!targetMap[y][x]) {
//           console.log(x * 4000000 + y);
//           break outer;
//         }
//       }
//     }
//   }
// }
// solve(input);

function intersect(A, B, C, D) {
  // Line AB represented as a1x + b1y = c1
  var a1 = B[1] - A[1];
  var b1 = A[0] - B[0];
  var c1 = a1 * A[0] + b1 * A[1];

  // Line CD represented as a2x + b2y = c2
  var a2 = D[1] - C[1];
  var b2 = C[0] - D[0];
  var c2 = a2 * C[0] + b2 * C[1];

  var determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    // The lines are parallel. This is simplified
    // by returning a pair of FLT_MAX
    return null;
  } else {
    var x = (b2 * c1 - b1 * c2) / determinant;
    var y = (a1 * c2 - a2 * c1) / determinant;
    return [x, y].map(Math.round);
  }
}

function solve(input) {
  const diamonds = [];
  const sensors = [];
  for (const line of input.split('\n')) {
    const [x, y, bx, by] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, bx, by);
    sensors.push([x, y, d]);
    diamonds.push([
      [x + (d + 1), y],
      [x, y + (d + 1)],
      [x - (d + 1), y],
      [x, y - (d + 1)],
    ]);
  }
  console.log(diamonds);

  const intersections = {};
  for (let i = 0; i < diamonds.length - 1; i++) {
    const d1 = diamonds[i];
    for (let j = i + 1; j < diamonds.length; j++) {
      const d2 = diamonds[j];
      for (let i2 = 0; i2 < 4; i2++) {
        for (let j2 = 0; j2 < 4; j2++) {
          const int = intersect(
            d1[i2],
            d1[(i2 + 1) % 4],
            d2[j2],
            d2[(j2 + 1) % 4]
          );
          if (
            int &&
            int[0] >= 0 &&
            int[0] <= max &&
            int[1] >= 0 &&
            int[1] <= max
          ) {
            intersections[int.join()] = (intersections[int.join()] ?? 0) + 1;
          }
        }
      }
    }
  }
  console.log(intersections);

  outer: for (const intersection of Object.keys(intersections)) {
    const [xi, yi] = intersection.split(',').map(Number);
    if (sensors.every(([x, y, d]) => dist(x, y, xi, yi) > d)) {
      console.log(xi, yi);
      console.log(4000000 * xi + yi);
      break outer;
    }
  }
}
solve(input);
