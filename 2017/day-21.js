const fs = require('fs');

var input = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`;
var input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

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

function split(img) {
  img = img.split('/');
  const size = img.length;
  const divisor = size % 2 ? 2 : 3;
  const imgs = [];
  for (let i = 0; i < size; i += divisor) {
    for (let j = 0; j < size; j += divisor) {
      imgs.push(
        img
          .slice(i, i + divisor)
          .map((row) => row.slice(j, j + divisor))
          .join('/')
      );
    }
  }
  return imgs;
}

function solve(input) {
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
  console.log(rules);

  let img = `.#.
..#
###`
    .split('\n')
    .map((row) => row.split(''));
  for (let i = 0; i < 5; i++) {
    console.log(img);
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
solve(input);
