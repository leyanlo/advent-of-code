const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function getPriority(char) {
  return char === char.toLowerCase()
    ? char.codePointAt(0) - 'a'.codePointAt(0) + 1
    : char.codePointAt(0) - 'A'.codePointAt(0) + 27;
}

function solve1(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    const [a, b] = [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ].map((str) => [...str]);
    const intersection = a.filter((char) => b.includes(char));
    sum += getPriority(intersection[0]);
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  let sum = 0;
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i += 3) {
    const sacks = lines.slice(i, i + 3).map((line) => [...line]);
    let intersection = sacks[0];
    for (const sack of sacks.slice(1)) {
      intersection = intersection.filter((char) => sack.includes(char));
    }
    sum += getPriority(intersection[0]);
  }
  console.log(sum);
}
solve2(input);
