const fs = require('fs');

var input = `flqrgnkx`;
var input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();
const listSize = 256;

function getKnotHash(input) {
  const lengths = input
    .split('')
    .map((char) => char.codePointAt(0))
    .concat(17, 31, 73, 47, 23);

  let list = [...Array(listSize).keys()];
  let i = 0;
  let skip = 0;
  for (let round = 1; round <= 64; round++) {
    for (const length of lengths) {
      for (let di = 0; di < ~~(length / 2); di++) {
        const tmp = list[(i + di) % listSize];
        list[(i + di) % listSize] = list[(i + length - 1 - di) % listSize];
        list[(i + length - 1 - di) % listSize] = tmp;
      }
      i += length + skip;
      skip++;
    }
  }
  return [...Array(16).keys()]
    .map((i) => list.slice(16 * i, 16 * (i + 1)).reduce((acc, n) => acc ^ n))
    .flatMap((n) => n.toString(2).padStart(8, '0').split('').map(Number));
}

function solve(input) {
  console.log(input);
  console.log(getKnotHash(`${input}-0`));
  let squares = 0;
  for (let i = 0; i < 128; i++) {
    squares += getKnotHash(`${input}-${i}`).reduce((acc, n) => acc + n);
  }
  console.log(squares)
}
solve(input);
