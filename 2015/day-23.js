const fs = require('fs');

const input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const registers = { a: part === 1 ? 0 : 1, b: 0 };
  const instructions = input.split('\n').map((line) => {
    const cmd = line.substring(0, 3);
    const [r] = line.match(/[ab]/) ?? [];
    const [offset] = line.match(/[+-]\d+/) ?? [];
    return { cmd, r, offset: offset && +offset };
  });
  for (let i = 0; i >= 0 && i < instructions.length; i++) {
    const { cmd, r, offset } = instructions[i];
    switch (cmd) {
      case 'hlf': // r sets register r to half its current value, then continues with the next instruction.
        registers[r] /= 2;
        break;
      case 'tpl': // r sets register r to triple its current value, then continues with the next instruction.
        registers[r] *= 3;
        break;
      case 'inc': // r increments register r, adding 1 to it, then continues with the next instruction.
        registers[r]++;
        break;
      case 'jmp': // offset is a jump; it continues with the instruction offset away relative to itself.
        i += offset - 1;
        break;
      case 'jie': // r, offset is like jmp, but only jumps if register r is even ("jump if even").
        if (registers[r] % 2 === 0) {
          i += offset - 1;
        }
        break;
      case 'jio': // r, offset is like jmp, but only jumps if register r is 1 ("jump if one", not odd).
        if (registers[r] === 1) {
          i += offset - 1;
        }
        break;
    }
  }
  console.log(registers.b);
}
solve(input, 1);
solve(input, 2);
