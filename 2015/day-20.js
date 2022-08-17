const fs = require('fs');

const input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function factor(n) {
  const factors = new Set([1, n]);
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.add(i);
      factors.add(n / i);
    }
  }
  return [...factors];
}

function factor2(n) {
  const factors = new Set([n]);
  if (n <= 50) {
    factors.add(1);
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      if (i <= 50) {
        factors.add(n / i);
      }
      if (n / i <= 50) {
        factors.add(i);
      }
    }
  }
  return [...factors];
}

function solve(input) {
  let n = 0;
  let part1 = null;
  let part2 = null;
  while (!part1 || !part2) {
    n++;
    if (10 * factor(n).reduce((acc, n) => acc + n) >= +input) {
      part1 = part1 ?? n;
    }
    if (11 * factor2(n).reduce((acc, n) => acc + n) >= +input) {
      part2 = part2 ?? n;
    }
  }
  console.log(part1);
  console.log(part2);
}
solve(input);
