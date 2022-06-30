const fs = require('fs');

var input = `depth: 510
target: 10,10`;
// var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function solve(input) {
  let [depth, target] = input.split('\n');
  depth = +depth.match(/\d+/g)[0];
  const [targetX, targetY] = target.match(/\d+/g).map(Number);

  function getErosion(geoIdx) {
    return (geoIdx + depth) % 20183;
  }

  const erosions = [];
  // TODO: test higher bounds
  for (let y = 0; y <= targetY + 2; y++) {
    erosions[y] = [getErosion(y * 48271)];
  }
  // TODO: test higher bounds
  for (let x = 1; x <= targetX + 2; x++) {
    erosions[0][x] = getErosion(x * 16807);
  }
  for (let y = 1; y <= targetY; y++) {
    for (let x = 1; x <= targetX; x++) {
      erosions[y][x] = getErosion(
        x === targetX && y === targetY
          ? 0
          : erosions[y][x - 1] * erosions[y - 1][x]
      );
    }
  }

  const types = erosions.map((row) => row.map((erosion) => erosion % 3));

  console.log(
    types
      .slice(0, targetY + 1)
      .flatMap((row) => row.slice(0, targetX + 1))
      .reduce((acc, type) => acc + type)
  );
}
solve(input);
