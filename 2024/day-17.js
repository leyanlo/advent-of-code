import { readFileSync } from 'node:fs';

var input = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;
var input = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;
var input = readFileSync('./day-17-input.txt', 'utf8').trimEnd();

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

const instr = [
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
    if (a === 0) {
      return;
    }

    return operand;
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

// function solve(input) {
//   const [a, b, c, ...program] = input.match(/\d+/g).map(Number);
//   const registers = [a, b, c];
//   let p = 0;
//   const out = [];
//   while (p < program.length - 1) {
//     p = instr[program[p]](registers, program[p + 1], out) ?? p + 2;
//   }
//   console.log(out.join());
// }
// solve(input);

function run([a, b, c, program]) {
  const registers = [a, b, c];
  let p = 0;
  const out = [];
  while (p < program.length - 1) {
    p = instr[program[p]](registers, program[p + 1], out) ?? p + 2;
  }
  return out;
}

function solve(input) {
  const [, b, c, ...program] = input.match(/\d+/g).map(Number);
  let minA = Number.MAX_SAFE_INTEGER;

  function dfs(depth = 0, a = 0) {
    if (depth === program.length) {
      minA = Math.min(minA, a);
      return;
    }

    for (let i = 0; i < 8; i++) {
      const nextA = 8 * a + i;
      const out = run([nextA, b, c, program]);
      if (out[0] === program.at(-1 - depth)) {
        dfs(depth + 1, nextA);
      }
    }
  }

  dfs();
  console.log(minA);
}
solve(input);
