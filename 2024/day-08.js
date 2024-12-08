import { readFileSync } from 'node:fs';

const input = readFileSync('./day-08-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const antennas = {};
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char !== '.') {
        (antennas[char] ??= []).push([i, j]);
      }
    }
  }

  const antinodes = lines.map((line) => Array.from(line).fill(0));
  for (const coords of Object.values(antennas)) {
    for (let i = 0; i < coords.length - 1; i++) {
      const [y, x] = coords[i];
      for (let j = i + 1; j < coords.length; j++) {
        const [y2, x2] = coords[j];
        const dy = y2 - y;
        const dx = x2 - x;

        if (part === 1) {
          for (const [y3, x3] of [
            [y2 + dy, x2 + dx],
            [y - dy, x - dx],
          ]) {
            if (antinodes[y3]?.[x3] === 0) {
              antinodes[y3][x3] = 1;
            }
          }
        } else {
          for (let [y3, x3, dir] of [
            [y2, x2, 1],
            [y, x, -1],
          ]) {
            while (antinodes[y3]?.[x3] !== undefined) {
              antinodes[y3][x3] = 1;
              y3 += dy * dir;
              x3 += dx * dir;
            }
          }
        }
      }
    }
  }
  console.log(antinodes.flat().reduce((acc, n) => acc + n));
}
solve(input, 1);
solve(input, 2);
