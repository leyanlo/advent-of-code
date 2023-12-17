import { readFileSync } from 'node:fs';

import promptSync from 'prompt-sync';

import intcode from './intcode.js';

const prompt = promptSync({ sigint: true });

const input = readFileSync('./day-25-input.txt', 'utf8');

function getOutput(computer) {
  let nextChar = computer.next().value;
  const arr = [];
  arr.push(String.fromCharCode(nextChar));
  while (nextChar) {
    nextChar = computer.next().value;
    arr.push(String.fromCharCode(nextChar));
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
