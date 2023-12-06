const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const [times, dists] =
    part === 1
      ? input.split('\n').map((line) => line.match(/\d+/g).map(Number))
      : input.split('\n').map((line) => [+line.match(/\d+/g).join('')]);

  let product = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const dist = dists[i];

    let minTime;
    for (let t = 1; t < time / 2; t++) {
      const totDist = t * (time - t);
      if (totDist > dist) {
        minTime = t;
        break;
      }
    }
    const nWays = time - (minTime - 1) * 2 - 1;
    product *= nWays;
  }
  console.log(product);
}
solve(input, 1);
solve(input, 2);
