const fs = require('fs');

var input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;
var input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

function magnitude([a, b]) {
  if (Array.isArray(a)) {
    a = magnitude(a);
  }
  if (Array.isArray(b)) {
    b = magnitude(b);
  }
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
  return `${left
    .split(',')
    .reverse()
    .join()
    .replace(/(\d+)/, (n) => {
      return +n + +match[1];
    })
    .split(',')
    .reverse()
    .join()}0${right.replace(/(\d+)/, (n) => {
    return +n + +match[2];
  })}`;
}

function split(line, match) {
  let left = line.slice(0, match.index);
  let right = line.slice(match.index + match[0].length);
  const n = +match[0];
  return `${left}[${Math.floor(n / 2)},${Math.ceil(n / 2)}]${right}`;
}

function reduce(line, level = 0, carry = 0) {
  outer: while (true) {
    for (const match of line.matchAll(/\[(\d+),(\d+)]/g)) {
      // console.log(match);
      const level = getLevel(line, match.index);
      // console.log(level);
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
  console.log(
    magnitude(
      JSON.parse(
        reduce(
          input.split('\n').reduce((acc, line) => reduce(`[${acc},${line}]`))
        )
      )
    )
  );

  const lines = input.split('\n');
  let max = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      max = Math.max(
        max,
        magnitude(JSON.parse(reduce(`[${lines[i]},${lines[j]}]`)))
      );
      max = Math.max(
        max,
        magnitude(JSON.parse(reduce(`[${lines[j]},${lines[i]}]`)))
      );
    }
  }
  console.log(max);
}
solve(input);
