import { readFileSync } from 'node:fs';

const input = readFileSync('./day-15-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let [a, b] = input.split('\n').map((line) => +line.match(/\d+/g)[0]);
  let nMatches = 0;
  for (let i = 0; i < 40000000; i++) {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;
    nMatches += a % 65536 === b % 65536;
  }
  console.log(nMatches);
}
solve1(input);

function solve2(input) {
  let [a, b] = input.split('\n').map((line) => +line.match(/\d+/g)[0]);
  let nMatches = 0;
  for (let i = 0; i < 5000000; i++) {
    a = (a * 16807) % 2147483647;
    while (a % 4 !== 0) {
      a = (a * 16807) % 2147483647;
    }
    b = (b * 48271) % 2147483647;
    while (b % 8 !== 0) {
      b = (b * 48271) % 2147483647;
    }
    nMatches += a % 65536 === b % 65536;
  }
  console.log(nMatches);
}
solve2(input);
