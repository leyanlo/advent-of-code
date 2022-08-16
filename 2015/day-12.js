const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function sum(obj) {
  const values = Object.values(obj);
  if (values.includes('red') && !Array.isArray(obj)) {
    return 0;
  }

  return values
    .map((v) =>
      typeof v === 'number' ? v : typeof v === 'object' ? sum(v) : 0
    )
    .reduce((acc, n) => acc + n);
}

function solve(input) {
  console.log(
    input
      .match(/-?\d+/g)
      .map(Number)
      .reduce((acc, n) => acc + n)
  );
  console.log(sum(JSON.parse(input)));
}
solve(input);
