import { readFileSync } from 'node:fs';

const input = readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input) {
  const shapes = input
    .split('\n\n')
    .slice(0, -1)
    .map((lines) =>
      lines
        .split('\n')
        .slice(1)
        .map((line) => line.split('').map((c) => (c === '#' ? 1 : 0)))
    );
  const shapeAreas = shapes.map((shape) =>
    shape.flat().reduce((acc, n) => acc + n, 0)
  );
  const regions = input
    .split('\n\n')
    .at(-1)
    .split('\n')
    .map((line) => {
      const [w, h, ...shapeCounts] = line.matchAll(/\d+/g).map((m) => +m);
      return { w, h, shapeCounts };
    });

  let count = 0;
  for (const { w, h, shapeCounts } of regions) {
    const regionArea = w * h;
    const shapesArea = shapeCounts.reduce(
      (acc, c, i) => acc + shapeAreas[i] * c,
      0
    );
    count += shapesArea <= regionArea;
  }
  console.log(count);
}

solve(input);
