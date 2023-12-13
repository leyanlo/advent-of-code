import { readFileSync } from 'node:fs';

const input = readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function transpose(map) {
  return map[0].map((_, j) => map.map((_, i) => map[i][j]));
}

function getErrors(a, b) {
  let n = a ^ b;
  let count = 0;
  do {
    count += n & 1;
  } while ((n >>= 1));
  return count;
}

function getReflection(map, maxErrors) {
  outer: for (let i = 0; i < map.length - 1; i++) {
    let nErrors = getErrors(map[i], map[i + 1]);
    if (nErrors <= maxErrors) {
      for (let j = i - 1; j >= 0; j--) {
        const delta = i - j;
        if (!map[j] || !map[i + 1 + delta]) {
          break;
        }
        nErrors += getErrors(map[j], map[i + 1 + delta]);
        if (nErrors > maxErrors) {
          continue outer;
        }
      }
      if (nErrors === maxErrors) {
        return i + 1;
      }
    }
  }
  return 0;
}

function solve(input, maxErrors) {
  let sum = 0;
  for (let map of input.split('\n\n')) {
    map = map.split('\n').map((row) => row.split(''));
    let rot = transpose(map);

    map = map.map((row) =>
      parseInt(row.map((char) => +(char === '#')).join(''), 2)
    );
    rot = rot.map((row) =>
      parseInt(row.map((char) => +(char === '#')).join(''), 2)
    );

    const hReflect = getReflection(map, maxErrors);
    const vReflect = getReflection(rot, maxErrors);
    sum += hReflect * 100;
    sum += vReflect;
  }
  console.log(sum);
}
solve(input, 0);
solve(input, 1);
