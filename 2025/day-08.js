import { readFileSync } from 'node:fs';

const input = readFileSync('./day-08-input.txt', 'utf8').trimEnd();

function getCombos(coords) {
  // return pairs of coords sorted by distance
  const combos = [];
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      // distance is the square root of the sum of the squares of the differences
      const dist = Math.sqrt(
        (coords[i][0] - coords[j][0]) ** 2 +
          (coords[i][1] - coords[j][1]) ** 2 +
          (coords[i][2] - coords[j][2]) ** 2
      );
      combos.push({ pair: [coords[i], coords[j]], distance: dist });
    }
  }
  combos.sort((a, b) => a.distance - b.distance);
  return combos;
}

function solve(input) {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));
  const combos = getCombos(coords);
  const circuits = coords.reduce((acc, coord, i) => {
    acc[`${coord}`] = i;
    return acc;
  }, {});
  const counts = coords.map(() => 1);
  let i = -1;
  for (const combo of combos) {
    i++;
    if (i === 1000) {
      console.log(
        counts
          .toSorted((a, b) => b - a)
          .slice(0, 3)
          .reduce((acc, n) => acc * n, 1)
      );
    }
    const [a, b] = combo.pair;
    const keyA = `${a}`;
    const keyB = `${b}`;
    if (circuits[keyA] && circuits[keyB]) {
      if (circuits[keyA] !== circuits[keyB]) {
        // merge circuits
        const oldId = circuits[keyB];
        const newId = circuits[keyA];
        for (const key in circuits) {
          if (circuits[key] === oldId) {
            circuits[key] = newId;
          }
        }
        if (counts[oldId] + counts[newId] === coords.length - 1) {
          console.log(a[0] * b[0]);
        }
        counts[newId] += counts[oldId];
        counts[oldId] = 0;
      }
      continue; // both already assigned
    }
    if (circuits[keyA]) {
      circuits[keyB] = circuits[keyA];
      counts[circuits[keyA]]++;
      counts[circuits[keyB]]--;
    } else {
      circuits[keyA] = circuits[keyB];
      counts[circuits[keyB]]++;
      counts[circuits[keyA]]--;
    }
  }
}
solve(input);
