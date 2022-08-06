const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function solve(input) {
  const triangles = input
    .split('\n')
    .map((line) => line.trim().split(/\s+/).map(Number));
  let count = 0;
  for (const triangle of triangles) {
    const [a, b, c] = [...triangle].sort((a, b) => a - b);
    if (a + b > c) {
      count++;
    }
  }
  console.log(count);

  count = 0;
  for (let i = 0; i < triangles.length; i += 3) {
    for (let j = 0; j < triangles[i].length; j++) {
      const triangle = triangles.slice(i, i + 3).map((row) => row[j]);
      const [a, b, c] = triangle.sort((a, b) => a - b);
      if (a + b > c) {
        count++;
      }
    }
  }
  console.log(count);
}
solve(input);
