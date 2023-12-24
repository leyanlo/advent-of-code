import { readFileSync } from 'node:fs';

import { init } from 'z3-solver';

const { Context, em } = await init();
const Z3 = Context('main');

const input = readFileSync('./day-24-input.txt', 'utf8').trimEnd(),
  range = [200000000000000, 400000000000000];

function solve1(input) {
  const hailstones = input
    .split('\n')
    .map((line) => line.match(/-?\d+/g).map(Number));

  let count = 0;
  for (let i = 0; i < hailstones.length - 1; i++) {
    const [x1, y1, z1, vx1, vy1, vz1] = hailstones[i];
    for (let j = i + 1; j < hailstones.length; j++) {
      const [x2, y2, z2, vx2, vy2, vz2] = hailstones[j];

      // x = x1 + vx1 * t1
      // x1 + vx1 * t1 = x2 + vx2 * t2
      // y1 + vy1 * t1 = y2 + vy2 * t2
      // t1 = (x2 - x1 + vx2 * t2) / vx1
      // y1 + vy1 * (x2 - x1 + vx2 * t2) / vx1 = y2 + vy2 * t2
      // y1 + vy1 * (x2 - x1) / vx1 + vy1 * vx2 * t2 / vx1 = y2 + vy2 * t2
      // y1 + vy1 * (x2 - x1) / vx1 = y2 + vy2 * t2 - vy1 * vx2 * t2 / vx1
      // y1 + vy1 * (x2 - x1) / vx1 = y2 + (vy2 - vy1 * vx2 / vx1) * t2
      // (y1 - y2 + vy1 * (x2 - x1) / vx1) / (vy2 - vy1 * vx2 / vx1) = t2
      const t2 =
        (y1 - y2 + (vy1 * (x2 - x1)) / vx1) / (vy2 - (vy1 * vx2) / vx1);
      const t1 =
        (y2 - y1 + (vy2 * (x1 - x2)) / vx2) / (vy1 - (vy2 * vx1) / vx2);
      const x = x2 + vx2 * t2;
      const y = y2 + vy2 * t2;
      if (
        t1 > 0 &&
        t2 > 0 &&
        x >= range[0] &&
        x <= range[1] &&
        y >= range[0] &&
        y <= range[1]
      ) {
        count++;
      }
    }
  }
  console.log(count);
}
solve1(input);

async function solve2(input) {
  const hailstones = input
    .split('\n')
    .map((line) => line.match(/-?\d+/g).map(Number));

  const solver = new Z3.Solver();
  const x = Z3.Int.const('x');
  const y = Z3.Int.const('y');
  const z = Z3.Int.const('z');
  const vx = Z3.Int.const('vx');
  const vy = Z3.Int.const('vy');
  const vz = Z3.Int.const('vz');
  // system of equations solvable after 3
  for (let i = 0; i < 3; i++) {
    const [x1, y1, z1, vx1, vy1, vz1] = hailstones[i];

    // x + vx * t = x1 + vx1 * t
    const t = Z3.Int.const(`t${i}`);
    solver.add(x.add(vx.mul(t)).eq(t.mul(vx1).add(x1)));
    solver.add(y.add(vy.mul(t)).eq(t.mul(vy1).add(y1)));
    solver.add(z.add(vz.mul(t)).eq(t.mul(vz1).add(z1)));
  }
  await solver.check();
  const model = solver.model();
  console.log(
    [x, y, z].map((p) => +model.get(p).toString()).reduce((acc, n) => acc + n)
  );
}
await solve2(input);

// https://github.com/Z3Prover/z3/issues/6701
em.PThread.terminateAllThreads();
