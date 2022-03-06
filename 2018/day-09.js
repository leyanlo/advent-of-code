const fs = require('fs');

var input = `9 players; last marble is worth 25 points`;
var input = `10 players; last marble is worth 1618 points`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve(input) {
  const nPlayers = +input.split(' ')[0];
  const nMarbles = +input.split(' ')[6];
  const marbles = [0];
  let current = 0;
  const scores = Array(nPlayers).fill(0);
  for (let i = 1; i < nMarbles; i++) {
    let next;
    if (i % 23 !== 0) {
      next = (current + 2) % marbles.length;
      marbles.splice(next, 0, i);
    } else {
      next = (current + marbles.length - 7) % marbles.length;
      scores[i % nPlayers] += i + +marbles.splice(next, 1);
    }
    current = next;
  }
  console.log(Math.max(...scores))
}
solve(input);
