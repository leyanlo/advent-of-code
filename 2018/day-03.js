const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8');

// const input = `#1 @ 1,3: 4x4
// #2 @ 3,1: 4x4
// #3 @ 5,5: 2x2
// `;

function solve(input) {
  const fabric = [];
  const lines = input.split('\n').slice(0, -1);
  for (let line of lines) {
    let [, id, left, top, width, height] = line.match(
      /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/
    );
    left = +left;
    top = +top;
    width = +width;
    height = +height;
    // console.log(line.match(/^#\d+ @ (\d+),(\d+): (\d+)x(\d+)$/));
    // console.log({ id, left, top, width, height });
    for (let r = top; r < top + height; r++) {
      fabric[r] = fabric[r] ?? [];
      for (let c = left; c < left + width; c++) {
        fabric[r][c] = fabric[r][c] ? 'X' : id;
      }
    }
  }
  console.log(fabric.flat().filter((c) => c === 'X').length);

  for (let line of lines) {
    let [, id, left, top, width, height] = line.match(
      /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/
    );
    left = +left;
    top = +top;
    width = +width;
    height = +height;
    let hasOverlap = false;
    for (let r = top; r < top + height; r++) {
      for (let c = left; c < left + width; c++) {
        if (fabric[r][c] === 'X') {
          hasOverlap = true;
          break;
        }
      }
      if (hasOverlap) {
        break;
      }
    }
    if (!hasOverlap) {
      console.log(id);
      break;
    }
  }
}

solve(input);
