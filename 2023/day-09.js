const fs = require('fs');

const input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    let curr = line.match(/[-\d]+/g).map(Number);
    const rows = [curr];
    while (curr.some(Boolean)) {
      const next = [];
      for (let i = 0; i < curr.length - 1; i++) {
        next.push(curr[i + 1] - curr[i]);
      }
      curr = next;
      rows.push(next);
    }
    let carry = 0;
    for (let i = rows.length - 2; i >= 0; i--) {
      carry += rows[i].at(-1);
    }
    sum += carry;
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    let curr = line.match(/[-\d]+/g).map(Number);
    const rows = [curr];
    while (curr.some(Boolean)) {
      const next = [];
      for (let i = 0; i < curr.length - 1; i++) {
        next.push(curr[i + 1] - curr[i]);
      }
      curr = next;
      rows.push(next);
    }
    let carry = 0;
    for (let i = rows.length - 2; i >= 0; i--) {
      carry = rows[i][0] - carry;
    }
    sum += carry;
  }
  console.log(sum);
}
solve2(input);
