const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();

function intersect(a, b) {
  const c = [0, 1, 2].map((i) => [
    Math.max(a[i][0], b[i][0]),
    Math.min(a[i][1], b[i][1]),
  ]);
  if (c.some(([min, max]) => min > max)) {
    return null;
  }
  return c;
}

function solve(input, part) {
  const cuboids = [];
  for (const line of input.split('\n')) {
    let [on1, cuboid1] = line.split(' ');
    on1 = on1 === 'on';
    cuboid1 = cuboid1
      .match(/-?\d+\.\.-?\d+/g)
      .map((range) => range.split('..').map(Number));

    if (part === 1) {
      cuboid1 = cuboid1.map(([min, max]) => [
        Math.max(-50, min),
        Math.min(50, max),
      ]);
      if (cuboid1.some(([min, max]) => min > max)) {
        continue;
      }
    }

    for (const { on: on2, cuboid: cuboid2 } of [...cuboids]) {
      const cuboid3 = intersect(cuboid1, cuboid2);
      if (cuboid3) {
        cuboids.push({
          on: !on2,
          cuboid: cuboid3,
        });
      }
    }

    if (on1) {
      cuboids.push({
        on: on1,
        cuboid: cuboid1,
      });
    }
  }

  console.log(
    cuboids
      .map(
        ({ on, cuboid }) =>
          (on ? 1 : -1) *
          cuboid.map(([min, max]) => max + 1 - min).reduce((acc, n) => acc * n)
      )
      .reduce((acc, n) => acc + n)
  );
}
solve(input, 1);
solve(input, 2);
