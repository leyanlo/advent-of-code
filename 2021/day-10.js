const fs = require('fs');

var input = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;
var input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const points2 = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const openMap = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const closeMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

function solve(input) {
  const lines = input.split('\n');
  const illegals = [];
  const incompletes = [];
  const stacks = [];
  outer: for (const line of lines) {
    const stack = [];
    for (const char of line) {
      switch (char) {
        case '(':
        case '[':
        case '{':
        case '<':
          stack.push(char);
          break;
        case ')':
        case ']':
        case '}':
        case '>':
          const prev = stack.pop();
          if (prev !== openMap[char]) {
            illegals.push(char);
            continue outer;
          }
      }
    }
    incompletes.push(line);
    stacks.push(stack);
  }
  console.log(illegals.map((c) => points[c]).reduce((acc, p) => acc + p));

  console.log(incompletes, stacks);
  const scores = [];
  for (const stack of stacks) {
    scores.push(
      stack
        .reverse()
        .map((char) => closeMap[char])
        .reduce((acc2, char) => {
          return acc2 * 5 + points2[char];
        }, 0)
    );
  }
  console.log(scores.sort((a, b) => a - b)[~~(scores.length / 2)]);
}
solve(input);
