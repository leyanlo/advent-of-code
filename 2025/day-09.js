import { readFileSync } from 'node:fs';

var input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
var input = readFileSync('./day-09-input.txt', 'utf8').trimEnd();
// 4208946784 wrong
// 1181915416 wrong
// 1577956170 right

function getCombos(coords) {
  const combos = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const a = coords[i];
    for (let j = i + 1; j < coords.length; j++) {
      const b = coords[j];
      const area = (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
      combos.push({ coords: [a, b], area });
    }
  }
  return combos.sort((a, b) => b.area - a.area);
}

// function solve(input) {
//   const tiles = input.split('\n').map((line) => line.split(',').map(Number));
//   const combos = getCombos(tiles);
//   console.log(combos[0].area);
// }
// solve(input);

function isPointInPoly(point, poly) {
  let inside = false;
  const [x, y] = point;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];

    if (isPointOnLine(point, [poly[i], poly[j]])) {
      return true;
    }

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointOnLine(point, line) {
  const [x, y] = point;
  const [[x1, y1], [x2, y2]] = line;

  const crossProduct = (y2 - y1) * (x - x1) - (x2 - x1) * (y - y1);
  if (Math.abs(crossProduct) > 1e-10) return false;

  const dotProduct = (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
  if (dotProduct < 0) return false;

  const squaredLengthBA = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (dotProduct > squaredLengthBA) return false;

  return true;
}

function getOrientation(p, q, r) {
  return Math.sign(
    (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0])
  );
}

function doLinesIntersect(p1, p2, q1, q2) {
  const o1 = getOrientation(p1, p2, q1);
  const o2 = getOrientation(p1, p2, q2);
  const o3 = getOrientation(q1, q2, p1);
  const o4 = getOrientation(q1, q2, p2);

  return o1 && o2 && o3 && o4 && o1 !== o2 && o3 !== o4;
}

function isRectInPoly(coords, tiles) {
  const [a, b] = coords;
  const corners = [
    [Math.min(a[0], b[0]), Math.min(a[1], b[1])],
    [Math.max(a[0], b[0]), Math.min(a[1], b[1])],
    [Math.min(a[0], b[0]), Math.max(a[1], b[1])],
    [Math.max(a[0], b[0]), Math.max(a[1], b[1])],
  ];

  for (const corner of corners) {
    if (!isPointInPoly(corner, tiles)) {
      return false;
    }
  }

  const rectEdges = [
    [corners[0], corners[1]],
    [corners[1], corners[3]],
    [corners[3], corners[2]],
    [corners[2], corners[0]],
  ];

  for (const edge of rectEdges) {
    for (let i = 0; i < tiles.length; i++) {
      const j = (i + 1) % tiles.length;
      if (doLinesIntersect(edge[0], edge[1], tiles[i], tiles[j])) {
        return false;
      }
    }
  }
  return true;
}

function solve(input) {
  const tiles = input.split('\n').map((line) => line.split(',').map(Number));
  const combos = getCombos(tiles);
  console.log(combos[0].area);

  for (const combo of combos) {
    if (isRectInPoly(combo.coords, tiles)) {
      console.log(combo.area);
      break;
    }
  }
}
solve(input);
