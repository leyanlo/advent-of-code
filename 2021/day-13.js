const fs = require('fs');

var input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
var input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();
// Not VFAZKMUX
// Not VRAZKMUX
// Not VFRZKAVZ
// UFRZKAUZ

function solve(input) {
  let [dots, folds] = input.split('\n\n');
  dots = dots.split('\n').map((line) => line.split(',').map(Number));
  folds = folds.split('\n').map((fold) => {
    fold = fold.split(' ')[2].split('=');
    fold[1] = +fold[1];
    return fold;
  });
  // console.log({ dots, folds });

  const [maxX, maxY] = dots.reduce(([maxX, maxY], [x, y]) => {
    return [Math.max(x, maxX), Math.max(y, maxY)];
  });
  // console.log({ maxX, maxY });

  let paper = [...Array(maxY + 1).keys()].map(() =>
    [...Array(maxX + 1).keys()].fill(0)
  );
  for (const [x, y] of dots) {
    paper[y][x] = 1;
  }
  // console.log(paper.map((line) => line.join('')).join('\n'), '\n');

  for (const [axis, idx] of folds) {
    if (axis === 'y') {
      for (let y = 0; y < idx; y++) {
        for (let x = 0; x < paper[y].length; x++) {
          paper[y][x] = paper[y][x] | paper[2 * idx - y]?.[x];
        }
      }
      paper.length = idx;
    } else if (axis === 'x') {
      for (let y = 0; y < paper.length; y++) {
        for (let x = 0; x < idx; x++) {
          paper[y][x] = paper[y][x] | paper[y][2 * idx - x];
        }
        paper[y].length = idx;
      }
    }
    // break;
  }
  console.log(
    paper
      .map((line) => line.map((dot) => (dot ? '##' : '..')).join(''))
      .join('\n'),
    '\n'
  );
  console.log(paper.flat().filter(Boolean).length);
}
solve(input);
