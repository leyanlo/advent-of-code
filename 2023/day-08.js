const fs = require('fs');

var input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
var input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
var input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
var input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   let [instr, lines] = input.split('\n\n');
//   instr = instr.split('').map((char) => +(char === 'R'));
//   const map = {};
//   for (const line of lines.split('\n')) {
//     let [left, right] = line.split(' = ');
//     right = right.match(/\w+/g);
//     map[left] = right;
//   }
//   console.log(map);
//
//   let curr = 'AAA';
//   let i = 0;
//   while (curr !== 'ZZZ') {
//     curr = map[curr][instr[i++ % instr.length]];
//   }
//   console.log(i);
// }
// solve(input);
// function solve(input) {
//   console.log(input);
//   let [instr, lines] = input.split('\n\n');
//   instr = instr.split('').map((char) => +(char === 'R'));
//   const map = {};
//   for (const line of lines.split('\n')) {
//     let [left, right] = line.split(' = ');
//     right = right.match(/\w+/g);
//     map[left] = right;
//   }
//   console.log(map);
//
//   let curr = Object.keys(map).filter((key) => key.endsWith('A'));
//   let i = 0;
//   while (curr.some((key) => !key.endsWith('Z'))) {
//     // console.log('step', i, curr);
//     for (let j = 0; j < curr.length; j++) {
//       const key = curr[j];
//       curr[j] = map[key][instr[i % instr.length]];
//     }
//     i++;
//   }
//   // console.log('step', i, curr);
//   console.log(i);
// }
// solve(input);
function solve(input) {
  console.log(input);
  let [instr, lines] = input.split('\n\n');
  instr = instr.split('').map((char) => +(char === 'R'));
  const map = {};
  for (const line of lines.split('\n')) {
    let [left, right] = line.split(' = ');
    right = right.match(/\w+/g);
    map[left] = right;
  }
  console.log(map);

  let curr = Object.keys(map).filter((key) => key.endsWith('A'));
  let i = 0;
  const loopLens = curr.map(() => null);
  while (!loopLens.every(Boolean)) {
    for (let j = 0; j < curr.length; j++) {
      const key = curr[j];
      if (loopLens[j]) continue;

      if (key.endsWith('Z')) {
        loopLens[j] = i;
        continue;
      }

      curr[j] = map[key][instr[i % instr.length]];
    }
    i++;
  }
  console.log(loopLens);
  console.log(lcm(...loopLens));
}
solve(input);

function gcd(...nums) {
  function _gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }
  return nums.reduce((acc, n) => _gcd(acc, n));
}

function lcm(...nums) {
  return nums.reduce((acc, n) => (acc * n) / gcd(acc, n));
}
