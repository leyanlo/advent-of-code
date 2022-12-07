const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input) {
  const sizes = { '/': 0 };
  const paths = ['/'];
  const lines = input.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const [, cmd, dir] = lines[i].split(' ');
    if (cmd === 'ls') {
      for (i++; i < lines.length; i++) {
        const parts = lines[i].split(' ');
        if (parts[0] === '$') {
          i--;
          break;
        }
        if (parts[0] !== 'dir') {
          for (const path of paths) {
            sizes[path] = (sizes[path] ?? 0) + +parts[0];
          }
        }
      }
    } else {
      if (dir === '..') {
        paths.pop();
      } else {
        paths.push(`${paths.at(-1)}${dir}/`);
      }
    }
  }

  console.log(
    Object.values(sizes)
      .filter((size) => size <= 100000)
      .reduce((acc, size) => acc + size)
  );

  console.log(
    Object.values(sizes)
      .filter((size) => size >= sizes['/'] - 40000000)
      .sort((a, b) => a - b)[0]
  );
}
solve(input);
