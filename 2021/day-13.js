const fs = require('fs');

const input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function solve(input) {
  let [dots, folds] = input.split('\n\n');
  dots = dots.split('\n').map((line) => line.split(',').map(Number));
  folds = folds.split('\n').map((fold) => {
    fold = fold.split(' ')[2].split('=');
    fold[1] = +fold[1];
    return fold;
  });

  const [maxX, maxY] = dots.reduce(([maxX, maxY], [x, y]) => {
    return [Math.max(x, maxX), Math.max(y, maxY)];
  });

  const paper = [...Array(maxY + 1)].map(() => Array(maxX + 1).fill(0));
  for (const [x, y] of dots) {
    paper[y][x] = 1;
  }

  for (let i = 0; i < folds.length; i++) {
    const [axis, value] = folds[i];
    if (axis === 'y') {
      for (let y = 0; y < value; y++) {
        for (let x = 0; x < paper[y].length; x++) {
          paper[y][x] = paper[y][x] | paper[2 * value - y]?.[x];
        }
      }
      paper.length = value;
    } else {
      for (let y = 0; y < paper.length; y++) {
        for (let x = 0; x < value; x++) {
          paper[y][x] = paper[y][x] | paper[y][2 * value - x];
        }
        paper[y].length = value;
      }
    }
    if (i === 0) {
      console.log(paper.flat().filter(Boolean).length);
    }
  }
  console.log(
    paper
      .map((line) => line.map((dot) => (dot ? '#' : ' ')).join(''))
      .join('\n')
  );
}
solve(input);
