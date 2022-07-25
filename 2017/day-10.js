const fs = require('fs');

var input = `AoC 2017`,
  listSize = 256;
var input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd(),
  listSize = 256;

// function solve(input, listSize) {
//   const lengths = input.split(',').map(Number);
//   let list = [...Array(listSize).keys()];
//   let i = 0;
//   let skip = 0;
//   for (const length of lengths) {
//     for (let di = 0; di < ~~(length / 2); di++) {
//       const tmp = list[(i + di) % listSize];
//       list[(i + di) % listSize] = list[(i + length - 1 - di) % listSize];
//       list[(i + length - 1 - di) % listSize] = tmp;
//     }
//     i += length + skip;
//     skip++;
//   }
//   console.log(list[0] * list[1]);
// }
// solve(input, listSize);
function solve(input, listSize) {
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
  console.log(list);
  const dense = [...Array(16).keys()].map((i) =>
    list.slice(16 * i, 16 * (i + 1)).reduce((acc, n) => acc ^ n)
  );
  console.log(dense);
  console.log(dense.map((n) => n.toString(16).padStart(2, '0')).join(''));
}
solve(input, listSize);
