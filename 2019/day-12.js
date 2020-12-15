function solve1(input) {
  let positions = input.map((line) => {
    return line.match(/([\-0-9]+)/g).map(Number);
  });
  const velocities = input.map(() => [0, 0, 0]);

  for (let step = 0; step < 1000; step++) {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const pos1 = positions[i];
        const pos2 = positions[j];
        const dv = pos2.map((p2, k) => {
          return p2 > pos1[k] ? 1 : p2 === pos1[k] ? 0 : -1;
        });
        velocities[i] = velocities[i].map((v, k) => v + dv[k]);
        velocities[j] = velocities[j].map((v, k) => v - dv[k]);
      }
    }
    positions = positions.map((pos, i) =>
      pos.map((p, j) => p + velocities[i][j])
    );
  }
  const potentials = positions.map((pos) => {
    return pos.reduce((sum, p) => {
      return sum + Math.abs(p);
    }, 0);
  }, 0);
  const kinetics = velocities.map((vel) => {
    return vel.reduce((sum, v) => {
      return sum + Math.abs(v);
    }, 0);
  }, 0);
  const totals = potentials.map((pot, i) => {
    return pot * kinetics[i];
  });
  const sumTotal = totals.reduce((sum, t) => sum + t, 0);
  console.log(sumTotal);
}

function solve2(input) {
  let positions = input.map((line) => {
    return line.match(/([\-0-9]+)/g).map(Number);
  });
  const velocities = input.map(() => [0, 0, 0]);

  const seen = {};
  let step = 0;
  while (!seen[positions.join() + velocities.join()]) {
    seen[positions.join() + velocities.join()] = true;
    step++;
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const pos1 = positions[i];
        const pos2 = positions[j];
        const dv = pos2.map((p2, k) => {
          return p2 > pos1[k] ? 1 : p2 === pos1[k] ? 0 : -1;
        });
        velocities[i] = velocities[i].map((v, k) => v + dv[k]);
        velocities[j] = velocities[j].map((v, k) => v - dv[k]);
      }
    }
    positions = positions.map((pos, i) =>
      pos.map((p, j) => p + velocities[i][j])
    );
  }
  console.log(step);
}

const input = `<x=-13, y=-13, z=-13>
<x=5, y=-8, z=3>
<x=-6, y=-10, z=-3>
<x=0, y=5, z=-5>`.split('\n');

solve1(input);
// TODO: optimize
// solve2(input);
