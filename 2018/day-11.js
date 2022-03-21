const fs = require('fs');

const input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function solve(input, part) {
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
  const sizes = part === 1 ? [3] : [...Array(300)].map((_, i) => i + 1);
  for (const size of sizes) {
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

  console.log([maxCoords, part === 1 ? [] : maxSize].flat().join());
}
solve(input, 1);
solve(input, 2);
