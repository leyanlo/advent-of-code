const fs = require('fs');

const input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

function magnitude(pair) {
  const [a, b] = pair.map((n) => (Array.isArray(n) ? magnitude(n) : n));
  return 3 * a + 2 * b;
}

function getLevel(line, index) {
  let level = 0;
  for (let i = 0; i < index; i++) {
    if (line[i] === '[') {
      level++;
    } else if (line[i] === ']') {
      level--;
    }
  }
  return level;
}

function explode(line, match) {
  let left = line.slice(0, match.index);
  let right = line.slice(match.index + match[0].length);

  left = left
    .split(',')
    .reverse()
    .join()
    .replace(/(\d+)/, (n) => +n + +match[1])
    .split(',')
    .reverse()
    .join();
  right = right.replace(/(\d+)/, (n) => +n + +match[2]);

  return `${left}0${right}`;
}

function split(line, match) {
  let left = line.slice(0, match.index);
  let right = line.slice(match.index + match[0].length);
  const n = +match[0];
  return `${left}[${Math.floor(n / 2)},${Math.ceil(n / 2)}]${right}`;
}

function reduce(line) {
  outer: while (true) {
    for (const match of line.matchAll(/\[(\d+),(\d+)]/g)) {
      const level = getLevel(line, match.index);
      if (level >= 4) {
        line = explode(line, match);
        continue outer;
      }
    }
    for (const match of line.matchAll(/\d\d+/g)) {
      line = split(line, match);
      continue outer;
    }
    break;
  }
  return line;
}

function solve(input) {
  const lines = input.split('\n');

  console.log(
    magnitude(
      JSON.parse(
        reduce(lines.reduce((acc, line) => reduce(`[${acc},${line}]`)))
      )
    )
  );

  let max = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      max = Math.max(
        max,
        magnitude(JSON.parse(reduce(`[${lines[i]},${lines[j]}]`))),
        magnitude(JSON.parse(reduce(`[${lines[j]},${lines[i]}]`)))
      );
    }
  }
  console.log(max);
}
solve(input);
