const fs = require('fs');

var input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;
var input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let [a, moves] = input.split('\n\n');
//   let stacks = [];
//   for (const line of a.split('\n').slice(0, -1)) {
//     console.log(line);
//     for (let i = 0; i < line.length; i += 4) {
//       if (line[i + 1] !== ' ') {
//         stacks[i / 4] = stacks[i / 4] ?? [];
//         stacks[i / 4].unshift(line[i + 1]);
//       }
//     }
//   }
//   // console.log(stacks);
//   for (const move of moves.split('\n')) {
//     const [n, from, to] = move.match(/\d+/g).map(Number);
//     for (let i = 0; i < n; i++) {
//       const tmp = stacks[from - 1].pop();
//       if (tmp) stacks[to - 1].push(tmp);
//     }
//   }
//   console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
// }
// solve(input);
function solve(input) {
  let [a, moves] = input.split('\n\n');
  let stacks = [];
  for (const line of a.split('\n').slice(0, -1)) {
    console.log(line);
    for (let i = 0; i < line.length; i += 4) {
      if (line[i + 1] !== ' ') {
        stacks[i / 4] = stacks[i / 4] ?? [];
        stacks[i / 4].unshift(line[i + 1]);
      }
    }
  }
  for (const move of moves.split('\n')) {
    const [n, from, to] = move.match(/\d+/g).map(Number);
    stacks[to-1].push(...stacks[from-1].slice(-n));
    stacks[from-1].length -= n
  }
  console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
}
solve(input);
