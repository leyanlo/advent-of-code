const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function run(input, override) {
  const wires = {};
  function get(s) {
    return /\d+/.test(s) ? +s : wires[s];
  }

  const instructions = input.split('\n').sort();
  while (instructions.length) {
    const instruction = instructions.shift();
    const [left, right] = instruction.split(' -> ');
    const [cmd] = left.match(/[A-Z]+/) ?? [];
    let [x, y] = left.split(/ ?[A-Z]+ /).map(get);
    if (override && right === 'b') {
      x = override;
    }

    switch (cmd) {
      case 'AND':
        if (typeof x === 'undefined' || typeof y === 'undefined') {
          break;
        }
        wires[right] = x & y;
        continue;
      case 'OR':
        if (typeof x === 'undefined' || typeof y === 'undefined') {
          break;
        }
        wires[right] = x | y;
        continue;
      case 'NOT':
        if (typeof y === 'undefined') {
          break;
        }
        wires[right] = (2 << 15) + ~y;
        continue;
      case 'LSHIFT':
        if (typeof x === 'undefined') {
          break;
        }
        wires[right] = x << y;
        continue;
      case 'RSHIFT':
        if (typeof x === 'undefined') {
          break;
        }
        wires[right] = x >> y;
        continue;
      default:
        if (typeof x === 'undefined') {
          break;
        }
        wires[right] = x;
        continue;
    }
    instructions.push(instruction);
  }
  return wires.a;
}
function solve(input) {
  const result = run(input);
  console.log(result);
  console.log(run(input, result));
}
solve(input);
