const fs = require('fs');

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
  let faces = cubes.map(toFaces);
  console.log(faces);
  console.log(faces.flat().length);
  faces = Object.keys(
    faces.flat().reduce((acc, face) => {
      if (acc[face]) {
        delete acc[face];
      } else {
        acc[face] = 1;
      }
      return acc;
    }, {})
  );

  const faceSet = new Set(faces);
  console.log(faceSet.size);

  const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = [0, 1, 2].map((i) =>
    [Math.min, Math.max].map((f) => f(...cubes.map((coords) => coords[i])))
  );

  const valids = new Set(cubes.map((cube) => cube.join()));
  const invalids = new Set();

  function checkValid([x, y, z]) {
    const queue = dirs.map(([dx, dy, dz]) => [x + dx, y + dy, z + dz]);
    while (queue.length) {
      const [x2,y2,z2] = queue.shift();
      const key = [x2, y2, z2].join();
      if (valids.has(key)) {
        continue;
      }
      if (x < xMin || x > xMax || y < yMin || y > yMax || z < zMin || z > zMax) {
        return true;
      }
      if (invalids.has(key)) {
        return false;
      }


    }

  }

  for (const [x, y, z] of cubes) {
    for (const [dx, dy, dz] of dirs) {
      const [x2, y2, z2] = [x + dx, y + dy, z + dz];
      const key = [x2, y2, z2].join();
      if (valids.has(key) || invalids.has(key)) {
        continue;
      }

      if (checkValid([x2, y2, z2])) {
        valids.add(key);
      } else {
        invalids.add(key);
      }
    }
  }
  for (const invalid of [...invalids]) {
    const [x, y, z] = invalid.split(',');
    for (const face of toFaces([x, y, z])) {
      faceSet.delete(face);
    }
  }
  console.log(faceSet.size);
}
solve(input);
