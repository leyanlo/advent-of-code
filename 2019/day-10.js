function getStationInfo(input) {
  const coords = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '#') {
        coords.push([x, y].join());
      }
    }
  }

  const coordVecMap = {};
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const [x1, y1] = coords[i].split(',');
      const [x2, y2] = coords[j].split(',');
      const dx = x2 - x1;
      const dy = y2 - y1;
      let slope = -dy / dx;

      // Infinities are flipped in this paradigm
      if (slope === Infinity) {
        slope = -Infinity;
      } else if (slope === -Infinity) {
        slope = Infinity;
      }
      const dir = dx > 0;

      coordVecMap[coords[i]] = coordVecMap[coords[i]] || {};
      coordVecMap[coords[j]] = coordVecMap[coords[j]] || {};

      const v1 = [slope, dir].join();
      const v2 = [slope, !dir].join();

      coordVecMap[coords[i]][v1] = coordVecMap[coords[i]][v1] || [];
      coordVecMap[coords[i]][v1].push(coords[j]);
      coordVecMap[coords[j]][v2] = coordVecMap[coords[j]][v2] || [];
      coordVecMap[coords[j]][v2].push(coords[i]);
    }
  }

  let stationCoord = coords[0];
  let stationAsteroidCount = 0;
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const asteroidCount = Object.keys(coordVecMap[coord]).length;
    if (asteroidCount > stationAsteroidCount) {
      stationCoord = coord;
      stationAsteroidCount = asteroidCount;
    }
  }
  return {
    vecMap: coordVecMap[stationCoord],
    stationCoord,
    asteroidCount: stationAsteroidCount,
  };
}

function solve1(input) {
  const { asteroidCount } = getStationInfo(input);
  console.log(asteroidCount);
}

function dist(coord1, coord2) {
  const [row1, col1] = coord1.split(',').map(Number);
  const [row2, col2] = coord2.split(',').map(Number);
  return Math.sqrt((row2 - row1) ** 2 + (col2 - col1) ** 2);
}

function solve2(input) {
  const { vecMap, stationCoord } = getStationInfo(input);

  const vecs = Object.keys(vecMap);
  vecs.forEach((vec) => {
    const coords = vecMap[vec];
    coords.sort((coordA, coordB) => {
      return dist(coordA, stationCoord) - dist(coordB, stationCoord);
    });
  });

  vecs.sort((vecA, vecB) => {
    let [slopeA, dirA] = vecA.split(',');
    slopeA = +slopeA;
    dirA = dirA === 'true';
    let [slopeB, dirB] = vecB.split(',');
    slopeB = +slopeB;
    dirB = dirB === 'true';

    if (dirA === dirB) {
      return slopeA > slopeB ? -1 : 1;
    } else {
      return dirA ? -1 : 1;
    }
  });

  let i = 0;
  let destroyI = 0;
  let destroyCoords;
  while (destroyI < 200) {
    const vec = vecs[i % vecs.length];
    const coords = vecMap[vec];
    if (coords.length === 0) {
      i++;
      continue;
    }

    destroyCoords = coords.splice(0, 1)[0];
    destroyI++;
    i++;
  }

  const [destroyX, destroyY] = destroyCoords.split(',').map(Number);
  console.log(100 * destroyX + destroyY);
}

const input = `.###..#......###..#...#
#.#..#.##..###..#...#.#
#.#.#.##.#..##.#.###.##
.#..#...####.#.##..##..
#.###.#.####.##.#######
..#######..##..##.#.###
.##.#...##.##.####..###
....####.####.#########
#.########.#...##.####.
.#.#..#.#.#.#.##.###.##
#..#.#..##...#..#.####.
.###.#.#...###....###..
###..#.###..###.#.###.#
...###.##.#.##.#...#..#
#......#.#.##..#...#.#.
###.##.#..##...#..#.#.#
###..###..##.##..##.###
###.###.####....######.
.###.#####.#.#.#.#####.
##.#.###.###.##.##..##.
##.#..#..#..#.####.#.#.
.#.#.#.##.##########..#
#####.##......#.#.####.`.split('\n');

solve1(input);
solve2(input);
