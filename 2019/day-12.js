require = require('esm')(module);

const inputIdx = 2;

function gcd(...nums) {
  function _gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }
  return nums.reduce((acc, n) => _gcd(acc, n));
}

function lcm(...nums) {
  return nums.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

function solve1(input) {
  let positions = input.split('\n').map((line) => {
    return line.match(/([-0-9]+)/g).map(Number);
  });
  const velocities = positions.map(() => [0, 0, 0]);

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
  const positions = input.split('\n').map((line) => {
    return line.match(/([-0-9]+)/g).map(Number);
  });

  const posByDim = [...Array(3).keys()].map((i) => positions.map((p) => p[i]));
  const velByDim = [...Array(3).keys()].map(() => positions.map(() => 0));

  const stepByDim = [0, 0, 0];
  for (let i = 0; i < posByDim.length; i++) {
    const seen = {};
    while (!seen[[posByDim[i].join(), velByDim[i].join()].join()]) {
      seen[[posByDim[i].join(), velByDim[i].join()].join()] = true;
      stepByDim[i]++;
      for (let j = 0; j < posByDim[i].length - 1; j++) {
        for (let k = j + 1; k < posByDim[i].length; k++) {
          const pos1 = posByDim[i][j];
          const pos2 = posByDim[i][k];
          const dv = pos2 > pos1 ? 1 : pos2 === pos1 ? 0 : -1;
          velByDim[i][j] += dv;
          velByDim[i][k] -= dv;
        }
      }
      posByDim[i] = posByDim[i].map((pos, j) => pos + velByDim[i][j]);
    }
  }
  console.log(lcm(...stepByDim));
}

const inputs = [];
inputs.push(`<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`);

inputs.push(`<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`);

inputs.push(`<x=-13, y=-13, z=-13>
<x=5, y=-8, z=3>
<x=-6, y=-10, z=-3>
<x=0, y=5, z=-5>`);

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
