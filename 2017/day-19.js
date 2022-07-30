const fs = require('fs');

const input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

const validChars = /[|\-+A-Z]/;

function solve(input) {
  const map = input.split('\n').map((line) => line.split(''));
  let [dy, dx] = [1, 0];
  let [y, x] = [0, map[0].indexOf('|')];
  const path = [];
  let nSteps = 0;
  while (validChars.test(map[y]?.[x])) {
    switch (map[y][x]) {
      case '|':
      case '-':
        // no-op
        break;
      case '+':
        for (const [dy2, dx2] of [
          [+!dy, +!dx],
          [-+!dy, -+!dx],
        ]) {
          if (validChars.test(map[y + dy2]?.[x + dx2])) {
            dy = dy2;
            dx = dx2;
            break;
          }
        }
        break;
      default:
        path.push(map[y][x]);
        break;
    }
    y += dy;
    x += dx;
    nSteps++;
  }
  console.log(path.join(''));
  console.log(nSteps);
}
solve(input);
