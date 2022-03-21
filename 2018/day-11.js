const fs = require('fs');

var input = `42`;
var input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const serial = +input;
//   const grid = [];
//   for (let y = 1; y <= 300; y++) {
//     const row = [];
//     for (let x = 1; x <= 300; x++) {
//       const rackId = x + 10;
//       let power = rackId * y;
//       power += serial;
//       power *= rackId;
//       power = ~~(power / 100);
//       power %= 10;
//       power -= 5;
//       row.push(power);
//     }
//     grid.push(row);
//   }
//   let maxPower;
//   let maxCoords;
//   for (let y = 1; y <= 298; y++) {
//     for (let x = 1; x <= 298; x++) {
//       let sum = 0;
//       for (let dy = 0; dy <= 2; dy++) {
//         for (let dx = 0; dx <= 2; dx++) {
//           sum += grid[y + dy - 1][x + dx - 1];
//         }
//       }
//       if (!maxPower || sum > maxPower) {
//         maxPower = sum;
//         maxCoords = [x, y];
//       }
//     }
//   }
//   console.log(maxCoords.join());
// }
// solve(input);
function solve(input) {
  const serial = +input;
  const grid = [...Array(300)].map(() => [...Array(300)]);
  for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 300; j++) {
      const x = j + 1;
      const y = i + 1;
      const rackId = x + 10;
      let power = rackId * y;
      power += serial;
      power *= rackId;
      power = ~~(power / 100);
      power %= 10;
      power -= 5;
      grid[i][j] = power;
    }
  }

  const sums = [...Array(300)].map(() => [...Array(300)]);
  for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 300; j++) {
      sums[i][j] =
        grid[i][j] +
        (sums[i - 1]?.[j] ?? 0) +
        (sums[i][j - 1] ?? 0) -
        (sums[i - 1]?.[j - 1] ?? 0);
    }
  }

  let maxPower;
  let maxCoords;
  let maxSize;
  for (let size = 1; size <= 300; size++) {
    for (let i = size; i < 300; i++) {
      for (let j = size; j < 300; j++) {
        const x = j + 1 - size + 1;
        const y = i + 1 - size + 1;
        const sum =
          sums[i][j] -
          sums[i - size][j] -
          sums[i][j - size] +
          sums[i - size][j - size];
        if (!maxPower || sum > maxPower) {
          maxPower = sum;
          maxCoords = [x, y];
          maxSize = size;
        }
      }
    }
  }

  console.log([maxCoords, maxSize].flat().join());
}
solve(input);
