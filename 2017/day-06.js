const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input) {
  const banks = input.split('\t').map(Number);
  const seen = [];
  let i = 0;
  while (!seen.includes(banks.join())) {
    seen.push(banks.join());
    const max = Math.max(...banks);
    let j = banks.indexOf(max);
    banks[j] = 0;
    for (let k = 0; k < max; k++) {
      j = (j + 1) % banks.length;
      banks[j]++;
    }
    i++;
  }
  console.log(i);
  console.log(seen.length - seen.indexOf(banks.join()));
}
solve(input);
