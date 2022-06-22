const fs = require('fs');

const input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

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

function getFactors(n) {
  const factors = [1];
  let dividend = n;
  let divisor = 2;
  while (dividend >= 2) {
    if (dividend % divisor) {
      divisor++;
    } else {
      factors.push(divisor);
      dividend /= divisor;
    }
  }
  factors.push(n);
  return factors;
}

function solve(input, part) {
  let [ipr, ...lines] = input.split('\n');
  ipr = +ipr.match(/\d/)[0];
  lines = lines.map((line) => {
    let [opcode, a, b, c] = line.split(' ');
    [a, b, c] = [a, b, c].map(Number);
    return { opcode, a, b, c };
  });
  const registers = Array(6).fill(0);
  part === 2 && (registers[0] = 1);
  let ip = registers[ipr];
  while (ip !== 1) {
    const { opcode, a, b, c } = lines[ip];
    registers[ipr] = ip;
    opcodes[opcode](registers, a, b, c);
    ip = registers[ipr] + 1;
  }
  console.log(getFactors(registers[5]).reduce((acc, n) => acc + n));
}
solve(input, 1);
solve(input, 2);
