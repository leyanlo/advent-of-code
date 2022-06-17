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

// function solve(input) {
//   const part1 = input.split('\n\n\n')[0];
//   const samples = part1.split('\n\n');
//   let count = 0;
//   for (const sample of samples) {
//     let [before, instr, after] = sample.split('\n');
//     before = before.match(/\d+/g).map(Number);
//     instr = instr.split(' ').map(Number);
//     after = after.match(/\d+/g).map(Number);
//     console.log(before, instr, after);
//     const possibles = Object.keys(opcodes).filter((opcode) => {
//       const test = [...before];
//       opcodes[opcode](test, ...instr.slice(1));
//       return test.join() === after.join();
//     });
//     count += possibles.length >= 3;
//   }
//   console.log(count);
// }
// solve(input);
function solve(input) {
  const [part1, part2] = input.split('\n\n\n');
  const samples = part1.split('\n\n');
  const map = {};
  for (const sample of samples) {
    let [before, instr, after] = sample.split('\n');
    before = before.match(/\d+/g).map(Number);
    instr = instr.split(' ').map(Number);
    after = after.match(/\d+/g).map(Number);
    const possibles = Object.keys(opcodes).filter((opcode) => {
      const test = [...before];
      opcodes[opcode](test, ...instr.slice(1));
      return test.join() === after.join();
    });
    const opcode = instr[0];
    map[opcode] = (map[opcode] ?? Object.keys(opcodes)).filter((o) =>
      possibles.includes(o)
    );
  }
  console.log(map);
  while (
    Object.values(map).filter((possibles) => possibles.length > 1).length
  ) {
    for (const key1 in map) {
      if (map[key1].length === 1) {
        const opcode = map[key1][0];
        for (const key2 in map) {
          if (key2 === key1) continue;
          const i = map[key2].indexOf(opcode);
          if (i > -1) {
            map[key2].splice(i, 1);
          }
        }
      }
    }
  }
  for (const key in map) {
    map[key] = map[key][0];
  }
  console.log(map);

  console.log(part2.split('\n'));
  const registers = [0, 0, 0, 0];
  for (const line of part2.split('\n')) {
    const [opcode, a, b, c] = line.split(' ').map(Number);
    opcodes[map[opcode]](registers, a, b, c);
  }
  console.log(registers[0]);
}
solve(input);
