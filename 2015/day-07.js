const fs = require('fs');

var input = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input) {
  const wires = {};
  function get(s) {
    return /\d+/.test(s) ? +s : wires[s];
  }

  const instructions = input.split('\n').sort();
  while (instructions.length) {
    const instruction = instructions.shift();
    const [left, right] = instruction.split(' -> ');
    const [cmd] = left.match(/[A-Z]+/) ?? [];
    const [x, y] = left.split(/ ?[A-Z]+ /).map(get);

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
  console.log(wires.a);
}
solve(input);
