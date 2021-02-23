require = require('esm')(module);
const fs = require('fs');

const intcode = require('./intcode.js');

const input = fs.readFileSync('./day-23-input.txt', 'utf8');

function solve() {
  const arr = input.split(',').map(Number);
  const n = 50;
  const computers = [];
  const inputQueues = [];
  const outputQueues = [];

  // initialize computers and queues
  for (let i = 0; i < n; i++) {
    const computer = intcode([...arr]);
    computer.next();
    computers.push(computer);
    inputQueues.push([i]);
    outputQueues.push([]);
  }

  let nat = [];
  let prevY = null;
  let firstY = null;
  while (true) {
    for (let i = 0; i < n; i++) {
      const output = computers[i].next(inputQueues[i][0] ?? -1).value;
      if (typeof output === 'number') {
        const outputQueue = outputQueues[i];
        outputQueue.push(output);
        if (outputQueue.length === 3) {
          const [dest, x, y] = outputQueue;
          outputQueue.length = 0;
          if (dest === 255) {
            firstY = firstY ?? y;
            nat = [x, y];
          } else {
            inputQueues[dest].push(x, y);
          }
        }
      } else {
        // input
        inputQueues[i].shift();
      }
    }
    if (
      inputQueues.every((queue) => !queue.length) &&
      outputQueues.every((queue) => !queue.length)
    ) {
      if (nat[1] === prevY) {
        break;
      }
      prevY = nat[1];
      inputQueues[0].push(...nat);
    }
  }
  console.log(firstY);
  console.log(prevY);
}

solve(input);
