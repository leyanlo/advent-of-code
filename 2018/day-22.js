const fs = require('fs');

var input = `depth: 510
target: 10,10`;
var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function solve(input) {
  let [depth, target] = input.split('\n');
  depth = +depth.match(/\d+/g)[0];
  const [targetX, targetY] = target.match(/\d+/g).map(Number);

  function getCell(geoIdx) {
    const erosion = (geoIdx + depth) % 20183;
    const type = erosion % 3;
    return {
      geoIdx,
      erosion,
      type,
    };
  }

  const map = [];
  for (let y = 0; y <= targetY; y++) {
    map[y] = [getCell(y * 48271)];
  }
  for (let x = 1; x <= targetX; x++) {
    map[0][x] = getCell(x * 16807);
  }
  for (let y = 1; y <= targetY; y++) {
    for (let x = 1; x <= targetX; x++) {
      map[y][x] = getCell(
        x === targetX && y === targetY
          ? 0
          : map[y][x - 1].erosion * map[y - 1][x].erosion
      );
    }
  }
  console.log(
    map
      .slice(0, targetY + 1)
      .flatMap((row) => row.slice(0, targetX + 1).map(({ type }) => type))
      .reduce((acc, type) => acc + type)
  );
}
solve(input);
