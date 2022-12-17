const fs = require('fs');

var input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
var input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd();
// 2616 too low

const shapes = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
  .split('\n\n')
  .map((shape) =>
    shape.split('\n').map((line) =>
      line
        .split('')
        .map((char) => +(char === '#'))
        .join('')
    )
  )
  .map((lines) => [lines[0].length, lines.map((line) => parseInt(line, 2))]);
// console.log(shapes);

function solve(input) {
  // console.log(input);
  let charIdx = 0;
  let bottom = -1;
  const chamber = [];
  for (let i = 0; i < 2022; i++) {
    const [width, shape] = shapes[i % shapes.length];
    let x = 2;
    chamber.length = bottom + 1 + shape.length + 3;
    // console.log(
    //   [...chamber]
    //     .reverse()
    //     .map(
    //       (row, i) =>
    //         chamber.length -
    //         i -
    //         1 +
    //         ' ' +
    //         (row ?? 0)
    //           .toString(2)
    //           .padStart(7, '0')
    //           .split('')
    //           .map((char) => (char === '1' ? '#' : '.'))
    //           .join('')
    //     )
    //     .join('\n')
    // );

    let y = chamber.length - 1;
    do {
      const dx = input[charIdx++ % input.length] === '>' ? 1 : -1;
      if (
        x + dx >= 0 &&
        x + dx <= 7 - width &&
        shape.every(
          (mask, i) =>
            (mask & (chamber[y - i] >> (7 - width - (x + dx))) % 2 ** width) ===
            0
        )
      ) {
        x += dx;
      }

      if (
        y - shape.length >= 0 &&
        shape.every(
          (mask, i) =>
            (mask & (chamber[y - 1 - i] >> (7 - width - x)) % 2 ** width) === 0
        )
      ) {
        y--;
      } else {
        for (let i = 0; i < shape.length; i++) {
          chamber[y - i] |= shape[i] << (7 - width - x);
        }
        bottom = Math.max(bottom, y);
        break;
      }
    } while (true);
  }
  // console.log(
  //   [...chamber]
  //     .reverse()
  //     .map((row) =>
  //       (row ?? 0)
  //         .toString(2)
  //         .padStart(7, '0')
  //         .split('')
  //         .map((char) => (char === '1' ? '#' : '.'))
  //         .join('')
  //     )
  //     .join('\n')
  // );
  // console.log(
  //   chamber
  //     .map((row) => row.toString(2).match(/1/g).length)
  //     .reduce((acc, n) => acc + n) / 4.4
  // );
  console.log(bottom + 1);
}
solve(input);
