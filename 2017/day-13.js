const fs = require('fs');

const input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function getCaughtMap(ranges, delay) {
  let caughtMap = ranges.map(() => false);
  for (let depth = 0; depth <= ranges.length; depth++) {
    const range = ranges[depth];
    if (!range) {
      continue;
    }
    const tMod = (depth + delay) % (2 * range - 2);
    const pos = Math.min(tMod, 2 * range - 2 - tMod);
    if (!pos) {
      caughtMap[depth] = true;
    }
  }
  return caughtMap;
}

function solve(input) {
  const ranges = input
    .split('\n')
    .map((line) => line.split(': ').map(Number))
    .reduce((acc, [left, right]) => {
      acc[left] = right;
      return acc;
    }, []);
  console.log(
    getCaughtMap(ranges, 0)
      .map((caught, i) => caught * i * ranges[i])
      .reduce((acc, n) => acc + n)
  );

  let delay = 1;
  while (getCaughtMap(ranges, delay).some(Boolean)) {
    delay++;
  }
  console.log(delay);
}
solve(input);
