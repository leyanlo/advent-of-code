const fs = require('fs');

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();
const listSize = 256;

function solve1(input, listSize) {
  const lengths = input.split(',').map(Number);
  let list = [...Array(listSize).keys()];
  let i = 0;
  let skip = 0;
  for (const length of lengths) {
    for (let di = 0; di < ~~(length / 2); di++) {
      const tmp = list[(i + di) % listSize];
      list[(i + di) % listSize] = list[(i + length - 1 - di) % listSize];
      list[(i + length - 1 - di) % listSize] = tmp;
    }
    i += length + skip;
    skip++;
  }
  console.log(list[0] * list[1]);
}
solve1(input, listSize);

function solve2(input, listSize) {
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
  const dense = [...Array(16).keys()].map((i) =>
    list.slice(16 * i, 16 * (i + 1)).reduce((acc, n) => acc ^ n)
  );
  console.log(dense.map((n) => n.toString(16).padStart(2, '0')).join(''));
}
solve2(input, listSize);
