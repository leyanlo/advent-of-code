import { readFileSync } from 'node:fs';

const input = readFileSync('./day-21-input.txt', 'utf8').trimEnd();

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function solve1(input) {
  let positions = new Set();
  const map = input.split('\n').map((line, r) =>
    line.split('').map((char, c) => {
      if (char === 'S') {
        positions.add([r, c].join());
      }
      return +(char !== '#');
    })
  );

  for (let i = 0; i < 64; i++) {
    const nextPositions = new Set();
    for (const p of positions) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        if (map[r + dr]?.[c + dc]) {
          nextPositions.add([r + dr, c + dc].join());
        }
      }
    }
    positions = nextPositions;
  }
  console.log(positions.size);
}
solve1(input);

function solve2(input) {
  let positions = new Set();
  const map = input.split('\n').map((line, r) =>
    line.split('').map((char, c) => {
      if (char === 'S') {
        positions.add([r, c].join());
      }
      return +(char !== '#');
    })
  );
  const size = map.length;

  const target = 26501365;
  const counts = [];
  for (let i = 0; i < target; i++) {
    const nextPositions = new Set();
    for (const p of positions) {
      const [r, c] = p.split(',').map(Number);
      for (const [dr, dc] of dirs) {
        const r2 = r + dr;
        const c2 = c + dc;
        if (map.at(r2 % size).at(c2 % size)) {
          nextPositions.add([r2, c2].join());
        }
      }
    }

    positions = nextPositions;
    if ((i + 1) % size === target % size) {
      if (
        counts.length >= 3 &&
        positions.size - 2 * counts.at(-1) + counts.at(-2) ===
          counts.at(-1) - 2 * counts.at(-2) + counts.at(-3)
      ) {
        // converged
        break;
      }
      counts.push(positions.size);
    }
  }

  // second derivative
  const d2 = counts.at(-1) - 2 * counts.at(-2) + counts.at(-3);
  for (let i = counts.length * size + (target % size); i <= target; i += size) {
    counts.push(d2 + 2 * counts.at(-1) - counts.at(-2));
  }
  console.log(counts.at(-1));
}
solve2(input);
