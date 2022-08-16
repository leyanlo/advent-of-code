const fs = require('fs');

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

function solve(input, times) {
  let sequence = input.split('').map(Number);
  for (let i = 0; i < times; i++) {
    const nextSequence = [];
    let count = 1;
    for (let j = 1; j < sequence.length; j++) {
      const prev = sequence[j - 1];
      const curr = sequence[j];
      if (curr === prev) {
        count++;
        continue;
      }
      nextSequence.push(count, prev);
      count = 1;
    }
    nextSequence.push(count, sequence[sequence.length - 1]);
    sequence = nextSequence;
  }
  console.log(sequence.length);
}
solve(input, 40);
solve(input, 50);
