const fs = require('fs');

const input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve(input) {
  const stream = input.replace(/!./g, ''); // remove ignored
  const groups = stream.replace(/<[^>]*>/g, ''); // remove garbage
  let score = 0;
  let level = 1;
  for (const char of groups) {
    switch (char) {
      case '{':
        score += level++;
        break;
      case '}':
        level--;
    }
  }
  console.log(score);

  const garbages = stream.match(/<[^>]*>/g);
  console.log(
    garbages.map((garbage) => garbage.length - 2).reduce((acc, n) => acc + n)
  );
}
solve(input);
