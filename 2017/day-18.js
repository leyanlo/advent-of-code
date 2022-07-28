const fs = require('fs');

var input = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;
var input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

function solve(input) {
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
solve(input);
