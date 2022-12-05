const fs = require('fs');

const input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const [diagram, moves] = input.split('\n\n');
  const stacks = [];
  for (const line of diagram.split('\n').slice(0, -1)) {
    for (let i = 0; i < line.length; i += 4) {
      if (line[i + 1] !== ' ') {
        stacks[i / 4] = stacks[i / 4] ?? [];
        stacks[i / 4].unshift(line[i + 1]);
      }
    }
  }
  for (const move of moves.split('\n')) {
    const [n, from, to] = move.match(/\d+/g).map(Number);
    const crates = stacks[from - 1].slice(-n);
    stacks[to - 1].push(...(part === 2 ? crates : crates.reverse()));
    stacks[from - 1].length -= n;
  }
  console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}
solve(input, 1);
solve(input, 2);
