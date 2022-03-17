const fs = require('fs');

var input = `18`;
var input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function solve(input) {
  const serial = +input;
  const grid = [];
  for (let y = 1; y <= 300; y++) {
    const row = [];
    for (let x = 1; x <= 300; x++) {
      const rackId = x + 10;
      let power = rackId * y;
      power += serial;
      power *= rackId;
      power = ~~(power / 100);
      power %= 10;
      power -= 5;
      row.push(power);
    }
    grid.push(row);
  }
  let maxPower;
  let maxCoords;
  for (let y = 1; y <= 298; y++) {
    for (let x = 1; x <= 298; x++) {
      let sum = 0;
      for (let dy = 0; dy <= 2; dy++) {
        for (let dx = 0; dx <= 2; dx++) {
          sum += grid[y + dy - 1][x + dx - 1];
        }
      }
      if (!maxPower || sum > maxPower) {
        maxPower = sum;
        maxCoords = [x, y];
      }
    }
  }
  console.log(maxCoords.join());
}
solve(input);
