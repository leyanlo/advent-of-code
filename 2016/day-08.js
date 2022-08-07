const fs = require('fs');

var input = `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`,
  [width, height] = [7, 3];
var input = fs.readFileSync('./day-08-input.txt', 'utf8').trimEnd(),
  [width, height] = [50, 6];

const screen = [...Array(height)].map(() => [...Array(width)].fill(0));

function solve(input) {
  console.log(input);
  console.log(screen);
  for (const line of input.split('\n')) {
    let [cmd, ...args] = line.split(' ');
    if (cmd === 'rect') {
      const [a, b] = args[0].split('x').map(Number);
      for (let i = 0; i < b; i++) {
        for (let j = 0; j < a; j++) {
          screen[i][j] = 1;
        }
      }
    } else {
      // rotate
      const a = +args[1].split('=')[1];
      const b = +args[3];
      if (args[0] === 'row') {
        const row = screen[a];
        screen[a] = row.map((_, i) => row[(i - b + row.length) % row.length]);
      } else {
        // column
        const col = screen.map((row) => row[a]);
        const nextCol = col.map(
          (_, i) => col[(i - b + col.length) % col.length]
        );
        for (let i = 0; i < nextCol.length; i++) {
          screen[i][a] = nextCol[i];
        }
      }
    }
  }
  console.log(screen.flat().filter(Boolean).length);
}
solve(input, width, height);
