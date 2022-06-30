const fs = require('fs');

var input = `depth: 510
target: 10,10`;
var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

const modulo = 20183;

function solve(input) {
  console.log(input);
  let [depth, target] = input.split('\n');
  depth = +depth.match(/\d+/g)[0];
  const [targetX, targetY] = target.match(/\d+/g).map(Number);
  console.log(depth, target);

  function getErosion(geoIdx) {
    return (geoIdx + depth) % 20183;
  }

  const map = [];
  for (let y = 0; y <= targetY; y++) {
    const geoIdx = y * 48271;
    const erosion = getErosion(geoIdx);
    map[y] = [{ geoIdx, erosion }];
  }
  for (let x = 1; x <= targetX; x++) {
    const geoIdx = x * 16807;
    const erosion = getErosion(geoIdx);
    map[0][x] = { geoIdx, erosion };
  }
  for (let y = 1; y <= targetY; y++) {
    for (let x = 1; x <= targetX; x++) {
      let geoIdx;
      if (x === targetX && y === targetY) {
        geoIdx = 0;
      } else {
        geoIdx = map[y][x - 1].erosion * map[y - 1][x].erosion;
      }
      const erosion = getErosion(geoIdx);
      map[y][x] = { geoIdx, erosion };
    }
  }
  console.log(
    map
      .flatMap((row) => row.map(({ erosion }) => erosion % 3))
      .reduce((acc, type) => acc + type)
  );
}
solve(input);
