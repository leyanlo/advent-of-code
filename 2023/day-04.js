const fs = require('fs');

const input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let score = 0;
  for (const line of input.split('\n')) {
    let [wins, nums] = line.split(':')[1].split('|');
    wins = wins.match(/\d+/g).map(Number);
    nums = nums.match(/\d+/g).map(Number);
    const nWins = nums.filter((n) => wins.includes(n)).length;
    score += nWins && 2 ** (nWins - 1);
  }
  console.log(score);
}
solve1(input);

function solve2(input) {
  const lines = input.split('\n');
  const nCards = lines.map(() => 1);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let [wins, nums] = line.split(':')[1].split('|');
    wins = wins.match(/\d+/g).map(Number);
    nums = nums.match(/\d+/g).map(Number);
    const nWins = nums.filter((n) => wins.includes(n)).length;
    for (let j = 0; j < nWins; j++) {
      nCards[i + 1 + j] += nCards[i];
    }
  }
  console.log(nCards.reduce((acc, n) => acc + n));
}
solve2(input);
