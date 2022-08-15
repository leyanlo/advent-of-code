const fs = require('fs');

var input = `cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`;
var input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function solve(input) {
  const registers = {
    a: 7,
    b: 0,
    c: 0,
    d: 0,
  };
  function get(n) {
    return /[a-d]/.test(n) ? registers[n] : +n;
  }
  const instructions = input.split('\n').map((line) => line.split(' '));
  for (let i = 0; i < instructions.length; i++) {
    let [cmd, x, y] = instructions[i];
    switch (cmd) {
      case 'cpy': // x y copies x (either an integer or the value of a register) into register y.
        registers[y] !== undefined && (registers[y] = get(x));
        break;
      case 'inc': // x increases the value of register x by one.
        registers[x] !== undefined && registers[x]++;
        break;
      case 'dec': // x decreases the value of register x by one.
        registers[x] !== undefined && registers[x]--;
        break;
      case 'jnz': // x y jumps to an instruction y away (positive means forward; negative means backward), but only if x is not zero.
        if (get(x) !== 0) {
          i += get(y) - 1;
        }
        break;
      case 'tgl': // x toggles the instruction x away (pointing at instructions like jnz does: positive means forward; negative means backward):
        x = i + get(x);
        if (!instructions[x]) {
          break;
        }
        cmd = instructions[x][0];
        if (!instructions[x][2]) {
          instructions[x][0] = cmd === 'inc' ? 'dec' : 'inc';
        } else {
          instructions[x][0] = cmd === 'jnz' ? 'cpy' : 'jnz';
        }
        break;
    }
  }
  console.log(registers.a);
}
solve(input);
