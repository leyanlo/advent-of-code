import { readFileSync } from 'node:fs';

var input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
var input = readFileSync('./day-15-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   const cmds = input.split(',');
//   let sum = 0;
//   for (let cmd of cmds) {
//     let val = 0;
//     for (const char of cmd) {
//       val += char.codePointAt(0);
//       val *= 17;
//       val %= 256;
//     }
//     sum += val;
//   }
//   console.log(sum);
// }
// solve(input);

function hash(key) {
  let val = 0;
  for (const char of key) {
    val += char.codePointAt(0);
    val *= 17;
    val %= 256;
  }
  return val;
}

function solve(input) {
  console.log(input);
  const map = {};
  const cmds = input.split(',');
  for (const cmd of cmds) {
    const op = cmd.match(/[-=]/g)[0];
    let [key, val] = cmd.split(op);
    val = +val;
    const h = hash(key);
    const l = { key, val };
    if (op === '=') {
      map[h] ??= [];
      const i = map[h].findIndex((lens) => lens.key === key);
      if (i !== -1) {
        map[h][i] = l;
      } else {
        map[h].push(l);
      }
    } else {
      const i = map[h]?.findIndex((lens) => lens.key === key);
      if (map[h] && i !== -1) {
        map[h].splice(i, 1);
      }
    }
  }
  console.log(map);

  let sum = 0;
  for (let box in map) {
    box = +box;
    for (let slot = 0; slot < map[box].length; slot++) {
      sum += (box + 1) * (slot + 1) * map[box][slot].val;
    }
  }
  console.log(sum);
}
solve(input);
