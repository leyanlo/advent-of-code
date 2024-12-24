import { readFileSync, writeFileSync } from 'node:fs';
import * as $C from 'js-combinatorics';

var input = `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`;
var input = `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`;
var input = `x00: 0
x01: 1
x02: 0
x03: 1
x04: 0
x05: 1
y00: 0
y01: 0
y02: 1
y03: 1
y04: 0
y05: 1

x00 AND y00 -> z05
x01 AND y01 -> z02
x02 AND y02 -> z01
x03 AND y03 -> z03
x04 AND y04 -> z04
x05 AND y05 -> z00`;
var input = readFileSync('./day-24-input.txt', 'utf8').trimEnd();
// fgt,fqc,jss,krv,mqq,pcp,qcs,z24 wrong
// fgt,jss,krv,mqq,pcp,srn,z24,z32 wrong

// function solve(input) {
//   const [top, bottom] = input.split('\n\n');
//   const map = {};
//   for (const line of top.split('\n')) {
//     const [left, right] = line.split(': ');
//     map[left] = +right;
//   }
//
//   let queue = bottom.split('\n').map((line) => line.split(' '));
//   while (queue.length !== 0) {
//     const nextQueue = [];
//     for (const line of queue) {
//       const [a, op, b, , c] = line;
//       if (map[a] === undefined || map[b] === undefined) {
//         nextQueue.push(line);
//         continue;
//       }
//
//       switch (op) {
//         case 'AND': {
//           map[c] = map[a] & map[b];
//           break;
//         }
//         case 'OR': {
//           map[c] = map[a] | map[b];
//           break;
//         }
//         case 'XOR': {
//           map[c] = map[a] ^ map[b];
//           break;
//         }
//       }
//     }
//     queue = nextQueue;
//   }
//
//   console.log(map);
//   console.log(
//     Object.keys(map)
//       .filter((k) => k[0] === 'z')
//       .sort((a, b) => b.localeCompare(a))
//       .map((k) => map[k])
//       .join('')
//   );
//   console.log(
//     parseInt(
//       Object.keys(map)
//         .filter((k) => k[0] === 'z')
//         .sort((a, b) => b.localeCompare(a))
//         .map((k) => map[k])
//         .join(''),
//       2
//     )
//   );
// }
// solve(input);

/*
{
  x07: [ 'krv', 'jss' ],
  x17: [ 'pcp', 'fgt' ],
  x24: [ 'mqq', 'z24' ],
  x32: [ 'qcs', 'fqc' ],
  y07: [ 'krv', 'jss' ],
  y17: [ 'pcp', 'fgt' ],
  y24: [ 'mqq', 'z24' ],
  y32: [ 'qcs', 'fqc' ]
}

qcs: z32 srn
fqc: pcs

// x06&y06=1 0000000000000000000000000000000000000100000000 ❌
// x23&y23=1 0000000000000000000010000000000000000000000000 ❌
x06&y06: dsw vpk
x23&y23: srm vjv

dsw: btq
vpk: z06 gdb
*/

function swap(c, [a, b]) {
  if (c === a) return b;
  if (c === b) return a;
  return c;
}

function solve(input) {
  let [top, bottom] = input.split('\n\n');

  let bad = ['x07', 'x17', 'x24', 'x32', 'y07', 'y17', 'y24', 'y32'];

  let digraph = ['digraph {'];
  for (const line of bottom.split('\n')) {
    let [a, op, b, , c] = line.split(' ');
    digraph.push(
      `  {${a} ${b}} -> ${c} [label="${op}" color="${
        bad.includes(a) || bad.includes(b) ? '#f00' : '#000'
      }"]`
    );
  }
  digraph.push('}');
  writeFileSync('day-24-orig.dot', digraph.join('\n'));
  // dot -Tsvg day-24.dot > day-24.svg
  // z.. should have an XOR pair, one XORed from x/y and the other ANDed from z-1

  const swaps = [
    // ['krv', 'jss'], // x07
    ['pcp', 'fgt'], // x17
    // ['mqq', 'z24'], // x24
    ['z32', 'srn'], // x32
    // ['dsw', 'vpk'], // x06&y06
    // ['srm', 'vjv'], // x23&y23
    // ['dsw', 'srm'], // x06&y06
    // ['srm', 'vjv'], // x23&y23

    // ['jss','krv']
    ['z24', 'fpq'],
    ['z07', 'nqk'],
  ];

  digraph = ['digraph {'];
  for (const line of bottom.split('\n')) {
    let [a, op, b, , c] = line.split(' ');
    for (const s of swaps) {
      c = swap(c, s);
    }
    digraph.push(
      `  {${a} ${b}} -> ${c} [label="${op}" color="${
        bad.includes(a) || bad.includes(b) ? '#f00' : '#000'
      }"]`
    );
  }
  digraph.push('}');
  writeFileSync('day-24-swapped.dot', digraph.join('\n'));

  for (let i = 0; i < 90; i++) {
    const map = {};
    for (let j = 0; j < 90; j++) {
      const v = j < 45 ? 'x' : 'y';
      map[v + (j % 45).toString().padStart(2, '0')] = +(i === j);
    }

    let queue = bottom.split('\n').map((line) => line.split(' '));
    while (queue.length !== 0) {
      const nextQueue = [];
      for (const line of queue) {
        let [a, op, b, , c] = line;

        for (const s of swaps) {
          c = swap(c, s);
        }

        if (map[a] === undefined || map[b] === undefined) {
          nextQueue.push(line);
          continue;
        }

        switch (op) {
          case 'AND': {
            map[c] = map[a] & map[b];
            break;
          }
          case 'OR': {
            map[c] = map[a] | map[b];
            break;
          }
          case 'XOR': {
            map[c] = map[a] ^ map[b];
            break;
          }
        }
      }
      queue = nextQueue;
    }

    const v = i < 45 ? 'x' : 'y';
    console.log(
      `${v + (i % 45).toString().padStart(2, '0')}=1`,
      Object.keys(map)
        .filter((k) => k[0] === 'z')
        .sort((a, b) => b.localeCompare(a))
        .map((k) => map[k])
        .join(''),
      2 ** (i % 45) ===
        parseInt(
          Object.keys(map)
            .filter((k) => k[0] === 'z')
            .sort((a, b) => b.localeCompare(a))
            .map((k) => map[k])
            .join(''),
          2
        )
        ? '✅ '
        : '❌ '
    );
  }

  for (let i = 0; i < 45; i++) {
    const map = {};
    for (let j = 0; j < 45; j++) {
      map['x' + j.toString().padStart(2, '0')] = +(i === j);
      map['y' + j.toString().padStart(2, '0')] = +(i === j);
    }

    let queue = bottom.split('\n').map((line) => line.split(' '));
    while (queue.length !== 0) {
      const nextQueue = [];
      for (const line of queue) {
        let [a, op, b, , c] = line;

        c = swap(c, ['krv', 'jss']); // x07
        c = swap(c, ['pcp', 'fgt']); // x17
        c = swap(c, ['mqq', 'z24']); // x24
        // c = swap(c, ['qcs', 'fqc']); // x32
        // c = swap(c, ['qcs', 'fqc']); // y32
        // qcs: z32 srn
        // fqc: pcs
        c = swap(c, ['z32', 'srn']);
        false &&
          console.log(
            [
              ['krv', 'jss'],

              ['pcp', 'fgt'],

              ['mqq', 'z24'],

              ['z32', 'srn'],
            ]
              .flat()
              .sort()
              .join()
          );

        if (map[a] === undefined || map[b] === undefined) {
          nextQueue.push(line);
          continue;
        }

        switch (op) {
          case 'AND': {
            map[c] = map[a] & map[b];
            break;
          }
          case 'OR': {
            map[c] = map[a] | map[b];
            break;
          }
          case 'XOR': {
            map[c] = map[a] ^ map[b];
            break;
          }
        }
      }
      queue = nextQueue;
    }

    const num = (i % 45).toString().padStart(2, '0');
    console.log(
      `x${num}&y${num}=1`,
      Object.keys(map)
        .filter((k) => k[0] === 'z')
        .sort((a, b) => b.localeCompare(a))
        .map((k) => map[k])
        .join(''),
      2 ** (i + 1) ===
        parseInt(
          Object.keys(map)
            .filter((k) => k[0] === 'z')
            .sort((a, b) => b.localeCompare(a))
            .map((k) => map[k])
            .join(''),
          2
        )
        ? '✅ '
        : '❌ '
    );
  }

  console.log(swaps.flat().sort().join());
}
solve(input);

// x07=1 0000000000000000000000000000000000000100000000 ❌
// x17=1 0000000000000000000000000001000000000000000000 ❌
// x24=1 0000000000000000000010000000000000000000000000 ❌
// x32=1 0000000000001000000000000000000000000000000000 ❌
// y07=1 0000000000000000000000000000000000000100000000 ❌
// y17=1 0000000000000000000000000001000000000000000000 ❌
// y24=1 0000000000000000000010000000000000000000000000 ❌
// y32=1 0000000000001000000000000000000000000000000000 ❌

/*
x24 AND y24 -> z24
y24 XOR x24 -> mqq
* */
