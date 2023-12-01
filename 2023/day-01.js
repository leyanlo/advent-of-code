const fs = require('fs');

// var input = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`;
var input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
var input = fs.readFileSync('./day-01-input.txt', 'utf8').trimEnd();
// 52844 wrong
// 52840 right

// function solve(input) {
//   console.log(input);
//   let sum = 0;
//   for (const line of input.split('\n')) {
//     console.log([...line.match(/\d/g)].map(Number));
//     const nums = [...line.match(/\d/g)];
//     console.log()
//     sum += +(nums[0] + nums[nums.length - 1])
//   }
//   console.log(sum)
// }
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

function solve(input) {
  let sum = 0;
  for (let line of input.split('\n')) {
    console.log(line);
    for (const word of words) {
      line = line.replaceAll(
        word,
        `${word.at(0)}${wordToNum[word]}${word.at(-1)}`
      );
    }
    console.log(line);
    const nums = line.match(/\d/g);
    const val = +(nums[0] + nums[nums.length - 1]);
    console.log(val);
    sum += val;
  }
  console.log(sum);
}
solve(input);
