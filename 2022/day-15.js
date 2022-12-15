const fs = require('fs');

const input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd(),
  targetY = 2000000,
  maxCoord = 4000000;

function dist(x, y, x2, y2) {
  return Math.abs(x2 - x) + Math.abs(y2 - y);
}

function solve1(input) {
  const targetRow = {};
  for (const line of input.split('\n')) {
    const [x, y, xb, yb] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, xb, yb);
    if (yb === targetY) {
      targetRow[xb] = 0;
    }
    let dx = 0;
    do {
      if (dist(x, y, x + dx, targetY) > d) {
        break;
      }
      for (const x2 of [-1, 1].map((sign) => x + sign * dx)) {
        if (targetRow[x2] !== 0 && dist(x, y, x2, targetY) <= d) {
          targetRow[x2] = 1;
        }
      }
      dx++;
    } while (true);
  }
  console.log(Object.values(targetRow).reduce((acc, n) => acc + n));
}
solve1(input);

function intersect(p1, p2, p3, p4) {
  // Line p1-p2 represented as a1x + b1y = c1
  const a1 = p2[1] - p1[1];
  const b1 = p1[0] - p2[0];
  const c1 = a1 * p1[0] + b1 * p1[1];

  // Line p3-p4 represented as a2x + b2y = c2
  const a2 = p4[1] - p3[1];
  const b2 = p3[0] - p4[0];
  const c2 = a2 * p3[0] + b2 * p3[1];

  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    // The lines are parallel
    return null;
  } else {
    const x = (b2 * c1 - b1 * c2) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
    return [x, y].map(Math.round);
  }
}

function solve2(input) {
  const sensors = [];
  const diamonds = [];
  for (const line of input.split('\n')) {
    const [x, y, bx, by] = line.match(/[-\d]+/g).map(Number);
    const d = dist(x, y, bx, by);
    sensors.push([x, y, d]);
    diamonds.push([
      [x + (d + 1), y],
      [x, y + (d + 1)],
      [x - (d + 1), y],
      [x, y - (d + 1)],
    ]);
  }

  const intersections = {};
  for (let i = 0; i < diamonds.length - 1; i++) {
    const d1 = diamonds[i];
    for (let j = i + 1; j < diamonds.length; j++) {
      const d2 = diamonds[j];
      for (let i2 = 0; i2 < 4; i2++) {
        for (let j2 = 0; j2 < 4; j2++) {
          const int = intersect(
            d1[i2],
            d1[(i2 + 1) % 4],
            d2[j2],
            d2[(j2 + 1) % 4]
          );
          if (int?.every((x) => x >= 0 && x <= maxCoord)) {
            intersections[int.join()] = 1;
          }
        }
      }
    }
  }

  for (const intersection of Object.keys(intersections)) {
    const [xi, yi] = intersection.split(',').map(Number);
    if (sensors.every(([x, y, d]) => dist(x, y, xi, yi) > d)) {
      console.log(4000000 * xi + yi);
      break;
    }
  }
}
solve2(input);
