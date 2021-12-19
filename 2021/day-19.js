const fs = require('fs');

var input = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`;
var input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

const rots = [
  (x, y, z) => [x, y, z],
  (x, y, z) => [y, z, x],
  (x, y, z) => [z, x, y],
  (x, y, z) => [-z, -y, -x],
  (x, y, z) => [-y, -x, -z],
  (x, y, z) => [-x, -z, -y],
  (x, y, z) => [-x, z, y],
  (x, y, z) => [z, y, -x],
  (x, y, z) => [y, -x, z],
  (x, y, z) => [x, z, -y],
  (x, y, z) => [z, -y, x],
  (x, y, z) => [-y, x, z],
  (x, y, z) => [x, -z, y],
  (x, y, z) => [-z, y, x],
  (x, y, z) => [y, x, -z],
  (x, y, z) => [-x, -y, z],
  (x, y, z) => [-y, z, -x],
  (x, y, z) => [z, -x, -y],
  (x, y, z) => [-x, y, -z],
  (x, y, z) => [y, -z, -x],
  (x, y, z) => [-z, -x, y],
  (x, y, z) => [x, -y, -z],
  (x, y, z) => [-y, -z, x],
  (x, y, z) => [-z, x, -y],
];

// convert(scanners[1], rots[scannerRots[1][0]], scannerDists[1][0]);
function convert(beacons, rot, dists) {
  return beacons.map((b) => rot(...b).map((coord, i) => coord + dists[i]));
}

function solve(input) {
  const scanners = input.split('\n\n').map((s) => {
    return s
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map(Number));
  });
  console.log(scanners);

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
          const [x1, y1, z1] = rot(...s1);
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
  console.log('scannerRots:', scannerRots);
  console.log('scannerDists:', scannerDists);

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
  console.log('transformations:', JSON.stringify(transformations, null, 2));
  console.log('scannerRots:', scannerRots);
  console.log('scannerDists:', scannerDists);

  const beacons = new Set(scanners[0].map((b) => b.join()));
  for (let i = 1; i < scanners.length; i++) {
    let scanner = scanners[i];
    for (const { rotIdx, dist } of transformations[i][0] ?? []) {
      scanner = convert(scanner, rots[rotIdx], dist);
    }
    scanner = convert(scanner, rots[scannerRots[i][0]], scannerDists[i][0]);
    for (const b of scanner) {
      beacons.add(b.join());
    }
  }
  console.log(beacons);
  console.log(beacons.size);

  const actualCoords = [[0, 0, 0]];
  for (let i = 1; i < scanners.length; i++) {
    let scanner = [[0, 0, 0]];
    for (const { rotIdx, dist } of transformations[i][0] ?? []) {
      scanner = convert(scanner, rots[rotIdx], dist);
    }
    scanner = convert(scanner, rots[scannerRots[i][0]], scannerDists[i][0]);
    actualCoords.push(scanner[0]);
  }
  console.log(actualCoords);

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
