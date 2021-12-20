const fs = require('fs');

const input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function solve(input, times) {
  let [alg, img] = input.split('\n\n');
  alg = alg.split('').map((char) => +(char === '#'));
  img = img
    .split('\n')
    .map((row) => row.split('').map((char) => +(char === '#')));

  for (let t = 0; t < times; t++) {
    const newImg = [];
    for (let i = -1; i < img.length + 1; i++) {
      const newImgRow = [];
      for (let j = -1; j < img.length + 1; j++) {
        const pixels = [];
        for (const [di, dj] of neighbors) {
          pixels.push(img[i + di]?.[j + dj] ?? alg[0] & t % 2);
        }
        const num = parseInt(pixels.join(''), 2);
        newImgRow.push(alg[num]);
      }
      newImg.push(newImgRow);
    }
    img = newImg;
  }
  console.log(img.flat().filter(Boolean).length);
}
solve(input, 2);
solve(input, 50);
