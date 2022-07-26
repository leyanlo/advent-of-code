const fs = require('fs');

var input = `Generator A starts with 65
Generator B starts with 8921`;
var input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();

function solve(input) {
  let [a, b] = input.split('\n').map((line) => +line.match(/\d+/g)[0]);
  let nMatches = 0;
  for (let i = 0; i < 40000000; i++) {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;
    nMatches +=
      a.toString(2).padStart(32, '0').slice(-16) ===
      b.toString(2).padStart(32, '0').slice(-16);
  }
  console.log(nMatches)
}
solve(input);
