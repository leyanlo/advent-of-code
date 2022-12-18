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

function solve(input, part) {
  let rockIdx = 0;
  let inputIdx = 0;
  const chamber = [];
  const heights = [0];
  const skylines = [];
  let cycleStart, cycleLength;
  do {
    const [width, rock] = rocks[rockIdx++ % rocks.length];
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

    const skyline = chamber.slice(-100).join();
    if (skylines.includes(skyline)) {
      cycleStart = skylines.indexOf(skyline);
      cycleLength = skylines.length - cycleStart;
      break;
    }
    skylines.push(skyline);
  } while (true);

  const t = part === 2 ? 1000000000000 : 2022;
  console.log(
    ~~((t - cycleStart) / cycleLength) *
      (heights[cycleStart + cycleLength] - heights[cycleStart]) +
      heights[cycleStart + ((t - cycleStart) % cycleLength)]
  );
}
solve(input, 1);
solve(input, 2);
