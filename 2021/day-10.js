const fs = require('fs');

const input = fs.readFileSync('./day-10-input.txt', 'utf8').trimEnd();

const illegalPoints = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const legalPoints = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

const closeToOpen = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const openToClose = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

function solve(input) {
  const lines = input.split('\n');
  const illegalChars = [];
  const legalStacks = [];
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
          const prevChar = stack.pop();
          if (prevChar !== closeToOpen[char]) {
            illegalChars.push(char);
            continue outer;
          }
      }
    }
    legalStacks.push(stack);
  }
  console.log(
    illegalChars.map((char) => illegalPoints[char]).reduce((acc, p) => acc + p)
  );

  const scores = [];
  for (const stack of legalStacks) {
    scores.push(
      stack
        .map((char) => legalPoints[openToClose[char]])
        .reduceRight((acc, points) => acc * 5 + points)
    );
  }
  console.log(scores.sort((a, b) => a - b)[~~(scores.length / 2)]);
}
solve(input);
