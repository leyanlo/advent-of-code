const fs = require('fs');

const input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function solve(input) {
  const nRecipes = +input;
  const scores = [3, 7];
  const elves = [0, 1];
  while (
    !scores
      .slice(-input.length - 1)
      .join('')
      .includes(input)
  ) {
    scores.push(
      ...elves
        .map((i) => scores[i])
        .reduce((acc, n) => acc + n)
        .toString(10)
        .split('')
        .map(Number)
    );
    elves.forEach((elf, i) => {
      elves[i] = (elf + 1 + scores[elf]) % scores.length;
    });
  }
  console.log(scores.slice(nRecipes, nRecipes + 10).join(''));
  console.log(scores.join('').indexOf(input));
}
solve(input);
