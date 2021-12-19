const fs = require('fs');

const input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

const rots = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [-z, -y, -x],
  ([x, y, z]) => [-y, -x, -z],
];

function transform(beacons, rot, dists) {
  return beacons.map((b) => rot(b).map((coord, i) => coord + dists[i]));
}

function solve(input) {
  const scanners = input.split('\n\n').map((scanner) => {
    return scanner
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map(Number));
  });

  const scannerRots = [{ 0: 0 }];
  const scannerDists = [{ 0: [0, 0, 0] }];
  for (let i = 1; i < scanners.length; i++) {
    s2Loop: for (let j = 0; j < scanners.length; j++) {
      if (i === j) {
        continue;
      }

      const scanner1 = scanners[i];
      for (let rotIdx = 0; rotIdx < rots.length; rotIdx++) {
        const rot = rots[rotIdx];
        const dists = {};
        for (const s1 of scanner1) {
          const [x1, y1, z1] = rot(s1);
          for (const [x2, y2, z2] of scanners[j]) {
            const dist = [x2 - x1, y2 - y1, z2 - z1].join();
            dists[dist] = (dists[dist] ?? 0) + 1;
            if (dists[dist] === 12) {
              scannerRots[i] = { ...(scannerRots[i] ?? {}), [j]: rotIdx };
              scannerDists[i] = {
                ...(scannerDists[i] ?? {}),
                [j]: dist.split(',').map(Number),
              };
              continue s2Loop;
            }
          }
        }
      }
    }
  }

  const transformations = scanners.map(() => ({}));
  while (!scannerRots.map((r) => Object.keys(r).includes('0')).every(Boolean)) {
    for (let i = 1; i < scannerRots.length; i++) {
      if (scannerRots[i][0]) {
        continue;
      }

      for (const j of Object.keys(scannerRots[i])) {
        if (!scannerRots[j][0]) {
          continue;
        }

        const rotIdx2 = scannerRots[i][j];
        const dist2 = scannerDists[i][j];

        transformations[i][0] = [
          {
            rotIdx: rotIdx2,
            dist: dist2,
          },
          ...(transformations[j][0] ?? []),
        ];
        scannerRots[i][0] = scannerRots[j][0];
        scannerDists[i][0] = scannerDists[j][0];
      }
    }
  }

  const beacons = new Set(scanners[0].map((b) => b.join()));
  for (let i = 1; i < scanners.length; i++) {
    let scanner = scanners[i];
    for (const { rotIdx, dist } of transformations[i][0] ?? []) {
      scanner = transform(scanner, rots[rotIdx], dist);
    }
    scanner = transform(scanner, rots[scannerRots[i][0]], scannerDists[i][0]);
    for (const b of scanner) {
      beacons.add(b.join());
    }
  }
  console.log(beacons.size);

  const actualCoords = [[0, 0, 0]];
  for (let i = 1; i < scanners.length; i++) {
    let scanner = [[0, 0, 0]];
    for (const { rotIdx, dist } of transformations[i][0] ?? []) {
      scanner = transform(scanner, rots[rotIdx], dist);
    }
    scanner = transform(scanner, rots[scannerRots[i][0]], scannerDists[i][0]);
    actualCoords.push(scanner[0]);
  }

  let maxDist = 0;
  for (let i = 0; i < actualCoords.length - 1; i++) {
    const [x1, y1, z1] = actualCoords[i];
    for (let j = 1; j < actualCoords.length; j++) {
      const [x2, y2, z2] = actualCoords[j];
      maxDist = Math.max(
        maxDist,
        Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1)
      );
    }
  }
  console.log(maxDist);
}
solve(input);
