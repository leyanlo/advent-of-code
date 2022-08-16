const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

const toDir = {
  '^': [-1, 0],
  v: [1, 0],
  '<': [0, -1],
  '>': [0, 1],
};

function solve1(input) {
  let [y, x] = [0, 0];
  const houses = new Set(['0,0']);
  for (const char of input.split('')) {
    const [dy, dx] = toDir[char];
    y += dy;
    x += dx;
    houses.add([x, y].join());
  }
  console.log(houses.size);
}
solve1(input);

function solve2(input) {
  let [y, x] = [
    [0, 0],
    [0, 0],
  ];
  const houses = new Set(['0,0']);
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const [dy, dx] = toDir[char];
    y[i % 2] += dy;
    x[i % 2] += dx;
    houses.add([x[i % 2], y[i % 2]].join());
  }
  console.log(houses.size);
}
solve2(input);
