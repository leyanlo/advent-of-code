import { readFileSync } from 'node:fs';

var input = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;
var input = readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function solve(input) {
  const blocks = input.split('\n\n');
  const locks = [];
  const keys = [];
  for (let block of blocks) {
    block = block.split('\n');
    const heights = block[0]
      .split('')
      .map((_, i) => block.filter((line) => line[i] === '#').length - 1);
    if (block[0] === '#####') {
      locks.push(heights);
    } else {
      keys.push(heights);
    }
  }

  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (lock.every((l, i) => l + key[i] <= lock.length)) {
        count++;
      }
    }
  }
  console.log(count);
}
solve(input);
