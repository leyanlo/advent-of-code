const fs = require('fs');

var input = `on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10`;
var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const map = {};
//   for (const line of input.split('\n')) {
//     let [on, ranges] = line.split(' ');
//     on = +(on === 'on');
//     const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = ranges
//       .match(/-?\d+..-?\d+/g)
//       .map((range) => range.split('..').map(Number));
//
//     for (let x = Math.max(-50, xMin); x <= Math.min(50, xMax); x++) {
//       for (let y = Math.max(-50, yMin); y <= Math.min(50, yMax); y++) {
//         for (let z = Math.max(-50, zMin); z <= Math.min(50, zMax); z++) {
//           map[[x, y, z].join()] = on;
//         }
//       }
//     }
//   }
//   console.log(Object.values(map).filter(Boolean).length);
// }
// solve(input);
function solve(input) {
  let prisms = [];
  for (const line of input.split('\n')) {
    let [on, prism1] = line.split(' ');
    on = on === 'on';

    prism1 = prism1
      .match(/-?\d+..-?\d+/g)
      .map((range) => range.split('..').map((s, i) => +s + i));
    const [[xMin1, xMax1], [yMin1, yMax1], [zMin1, zMax1]] = prism1;

    const nextPrisms = on ? [prism1] : [];
    for (const prism2 of prisms) {
      const [[xMin2, xMax2], [yMin2, yMax2], [zMin2, zMax2]] = prism2;
      // if prism2 does not intersect prism1
      if (
        xMin2 > xMax1 ||
        yMin2 > yMax1 ||
        zMin2 > zMax1 ||
        xMax2 < xMin1 ||
        yMax2 < yMin1 ||
        zMax2 < zMin1
      ) {
        nextPrisms.push(prism2);
        continue;
      }

      const xPoints = [
        xMin2,
        ...[xMin1, xMax1].filter((x) => xMin2 < x && x < xMax2),
        xMax2,
      ];
      const yPoints = [
        yMin2,
        ...[yMin1, yMax1].filter((y) => yMin2 < y && y < yMax2),
        yMax2,
      ];
      const zPoints = [
        zMin2,
        ...[zMin1, zMax1].filter((z) => zMin2 < z && z < zMax2),
        zMax2,
      ];
      for (let i = 0; i < xPoints.length - 1; i++) {
        const nextXMin = xPoints[i];
        const nextXMax = xPoints[i + 1];
        for (let j = 0; j < yPoints.length - 1; j++) {
          const nextYMin = yPoints[j];
          const nextYMax = yPoints[j + 1];
          for (let k = 0; k < zPoints.length - 1; k++) {
            const nextZMin = zPoints[k];
            const nextZMax = zPoints[k + 1];
            const nextPrism = [
              [nextXMin, nextXMax],
              [nextYMin, nextYMax],
              [nextZMin, nextZMax],
            ];
            // if nextPrism extends beyond prism1
            if (
              nextXMin < xMin1 ||
              nextYMin < yMin1 ||
              nextZMin < zMin1 ||
              nextXMax > xMax1 ||
              nextYMax > yMax1 ||
              nextZMax > zMax1
            ) {
              nextPrisms.push(nextPrism);
            }
          }
        }
      }
    }
    prisms = nextPrisms;
  }
  console.log(
    prisms
      .map(
        ([[xMin, xMax], [yMin, yMax], [zMin, zMax]]) =>
          (xMax - xMin) * (yMax - yMin) * (zMax - zMin)
      )
      .reduce((acc, v) => acc + v)
  );
}
solve(input);
