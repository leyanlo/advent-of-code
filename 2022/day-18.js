const fs = require('fs');
const { isIndex } = require('mathjs');

var input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;
// var input=`1,1,1
// 2,1,1`
var input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();
// 4058 wrong

// function solve(input) {
//   const cubes = input.split('\n').map((line) => line.split(',').map(Number));
//   const faces = cubes.map(([x, y, z]) =>
//     [
//       [0, x, y, z],
//       [1, x, y, z],
//       [2, x, y, z],
//       [2, x + 1, y, z],
//       [1, x, y + 1, z],
//       [0, x, y, z + 1],
//     ].map((key) => key.join())
//   );
//   console.log(faces);
//   console.log(faces.flat().length);
//   // console.log(
//   //   faces.flat().reduce((acc, face) => {
//   //     acc[face] = acc[face] ?? 0;
//   //     acc[face]++;
//   //     return acc;
//   //   }, {})
//   // );
//   console.log(
//     faces.flat().length -
//       2 * (faces.flat().length - new Set([...faces.flat()]).size)
//   );
// }
// solve(input);

const dirs = [
  [0, 0, 1],
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, -1],
  [0, -1, 0],
  [-1, 0, 0],
];

function toFaces([x, y, z]) {
  return [
    [0, x, y, z],
    [1, x, y, z],
    [2, x, y, z],
    [0, x + 1, y, z],
    [1, x, y + 1, z],
    [2, x, y, z + 1],
  ].map((key) => key.join());
}

function solve(input) {
  const cubes = input.split('\n').map((line) => line.split(',').map(Number));
  const cubeSet = new Set(cubes.map((cube) => cube.join()));
  const emptySet = new Set();
  let nFaces = 0;
  for (const [x, y, z] of cubes) {
    for (const [dx, dy, dz] of dirs) {
      const key = [x + dx, y + dy, z + dz].join();
      if (!cubeSet.has(key)) {
        nFaces++;
        emptySet.add(key);
      }
    }
  }
  console.log(nFaces);

  const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = [0, 1, 2].map((i) =>
    [Math.min, Math.max].map((f) => f(...cubes.map((coords) => coords[i])))
  );

  const interiorSet = new Set(cubeSet);
  for (const key of [...emptySet]) {
    if (interiorSet.has(key)) {
      continue;
    }

    const seen = new Set([key]);
    const queue = [key];
    let isTrapped = true;

    outer: while (queue.length) {
      const [x, y, z] = queue.shift().split(',').map(Number);
      for (const [dx, dy, dz] of dirs) {
        const [x2, y2, z2] = [x + dx, y + dy, z + dz];
        const key2 = [x2, y2, z2].join();
        if (
          x2 < xMin ||
          x2 > xMax ||
          y2 < yMin ||
          y2 > yMax ||
          z2 < zMin ||
          z2 > zMax
        ) {
          isTrapped = false;
          break outer;
        }

        if (interiorSet.has(key2)) {
          continue;
        }

        if (!seen.has(key2)) {
          seen.add(key2);
          queue.push(key2);
        }
      }
    }

    if (isTrapped) {
      for (const key of [...seen]) {
        interiorSet.add(key);
      }
    }
  }

  nFaces = 0;
  for (const [x, y, z] of [...interiorSet].map((key) =>
    key.split(',').map(Number)
  )) {
    for (const [dx, dy, dz] of dirs) {
      const key = [x + dx, y + dy, z + dz].join();
      if (!interiorSet.has(key)) {
        nFaces++;
      }
    }
  }
  console.log(nFaces);
}
solve(input);
