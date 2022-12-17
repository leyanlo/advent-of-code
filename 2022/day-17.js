const fs = require('fs');

const input = fs.readFileSync('./day-17-input.txt', 'utf8').trimEnd();

const rocks = `####

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
  .map((rock) =>
    rock.split('\n').map((line) =>
      line
        .split('')
        .map((char) => +(char === '#'))
        .join('')
    )
  )
  .map((lines) => [lines[0].length, lines.map((line) => parseInt(line, 2))]);

function solve(input) {
  let inputIdx = 0;
  const chamber = [];
  const heights = [0];
  for (let rockIdx = 0; rockIdx < 10000; rockIdx++) {
    const [width, rock] = rocks[rockIdx % rocks.length];
    let x = 2;
    chamber.length = heights.at(-1) + rock.length + 3;

    let y = chamber.length - 1;
    do {
      const dx = input[inputIdx++ % input.length] === '>' ? 1 : -1;
      if (
        x + dx >= 0 &&
        x + dx <= 7 - width &&
        rock.every(
          (mask, i) =>
            (mask & (chamber[y - i] >> (7 - width - (x + dx))) % 2 ** width) ===
            0
        )
      ) {
        x += dx;
      }

      if (
        y - rock.length >= 0 &&
        rock.every(
          (mask, i) =>
            (mask & (chamber[y - 1 - i] >> (7 - width - x)) % 2 ** width) === 0
        )
      ) {
        y--;
      } else {
        for (let i = 0; i < rock.length; i++) {
          chamber[y - i] |= rock[i] << (7 - width - x);
        }
        heights.push(Math.max(heights.at(-1), y + 1));
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
    (heights[100 + period] - heights[100]) * (~~(1000000000000 / period) - 1) +
      heights[period + (1000000000000 % period)]
  );
}
solve(input);
