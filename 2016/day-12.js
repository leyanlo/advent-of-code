const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const registers = {
    a: 0,
    b: 0,
    c: +(part === 2),
    d: 0,
  };
  function get(n) {
    return /[a-d]/.test(n) ? registers[n] : +n;
  }
  const instructions = input.split('\n');
  for (let i = 0; i < instructions.length; i++) {
    let [cmd, x, y] = instructions[i].split(' ');
    switch (cmd) {
      case 'cpy': // x y copies x (either an integer or the value of a register) into register y.
        registers[y] = get(x);
        break;
      case 'inc': // x increases the value of register x by one.
        registers[x]++;
        break;
      case 'dec': // x decreases the value of register x by one.
        registers[x]--;
        break;
      case 'jnz': // x y jumps to an instruction y away (positive means forward; negative means backward), but only if x is not zero.
        if (get(x) !== 0) {
          i += get(y) - 1;
        }
        break;
    }
  }
  console.log(registers.a);
}
solve(input, 1);
solve(input, 2);
