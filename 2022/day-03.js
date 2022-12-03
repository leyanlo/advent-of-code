const fs = require('fs');

var input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
var input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let sum = 0;
//   for (const line of input.split('\n')) {
//     const [a, b] = [
//       line.slice(0, line.length / 2),
//       line.slice(line.length / 2),
//     ].map((sack) => new Set([...sack]));
//     for (const char of [...b]) {
//       if (a.has(char)) {
//         let priority = char.codePointAt(0) - 'a'.codePointAt(0) + 1;
//         if (priority <= 0) priority += 58;
//         console.log(priority);
//         sum += priority;
//       }
//     }
//   }
//   console.log(sum);
// }
// solve(input);
function solve(input) {
  let sum = 0;
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i += 3) {
    const sacks = lines.slice(i, i + 3).map((line) => new Set(line));
    let inAll = sacks[0];
    let nextInAll = new Set();
    for (const char of [...sacks[1]]) {
      if (inAll.has(char)) nextInAll.add(char);
    }
    inAll = nextInAll;

    nextInAll = new Set();
    for (const char of [...sacks[2]]) {
      if (inAll.has(char)) nextInAll.add(char);
    }
    inAll = nextInAll;
    console.log(inAll);
    const char = [...inAll][0];
    let priority = char.codePointAt(0) - 'a'.codePointAt(0) + 1;
    if (priority <= 0) priority += 58;
    console.log(priority);
    sum += priority;
  }
  console.log(sum);
}
solve(input);
