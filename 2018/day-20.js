const fs = require('fs');

const input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function solve(input) {
  let x = 0;
  let y = 0;
  const map = { [y]: { [x]: 0 } };
  const prevCoords = [[x, y]];
  for (let i = 1; i < input.length - 1; i++) {
    const char = input[i];
    switch (char) {
      case '(':
        prevCoords.push([x, y]);
        break;
      case '|':
        [x, y] = prevCoords[prevCoords.length - 1];
        break;
      case ')':
        [x, y] = prevCoords.pop();
        break;
      default: {
        const dy = char === 'N' ? -1 : char === 'S' ? 1 : 0;
        const dx = char === 'E' ? 1 : char === 'W' ? -1 : 0;
        map[y + dy] = map[y + dy] ?? {};
        map[y + dy][x + dx] = Math.min(
          map[y + dy][x + dx] ?? Infinity,
          map[y][x] + 1
        );
        x += dx;
        y += dy;
      }
    }
  }
  const lengths = Object.values(map).flatMap((row) => Object.values(row));
  console.log(Math.max(...lengths));
  console.log(lengths.filter((length) => length >= 1000).length);
}
solve(input);
