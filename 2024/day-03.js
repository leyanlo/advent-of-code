import { readFileSync } from 'node:fs';

var input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
var input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
var input = readFileSync('./day-03-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   console.log(input.match(/mul\((\d{1,3}),(\d{1,3})\)/g));
//   const matches = input.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
//   let sum = 0;
//   for (const match of matches) {
//     const [a, b] = match.match(/\d+/g);
//     sum += +a * +b;
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
  console.log(input);
  input = input.replace(/don't\(\)(.|\n)+?($|do\(\))/g, '');
  console.log(input);
  console.log(input.match(/mul\((\d{1,3}),(\d{1,3})\)/g));
  const matches = input.match(/mul\((\d{1,3}),(\d{1,3})\)/g);
  let sum = 0;
  for (const match of matches) {
    const [a, b] = match.match(/\d+/g);
    sum += +a * +b;
  }
  console.log(sum);
}
solve(input);
