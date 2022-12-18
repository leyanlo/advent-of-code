const fs = require('fs');

const input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function solve(input) {
  const instructions = input.split('\n').map((line) => line.split(' '));
  const registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  };
  let mulCount = 0;
  for (let i = 0; i >= 0 && i < instructions.length; i++) {
    let [cmd, x, y] = instructions[i];
    y = /[a-h]/.test(y) ? registers[y] : +y;
    switch (cmd) {
      case 'set': // sets register X to the value of Y.
        registers[x] = y;
        break;
      case 'sub': // decreases register X by the value of Y.
        registers[x] -= y;
        break;
      case 'mul': // sets register X to the result of multiplying the value contained in register X by the value of Y.
        registers[x] *= y;
        mulCount++;
        break;
      case 'jnz': // jumps with an offset of the value of Y, but only if the value of X is not zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
        x = /[a-h]/.test(x) ? registers[x] : +x;
        if (x !== 0) {
          i += y - 1;
        }
        break;
    }
  }
  console.log(mulCount);
}
solve(input);

function solve2(input) {
  const registers = {
    a: 1,
    b: +input.split('\n')[0].split(' ')[2],
    c: 0,
    d: 0,
    f: 0,
    g: 0,
    h: 0,
  };
  registers.b = registers.b * 100 + 100000;
  registers.c = registers.b + 17000;
  do {
    registers.f = 1;
    registers.d = 2;
    for (let d = registers.d; d ** 2 < registers.b; d++) {
      if (registers.b % d === 0) {
        registers.f = 0;
        break;
      }
    }
    if (registers.f === 0) {
      registers.h++;
    }
    registers.g = registers.b - registers.c;
    registers.b += 17;
  } while (registers.g !== 0);

  console.log(registers.h);
}
solve2(input);
