const fs = require('fs');

const input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

function parseDiagram(diagram) {
  const stacks = [];
  for (const line of diagram.split('\n').slice(0, -1)) {
    for (let i = 0; i < line.length; i += 4) {
      if (line[i + 1] !== ' ') {
        stacks[i / 4] = stacks[i / 4] ?? [];
        stacks[i / 4].unshift(line[i + 1]);
      }
    }
  }
  return stacks;
}

function solve1(input) {
  const [diagram, moves] = input.split('\n\n');
  const stacks = parseDiagram(diagram);
  for (const move of moves.split('\n')) {
    const [n, from, to] = move.match(/\d+/g).map(Number);
    for (let i = 0; i < n; i++) {
      stacks[to - 1].push(stacks[from - 1].pop());
    }
  }
  console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}
solve1(input);

function solve2(input) {
  const [diagram, moves] = input.split('\n\n');
  const stacks = parseDiagram(diagram);
  for (const move of moves.split('\n')) {
    const [n, from, to] = move.match(/\d+/g).map(Number);
    stacks[to - 1].push(...stacks[from - 1].slice(-n));
    stacks[from - 1].length -= n;
  }
  console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}
solve2(input);
