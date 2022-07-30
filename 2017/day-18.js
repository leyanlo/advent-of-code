const fs = require('fs');

const input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const instructions = input.split('\n').map((line) => line.split(' '));
  let lastPlayed = null;
  const registers = {};
  outer: for (let i = 0; i < instructions.length; i++) {
    let [cmd, x, y] = instructions[i];
    if (y) {
      y = /[a-z]/.test(y) ? registers[y] ?? 0 : +y;
    }
    switch (cmd) {
      case 'snd': // X plays a sound with a frequency equal to the value of X.
        lastPlayed = registers[x];
        break;
      case 'set': // X Y sets register X to the value of Y.
        registers[x] = y;
        break;
      case 'add': // X Y increases register X by the value of Y.
        registers[x] = (registers[x] ?? 0) + y;
        break;
      case 'mul': // X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
        registers[x] = (registers[x] ?? 0) * y;
        break;
      case 'mod': // X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
        registers[x] = (registers[x] ?? 0) % y;
        break;
      case 'rcv': // X recovers the frequency of the last sound played, but only when the value of X is not zero. (If it is zero, the command does nothing.)
        if (registers[x]) {
          console.log(lastPlayed);
          break outer;
        }
        break;
      case 'jgz': // X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
        if (registers[x]) {
          i += y - 1;
        }
        break;
    }
  }
}
solve1(input);

function* generator(instructions, id, sndQueue, rcvQueue) {
  const registers = {
    p: id,
  };
  let sndCount = 0;
  for (let i = 0; i >= 0 && i < instructions.length; i++) {
    let [cmd, x, y] = instructions[i];
    if (y) {
      y = /[a-z]/.test(y) ? registers[y] ?? 0 : +y;
    }
    switch (cmd) {
      case 'snd': // X sends the value of X to the other program. These values wait in a queue until that program is ready to receive them. Each program has its own message queue, so a program can never receive a message it sent.
        sndQueue.push(/[a-z]/.test(x) ? registers[x] ?? 0 : +x);
        sndCount++;
        break;
      case 'set': // X Y sets register X to the value of Y.
        registers[x] = y;
        break;
      case 'add': // X Y increases register X by the value of Y.
        registers[x] = (registers[x] ?? 0) + y;
        break;
      case 'mul': // X Y sets register X to the result of multiplying the value contained in register X by the value of Y.
        registers[x] = (registers[x] ?? 0) * y;
        break;
      case 'mod': // X Y sets register X to the remainder of dividing the value contained in register X by the value of Y (that is, it sets X to the result of X modulo Y).
        registers[x] = (registers[x] ?? 0) % y;
        break;
      case 'rcv': // X receives the next value and stores it in register X. If no values are in the queue, the program waits for a value to be sent to it. Programs do not continue to the next instruction until they have received a value. Values are received in the order they are sent.
        while (!rcvQueue.length) {
          yield sndCount;
        }
        registers[x] = rcvQueue.shift();
        break;
      case 'jgz': // X Y jumps with an offset of the value of Y, but only if the value of X is greater than zero. (An offset of 2 skips the next instruction, an offset of -1 jumps to the previous instruction, and so on.)
        if ((/[a-z]/.test(x) ? registers[x] ?? 0 : +x) > 0) {
          i += y - 1;
        }
        break;
    }
  }
}

const ids = [0, 1];

function solve2(input) {
  const instructions = input.split('\n').map((line) => line.split(' '));
  const sndQueues = ids.map(() => []);
  const programs = ids.map((id) =>
    generator(instructions, id, sndQueues[id], sndQueues[+!id])
  );
  const sndCounts = ids.map(() => 0);
  do {
    for (const id of ids) {
      sndCounts[id] = programs[id].next().value;
    }
  } while (sndQueues.some((sndQueue) => sndQueue.length));
  console.log(sndCounts[1]);
}
solve2(input);
