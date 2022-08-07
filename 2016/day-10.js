const fs = require('fs');

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd(),
  low = 17,
  high = 61;

function solve(input) {
  const instructions = {};
  const bots = {};
  const outputs = {};
  const queue = [];

  for (const line of input.split('\n')) {
    const [, value, bot] = line.match(/value (\d+) goes to bot (\d+)/) ?? [];
    if (value) {
      if (bots[bot]) {
        queue.push(+bot);
      } else {
        bots[bot] = [];
      }
      bots[bot].push(+value);
    } else {
      const [, from, ...to] =
        line.match(/bot (\d+) gives low to (.+) and high to (.+)/) ?? [];
      instructions[from] = to.map((str) => str.split(' '));
    }
  }

  while (queue.length) {
    const bot = queue.shift();
    const chips = bots[bot].sort((a, b) => a - b);
    if (chips[0] === low && chips[1] === high) {
      console.log(bot);
    }
    const instruction = instructions[bot];
    for (let i = 0; i < 2; i++) {
      const [type, n] = instruction[i];
      switch (type) {
        case 'output':
          outputs[n] = outputs[n] ?? [];
          outputs[n].push(chips[i]);
          break;
        case 'bot':
          bots[n] = bots[n] ?? [];
          bots[n].push(chips[i]);
          if (bots[n].length === 2) {
            queue.push(n);
          }
          break;
      }
    }
    bots[bot].length = 0;
  }
  console.log([0, 1, 2].map((i) => outputs[i]).reduce((acc, n) => acc * n));
}
solve(input);
