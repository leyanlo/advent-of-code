import { readFileSync } from 'node:fs';

var input = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;
var input = readFileSync('./day-18-input.txt', 'utf8').trimEnd();
// 77300 wrong
// 74074 correct

const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

function printMap(map, minR, maxR, minC, maxC) {
  const lines = [];
  for (let r = minR; r <= maxR; r++) {
    const line = [];
    for (let c = minC; c <= maxC; c++) {
      line.push(+!!map[r]?.[c]);
    }
    lines.push(line);
  }
  console.log(lines.map((line) => line.join('')).join('\n'));
}

function solve(input) {
  console.log(input);
  const map = { 0: { 0: 1 } };

  let curr = [0, 0];
  for (const line of input.split('\n')) {
    let [d, n, color] = line.split(/[ ()]+/g);
    n = +n;
    console.log({ d, n, color });
    let [r, c] = curr;
    let [dr, dc] = DIR[d];
    for (let i = 0; i < n; i++) {
      r += dr;
      c += dc;
      map[r] ??= {};
      map[r][c] = 1;
    }
    curr = [r, c];
  }
  const minR = Math.min(...Object.keys(map).map(Number));
  const maxR = Math.max(...Object.keys(map).map(Number));
  const minC = Math.min(
    ...Object.keys(map)
      .map((r) => Math.min(...Object.keys(map[r]).map(Number)))
      .map(Number)
  );
  const maxC = Math.max(
    ...Object.keys(map)
      .map((r) => Math.max(...Object.keys(map[r]).map(Number)))
      .map(Number)
  );
  // printMap(map, minR, maxR, minC, maxC);
  console.log({ minR, maxR, minC, maxC });

  const queue = [[1, 1]];
  const seen = {};
  while (queue.length) {
    const [r, c] = queue.pop();
    if (
      seen[r]?.[c] ||
      map[r][c] ||
      r < minR ||
      r > maxR ||
      c < minC ||
      c > maxC
    )
      continue;
    seen[r] ??= {};
    seen[r][c] = 1;

    for (const [dr, dc] of Object.values(DIR)) {
      queue.push([r + dr, c + dc]);
    }
  }

  let count = 0;
  // printMap(seen, minR, maxR, minC, maxC);
  console.log(
    Object.values(map)
      .map((row) => Object.values(row))
      .flat().length +
      Object.values(seen)
        .map((row) => Object.values(row))
        .flat().length
  );
}

console.time();
solve(input);
console.timeEnd();
