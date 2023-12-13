import { readFileSync } from 'node:fs';

const input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

// min vx to reach target
function getMinVx(xMin) {
  let x = 0;
  let vx = 0;
  while (x < xMin) {
    vx++;
    x += vx;
  }
  return vx;
}

// max y of arc or null if miss
function getMaxY([vx, vy], [[xMin, xMax], [yMin, yMax]]) {
  let [x, y] = [0, 0];
  let maxY = 0;
  while (y >= yMin) {
    maxY = Math.max(maxY, y);
    x += vx;
    y += vy;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      return maxY;
    }
    vx = Math.sign(vx) * (Math.abs(vx) - 1);
    vy--;
  }
  return null;
}

function visualizeVelocities(velocities) {
  const [minVx, minVy] = velocities.reduce(([vxMin, vyMin], [vx, vy]) => [
    Math.min(vxMin, vx),
    Math.min(vyMin, vy),
  ]);
  const [maxVx, maxVy] = velocities.reduce(([maxVx, maxVy], [vx, vy]) => [
    Math.max(maxVx, vx),
    Math.max(maxVy, vy),
  ]);
  const map = [...Array(maxVy - minVy + 1)].map(() =>
    Array(maxVx - minVx + 1).fill(' ')
  );
  for (const [vx, vy] of velocities) {
    map[vy - minVy][vx - minVx] = '◻️';
  }
  console.log(map.map((row) => row.join('')).join('\n'));
}

function solve(input) {
  let [, xRange, yRange] = input.match(/x=(.+), y=(.+)/);
  const [xMin, xMax] = xRange.split('..').map(Number);
  const [yMin, yMax] = yRange.split('..').map(Number);

  const velocities = [];
  let maxY = 0;
  for (let vx = getMinVx(xMin); vx <= xMax; vx++) {
    for (let vy = yMin; vy < -yMin; vy++) {
      const nextMaxY = getMaxY(
        [vx, vy],
        [
          [xMin, xMax],
          [yMin, yMax],
        ]
      );
      if (nextMaxY !== null) {
        maxY = Math.max(maxY, nextMaxY);
        velocities.push([vx, vy]);
      }
    }
  }
  visualizeVelocities(velocities);
}
solve(input);
