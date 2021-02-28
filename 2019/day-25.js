require = require('esm')(module);
const fs = require('fs');

const prompt = require('prompt-sync')({
  sigint: true,
});

const intcode = require('./intcode.js');

const input = fs.readFileSync('./day-25-input.txt', 'utf8');

function getOutput(computer) {
  let x = computer.next().value;
  const arr = [];
  arr.push(String.fromCharCode(x));
  while (x) {
    x = computer.next().value;
    arr.push(String.fromCharCode(x));
  }
  return arr.join('');
}

function enterInstruction(computer, instr) {
  for (let char of instr.split('')) {
    computer.next(char.charCodeAt(0));
  }
  computer.next('\n'.charCodeAt(0));
}

function playGame() {
  const computer = intcode(input.split(',').map(Number));

  while (true) {
    console.log(getOutput(computer));
    const instr = prompt();
    enterInstruction(computer, instr);
  }
}

playGame();
