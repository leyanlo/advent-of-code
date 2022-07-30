const fs = require('fs');

var input = `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`;
var input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const validChars = /[|\-+A-Z]/;

function solve(input) {
  const map = input.split('\n').map((line) => line.split(''));
  console.log(map);
  let [dy, dx] = [1, 0];
  let [y, x] = [0, map[0].indexOf('|')];
  const path = [];
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
  }
  console.log(path.join(''));
}
solve(input);
