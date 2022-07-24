const fs = require('fs');

var input = `3,4,1,5`,
  listSize = 5;
var input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd(),
  listSize = 256;

function solve(input, listSize) {
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
solve(input, listSize);
