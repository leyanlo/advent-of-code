const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve(input) {
  let floor = 0;
  let basementPos;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    floor += char === '(' ? 1 : -1;
    if (floor === -1) {
      basementPos = basementPos ?? i + 1;
    }
  }
  console.log(floor);
  console.log(basementPos);
}
solve(input);
