import { readFileSync } from 'node:fs';

const input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

function combo(registers, operand) {
  const [a, b, c] = registers;
  switch (operand) {
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
    case 7:
      throw new Error('7 is reserved');
    default:
      return operand;
  }
}

function xor(a, b) {
  return Number(BigInt(a) ^ BigInt(b));
}

const INSTR = [
  // adv
  (registers, operand, out) => {
    const [a, b, c] = registers;
    registers[0] = Math.floor(a / 2 ** combo(registers, operand));
  },

  // bxl
  (registers, operand, out) => {
    const [a, b, c] = registers;
    registers[1] = xor(b, operand);
  },

  // bst
  (registers, operand, out) => {
    registers[1] = combo(registers, operand) % 8;
  },

  // jnz
  (registers, operand, out) => {
    const [a, b, c] = registers;
    return a === 0 ? undefined : operand;
  },

  // bxc
  (registers, operand, out) => {
    const [a, b, c] = registers;
    registers[1] = xor(b, c);
  },

  // out
  (registers, operand, out) => {
    out.push(combo(registers, operand) % 8);
  },

  // bdv
  (registers, operand, out) => {
    const [a, b, c] = registers;
    registers[1] = Math.floor(a / 2 ** combo(registers, operand));
  },

  // cdv
  (registers, operand, out) => {
    const [a, b, c] = registers;
    registers[2] = Math.floor(a / 2 ** combo(registers, operand));
  },
];

function run([a, b, c, program]) {
  const registers = [a, b, c];
  let p = 0;
  const out = [];
  while (p < program.length - 1) {
    const f = INSTR[program[p]];
    p = f(registers, program[p + 1], out) ?? p + 2;
  }
  return out;
}

function solve1(input) {
  const [a, b, c, ...program] = input.match(/\d+/g).map(Number);
  const out = run([a, b, c, program]);
  console.log(out.join());
}
solve1(input);

function solve2(input) {
  const [, b, c, ...program] = input.match(/\d+/g).map(Number);

  let aValues = [0];
  for (let i = 0; i < program.length; i++) {
    const nextAValues = [];
    for (const a of aValues) {
      for (let j = 0; j < 8; j++) {
        const nextA = 8 * a + j;
        const out = run([nextA, b, c, program]);
        if (out[0] === program.at(-1 - i)) {
          nextAValues.push(nextA);
        }
      }
    }
    aValues = nextAValues;
  }
  console.log(Math.min(...aValues));
}
solve2(input);
