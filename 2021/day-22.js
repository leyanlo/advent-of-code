const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  let prisms = [];

  for (const line of input.split('\n')) {
    let [on, prism1] = line.split(' ');
    on = on === 'on';

    prism1 = prism1
      .match(/-?\d+\.\.-?\d+/g)
      .map((range) => range.split('..').map((s, i) => +s + i));

    if (part === 1) {
      prism1 = prism1.map(([min, max]) => [
        Math.max(-50, min),
        Math.min(51, max),
      ]);
      if (prism1.some(([min, max]) => min >= max)) {
        continue;
      }
    }

    const [[xMin1, xMax1], [yMin1, yMax1], [zMin1, zMax1]] = prism1;

    const nextPrisms = on ? [prism1] : [];

    // break up or remove any prisms that intersect with prism1
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
      .map((prism) =>
        prism.map(([min, max]) => max - min).reduce((acc, n) => acc * n)
      )
      .reduce((acc, n) => acc + n)
  );
}
solve(input, 1);
solve(input, 2);
