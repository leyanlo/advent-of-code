const fs = require('fs');

const input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

function solve(input, length) {
  let state = input.split('').map(Number);
  while (state.length < length) {
    state = state.concat(
      0,
      [...state].reverse().map((char) => +!char)
    );
  }
  state.length = length;
  while (state.length % 2 === 0) {
    state = [...Array(state.length / 2).keys()].map(
      (i) => +(state[2 * i] === state[2 * i + 1])
    );
  }
  console.log(state.join(''));
}
solve(input, 272);
solve(input, 35651584);
