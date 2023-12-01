const fs = require('fs');

const input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();

const wordToNum = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const words = Object.keys(wordToNum);

function solve(input, part) {
  let sum = 0;
  for (let line of input.split('\n')) {
    if (part === 2) {
      for (const word of words) {
        line = line.replaceAll(
          word,
          `${word[0]}${wordToNum[word]}${word.at(-1)}`
        );
      }
    }
    const nums = line.match(/\d/g);
    const val = +`${nums[0]}${nums.at(-1)}`;
    sum += val;
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
