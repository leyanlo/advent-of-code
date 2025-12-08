import { readFileSync } from 'node:fs';

var input = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;
var input = readFileSync('./day-08-input.txt', 'utf8').trimEnd();

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
  console.log(combos);
  return combos;
}

// function solve(input) {
//   const coords = input.split('\n').map((line) => line.split(',').map(Number));
//   const combos = getCombos(coords);
//   const circuits = coords.reduce((acc, coord, i) => {
//     acc[`${coord}`] = i;
//     return acc;
//   }, {});
//   const counts = coords.map(() => 1);
//   for (let i = 0; i <= 1000; i++) {
//     const combo = combos[i];
//     const [a, b] = combo.pair;
//     const keyA = `${a}`;
//     const keyB = `${b}`;
//     if (circuits[keyA] && circuits[keyB]) {
//       if (circuits[keyA] !== circuits[keyB]) {
//         // merge circuits
//         const oldId = circuits[keyB];
//         const newId = circuits[keyA];
//         for (const key in circuits) {
//           if (circuits[key] === oldId) {
//             circuits[key] = newId;
//           }
//         }
//         counts[newId] += counts[oldId];
//         counts[oldId] = 0;
//       }
//       continue; // both already assigned
//     }
//     if (circuits[keyA]) {
//       circuits[keyB] = circuits[keyA];
//       counts[circuits[keyA]]++;
//     } else {
//       circuits[keyA] = circuits[keyB];
//       counts[circuits[keyB]]++;
//       counts[circuits[keyA]]--;
//     }
//   }
//   console.log(circuits, counts);
//   counts.sort((a, b) => b - a);
//   console.log(counts.slice(0, 3).reduce((acc, n) => acc * n, 1));
// }
// solve(input);

function solve(input) {
  const coords = input.split('\n').map((line) => line.split(',').map(Number));
  const combos = getCombos(coords);
  const circuits = coords.reduce((acc, coord, i) => {
    acc[`${coord}`] = i;
    return acc;
  }, {});
  const counts = coords.map(() => 1);
  for (const combo of combos) {
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
