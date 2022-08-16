const fs = require('fs');

const input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();

function solve(input) {
  const list = input.split('\n').map((line) => line.split('x').map(Number));
  console.log(
    list
      .map(
        ([l, w, h]) =>
          2 * l * w +
          2 * w * h +
          2 * h * l +
          [l, w, h]
            .sort((a, b) => a - b)
            .slice(0, 2)
            .reduce((acc, n) => acc * n)
      )
      .reduce((acc, n) => acc + n)
  );
  console.log(
    list
      .map(
        ([l, w, h]) =>
          l * w * h +
          [l, w, h]
            .sort((a, b) => a - b)
            .slice(0, 2)
            .reduce((acc, n) => acc + 2 * n, 0)
      )
      .reduce((acc, n) => acc + n)
  );
}
solve(input);
