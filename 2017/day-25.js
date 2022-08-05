const fs = require('fs');

const input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function solve(input) {
  let [header, ...body] = input.split('\n\n');

  let [, state, nSteps] = header.match(
    /Begin in state (\w)\.\nPerform a diagnostic checksum after (\d+) steps./
  );
  nSteps = +nSteps;

  const rules = body.reduce((acc, section) => {
    const [, state, write0, move0, next0, write1, move1, next1] = section.match(
      /In state (\w):\n  If the current value is 0:\n    - Write the value (\d).\n    - Move one slot to the (\w+).\n    - Continue with state (\w).\n  If the current value is 1:\n    - Write the value (\d).\n    - Move one slot to the (\w+).\n    - Continue with state (\w)./
    );
    acc[state] = [
      { write: +write0, move: +(move0 === 'right') || -1, next: next0 },
      { write: +write1, move: +(move1 === 'right') || -1, next: next1 },
    ];
    return acc;
  }, {});

  const tape = [];
  let cursor = 0;
  let minCursor = cursor;
  for (let i = 0; i < nSteps; i++) {
    const { write, move, next } = rules[state][tape[cursor] ?? 0];
    tape[cursor] = write;
    cursor += move;
    minCursor = Math.min(minCursor, cursor);
    state = next;
  }

  let sum = 0;
  for (let i = minCursor; i < tape.length; i++) {
    sum += tape[i];
  }
  console.log(sum);
}
solve(input);
