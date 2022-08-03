const fs = require('fs');

const input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

function rot(img) {
  img = img.split('/');
  const size = img.length;
  const nextImg = [...Array(size)].map(() => [...Array(size)]);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      nextImg[i][j] = img[size - j - 1][i];
    }
  }
  return nextImg.map((row) => row.join('')).join('/');
}

function flip(img) {
  return img.split('/').reverse().join('/');
}

function solve(input, iterations) {
  const rules = input.split('\n').reduce((acc, line) => {
    let [left, right] = line.split(' => ');
    right = right.split('/');
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        acc[left] = right;
        left = rot(left);
      }
      left = flip(left);
    }
    return acc;
  }, {});

  let img = `.#.
..#
###`
    .split('\n')
    .map((row) => row.split(''));
  for (let i = 0; i < iterations; i++) {
    const divisor = 2 + (img.length % 2);
    const nextLength = (img.length / divisor) * (divisor + 1);

    const nextImg = [...Array(nextLength)].map(() => [...Array(nextLength)]);
    for (let r = 0; r < img.length; r += divisor) {
      for (let c = 0; c < img[r].length; c += divisor) {
        const nextSquare =
          rules[
            img
              .slice(r, r + divisor)
              .map((row) => row.slice(c, c + divisor).join(''))
              .join('/')
          ];
        for (let r2 = 0; r2 < nextSquare.length; r2++) {
          for (let c2 = 0; c2 < nextSquare[r2].length; c2++) {
            nextImg[(r / divisor) * (divisor + 1) + r2][
              (c / divisor) * (divisor + 1) + c2
            ] = nextSquare[r2][c2];
          }
        }
      }
    }
    img = nextImg;
  }
  console.log(
    img
      .flat()
      .map((char) => char === '#')
      .reduce((acc, n) => acc + n)
  );
}
solve(input, 5);
solve(input, 18);
