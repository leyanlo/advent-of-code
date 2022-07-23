const fs = require('fs');

const input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

function solve(input) {
  const registers = {};
  let highestValue = 0;
  for (const line of input.split('\n')) {
    let [b, cmd, delta, , a, cmp, value] = line.split(' ');
    delta = +delta;
    value = +value;
    if (eval(`${registers[a] ?? 0}${cmp}${value}`)) {
      registers[b] = (registers[b] ?? 0) + (cmd === 'inc' ? 1 : -1) * delta;
      highestValue = Math.max(highestValue, registers[b]);
    }
  }
  console.log(Math.max(...Object.values(registers)));
  console.log(highestValue);
}
solve(input);
