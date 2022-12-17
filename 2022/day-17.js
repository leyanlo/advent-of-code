const fs = require('fs');

const input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd();

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

function solve(input) {
  let charIdx = 0;
  let bottom = -1;
  const chamber = [];
  const heights = [-1];
  for (let i = 0; i < 10000; i++) {
    const [width, shape] = shapes[i % shapes.length];
    let x = 2;
    chamber.length = bottom + 1 + shape.length + 3;

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
        for (let j = 0; j < shape.length; j++) {
          chamber[y - j] |= shape[j] << (7 - width - x);
        }
        bottom = Math.max(bottom, y);
        heights.push(bottom + 1);
        break;
      }
    } while (true);
  }
  console.log(heights[2022]);

  let period;
  outer: for (period = 10; period < heights.length / 2; period++) {
    for (let i = 0; i < period; i++) {
      if (
        heights[100 + i + 1] - heights[100 + i] !==
        heights[100 + i + period + 1] - heights[100 + i + period]
      ) {
        continue outer;
      }
    }
    break;
  }

  console.log(
    (heights[100 + period] - heights[100]) *
      ((~~(1000000000000 / period) * period - period) / period) +
      heights[period + (1000000000000 % period)]
  );
}
solve(input);
