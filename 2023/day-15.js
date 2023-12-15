import { readFileSync } from 'node:fs';

const input = readFileSync('./day-15-input.txt', 'utf8').trimEnd();

function hash(str) {
  let val = 0;
  for (const char of str) {
    val += char.codePointAt(0);
    val *= 17;
    val %= 256;
  }
  return val;
}

function solve1(input) {
  let sum = 0;
  for (const step of input.split(',')) {
    sum += hash(step);
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  const map = [...Array(256)].map(() => ({}));
  for (const step of input.split(',')) {
    let [, label, op, len] = step.match(/(\w+)([-=])(\d*)/);
    len = +len;
    const box = hash(label);
    if (op === '=') {
      map[box][label] = len;
    } else {
      delete map[box][label];
    }
  }

  let sum = 0;
  for (let box = 0; box < map.length; box++) {
    const lengths = Object.values(map[box]);
    for (let slot = 0; slot < lengths.length; slot++) {
      sum += (box + 1) * (slot + 1) * lengths[slot];
    }
  }
  console.log(sum);
}
solve2(input);
