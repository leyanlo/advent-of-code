const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function intersect(a, b) {
  const c = [];
  for (const i of [0, 1, 2]) {
    const min = Math.max(a[i][0], b[i][0]);
    const max = Math.min(a[i][1], b[i][1]);
    if (min > max) {
      return null;
    }
    c.push([min, max]);
  }
  return c;
}

function solve(input, part) {
  const prisms = [];
  lineLoop: for (const line of input.split('\n')) {
    let [on1, prism1] = line.split(' ');
    on1 = on1 === 'on';
    prism1 = prism1
      .match(/-?\d+\.\.-?\d+/g)
      .map((range) => range.split('..').map(Number));

    if (part === 1) {
      for (const i of [0, 1, 2]) {
        const [min, max] = prism1[i];
        const nextMin = Math.max(-50, min);
        const nextMax = Math.min(50, max);
        if (nextMin >= nextMax) {
          continue lineLoop;
        }
        prism1[i] = [nextMin, nextMax];
      }
    }

    for (const { on: on2, prism: prism2 } of [...prisms]) {
      const prism3 = intersect(prism1, prism2);
      if (prism3) {
        prisms.push({
          on: !on2,
          prism: prism3,
        });
      }
    }

    if (on1) {
      prisms.push({
        on: on1,
        prism: prism1,
      });
    }
  }

  console.log(
    prisms
      .map(
        ({ on, prism }) =>
          (on ? 1 : -1) *
          prism.map(([min, max]) => max + 1 - min).reduce((acc, n) => acc * n)
      )
      .reduce((acc, n) => acc + n)
  );
}
solve(input, 1);
solve(input, 2);
