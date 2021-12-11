const fs = require('fs');

const input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function incrementOne(energies, i, j) {
  let count = 0;
  energies[i][j]++;
  if (energies[i][j] === 10) {
    count++;
    for (const [di, dj] of dirs) {
      if (energies[i + di]?.[j + dj] === undefined) {
        continue;
      }
      count += incrementOne(energies, i + di, j + dj);
    }
  }
  return count;
}

function incrementAll(energies) {
  let count = 0;
  for (let i = 0; i < energies.length; i++) {
    for (let j = 0; j < energies[i].length; j++) {
      count += incrementOne(energies, i, j);
    }
  }
  for (let i = 0; i < energies.length; i++) {
    for (let j = 0; j < energies[i].length; j++) {
      energies[i][j] = Math.min(energies[i][j], 10) % 10;
    }
  }
  return count;
}

function solve1(input) {
  const energies = input.split('\n').map((line) => line.split('').map(Number));
  let count = 0;
  for (let step = 0; step < 100; step++) {
    count += incrementAll(energies);
  }
  console.log(count);
}
solve1(input);

function solve2(input) {
  const energies = input.split('\n').map((line) => line.split('').map(Number));
  let step = 0;
  while (!energies.every((line) => line.every((energy) => energy === 0))) {
    step++;
    incrementAll(energies);
  }
  console.log(step);
}
solve2(input);
