import { readFileSync } from 'node:fs';

const input = readFileSync('./day-08-input.txt', 'utf8').trimEnd();

// get all combos of coordinates sorted ascending by distance
function getCombos(coords) {
  const combos = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const a = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const b = coords[j];
      const dist = Math.sqrt(
        (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
      );
      combos.push({ coords: [a, b], dist });
    }
  }
  return combos.sort((a, b) => a.dist - b.dist).map((c) => c.coords);
}

function solve(input) {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));
  const combos = getCombos(coords);
  const coordToId = coords.reduce((acc, coord, i) => {
    acc[coord] = i;
    return acc;
  }, {});
  const counts = coords.map(() => 1);
  let i = 0;
  for (const [a, b] of combos) {
    if (i++ === 1000) {
      console.log(
        counts
          .toSorted((a, b) => b - a)
          .slice(0, 3)
          .reduce((acc, n) => acc * n, 1)
      );
    }
    if (coordToId[a] === coordToId[b]) {
      // already connected
      continue;
    }

    // merge circuits
    const oldId = coordToId[b];
    const newId = coordToId[a];
    if (counts[oldId] + counts[newId] === coords.length) {
      console.log(a[0] * b[0]);
      break;
    }
    for (const coord in coordToId) {
      if (coordToId[coord] === oldId) {
        coordToId[coord] = newId;
      }
    }
    counts[newId] += counts[oldId];
    counts[oldId] = 0;
  }
}
solve(input);
