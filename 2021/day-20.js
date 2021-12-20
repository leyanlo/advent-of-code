const fs = require('fs');

const input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function solve(input, times) {
  let [alg, img] = input.split('\n\n');
  alg = alg.split('').map((char) => +(char === '#'));
  img = img
    .split('\n')
    .map((row) => row.split('').map((char) => +(char === '#')));

  for (let t = 0; t < times; t++) {
    const nextImg = [];
    for (let i = -1; i < img.length + 1; i++) {
      const nextImgRow = [];
      for (let j = -1; j < img.length + 1; j++) {
        const pixels = [];
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            pixels.push(img[i + di]?.[j + dj] ?? (alg[0] && t % 2));
          }
        }
        const num = parseInt(pixels.join(''), 2);
        nextImgRow.push(alg[num]);
      }
      nextImg.push(nextImgRow);
    }
    img = nextImg;
  }
  console.log(img.flat().filter(Boolean).length);
}
solve(input, 2);
solve(input, 50);
