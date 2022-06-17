const fs = require('fs');

var input = `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`;
var input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

const opcodes = {
  addr: (r, a, b, c) => {
    r[c] = r[a] + r[b];
  },
  addi: (r, a, b, c) => {
    r[c] = r[a] + b;
  },
  mulr: (r, a, b, c) => {
    r[c] = r[a] * r[b];
  },
  muli: (r, a, b, c) => {
    r[c] = r[a] * b;
  },
  banr: (r, a, b, c) => {
    r[c] = r[a] & r[b];
  },
  bani: (r, a, b, c) => {
    r[c] = r[a] & b;
  },
  borr: (r, a, b, c) => {
    r[c] = r[a] | r[b];
  },
  bori: (r, a, b, c) => {
    r[c] = r[a] | b;
  },
  setr: (r, a, b, c) => {
    r[c] = r[a];
  },
  seti: (r, a, b, c) => {
    r[c] = a;
  },
  gtir: (r, a, b, c) => {
    r[c] = +(a > r[b]);
  },
  gtri: (r, a, b, c) => {
    r[c] = +(r[a] > b);
  },
  gtrr: (r, a, b, c) => {
    r[c] = +(r[a] > r[b]);
  },
  eqir: (r, a, b, c) => {
    r[c] = +(a === r[b]);
  },
  eqri: (r, a, b, c) => {
    r[c] = +(r[a] === b);
  },
  eqrr: (r, a, b, c) => {
    r[c] = +(r[a] === r[b]);
  },
};

function solve(input) {
  const part1 = input.split('\n\n\n')[0];
  const samples = part1.split('\n\n');
  let count = 0;
  for (const sample of samples) {
    let [before, instr, after] = sample.split('\n');
    before = before.match(/\d+/g).map(Number);
    instr = instr.split(' ').map(Number);
    after = after.match(/\d+/g).map(Number);
    console.log(before, instr, after);
    const possibles = Object.keys(opcodes).filter((opcode) => {
      const test = [...before];
      opcodes[opcode](test, ...instr.slice(1));
      return test.join() === after.join();
    });
    count += possibles.length >= 3;
  }
  console.log(count);
}
solve(input);
