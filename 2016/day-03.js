const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function solve(input) {
  const triangles = input
    .split('\n')
    .map((line) => line.trim().split(/\s+/).map(Number));
  console.log(triangles);
  let count = 0;
  for (const triangle of triangles) {
    const [a, b, c] = triangle.sort((a, b) => a - b);
    if (a + b > c) {
      count++;
    }
  }
  console.log(count);
}
solve(input);
