const fs = require('fs');

var input = `Time:      7  15   30
Distance:  9  40  200`;
var input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input) {
  console.log(input);
  // var times = [7, 15, 30];
  // var dists = [9, 40, 200];
  // var times = [45,97,72,95]
  // var dists = [305,1062,1110,1695]
  var times = [71530];
  var dists = [940200];
  var times = [45977295];
  var dists = [305106211101695];

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
    console.log(nWays);
  }
  console.log(product);
}
solve(input);
