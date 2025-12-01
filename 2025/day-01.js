import { readFileSync } from 'node:fs';

const input = readFileSync('./day-01-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let dial = 50;
  let nZeros = 0;
  for (let line of input.split('\n')) {
    const dir = line[0] === 'L' ? -1 : 1;
    let amount = parseInt(line.substring(1), 10);
    dial += dir * amount;
    dial %= 100;
    if (dial === 0) {
      nZeros += 1;
    }
  }
  console.log(nZeros);
}
solve1(input);

function solve2(input) {
  let dial = 50;
  let nZeros = 0;
  for (let line of input.split('\n')) {
    const dir = line[0] === 'L' ? -1 : 1;
    let amount = parseInt(line.substring(1), 10);
    for (let i = 0; i < amount; i++) {
      dial += dir;
      if (dial < 0) {
        dial += 100;
      } else if (dial >= 100) {
        dial -= 100;
      }
      if (dial === 0) {
        nZeros += 1;
      }
    }
  }
  console.log(nZeros);
}
solve2(input);
