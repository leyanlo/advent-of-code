const fs = require('fs');

const input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'number') {
    a = [a];
  } else if (typeof b === 'number') {
    b = [b];
  }

  for (let i = 0; i < a.length; i++) {
    if (b[i] === undefined) {
      return 1;
    }
    const c = compare(a[i], b[i]);
    if (c !== 0) {
      return c;
    }
  }

  return a.length === b.length ? 0 : -1;
}

function solve1(input) {
  const pairs = input
    .split('\n\n')
    .map((pair) => pair.split('\n').map(JSON.parse));
  const corrects = pairs.map(([a, b]) => +(compare(a, b) <= 0));
  console.log(
    corrects.map((correct, i) => correct * (i + 1)).reduce((acc, n) => acc + n)
  );
}
solve1(input);

function solve2(input) {
  const dividers = [[[2]], [[6]]];
  const packets = input
    .split('\n\n')
    .map((pair) => pair.split('\n').map(JSON.parse))
    .flat()
    .concat(dividers)
    .sort(compare);
  console.log(
    dividers.map((d) => packets.indexOf(d) + 1).reduce((acc, n) => acc * n)
  );
}
solve2(input);
