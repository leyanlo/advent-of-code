const fs = require('fs');

const input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

function solve(input) {
  let programs = [...Array(16).keys()].map((i) =>
    String.fromCharCode('a'.charCodeAt(0) + i)
  );
  for (const move of input.split(',')) {
    switch (move[0]) {
      case 's': {
        const x = +move.substring(1);
        programs = [...programs.slice(-x), ...programs.slice(0, -x)];
        break;
      }
      case 'x': {
        const [a, b] = move.substring(1).split('/').map(Number);
        const tmp = programs[a];
        programs[a] = programs[b];
        programs[b] = tmp;
        break;
      }
      case 'p': {
        const [a, b] = move.substring(1).split('/');
        const [ai, bi] = [a, b].map((program) => programs.indexOf(program));
        const tmp = programs[ai];
        programs[ai] = programs[bi];
        programs[bi] = tmp;
        break;
      }
    }
  }
  console.log(programs.join(''))
}
solve(input);
