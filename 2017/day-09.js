const fs = require('fs');

var input = '{}'; // score of 1.
var input = '{{{}}}'; // score of 1 + 2 + 3 = 6.
var input = '{{},{}}'; // score of 1 + 2 + 2 = 5.
var input = '{{{},{},{{}}}}'; // score of 1 + 2 + 3 + 3 + 3 + 4 = 16.
var input = '{<a>,<a>,<a>,<a>}'; // score of 1.
var input = '{{<ab>},{<ab>},{<ab>},{<ab>}}'; // score of 1 + 2 + 2 + 2 + 2 = 9.
var input = '{{<!!>},{<!!>},{<!!>},{<!!>}}'; // score of 1 + 2 + 2 + 2 + 2 = 9.
var input = '{{<a!>},{<a!>},{<a!>},{<ab>}}'; // score of 1 + 2 = 3.
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function solve(input) {
  let stream = input
    .replace(/!./g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/,/g, '');
  let score = 0;
  let level = 1;
  for (const char of stream) {
    switch (char) {
      case '{':
        score += level;
        level++;
        break;
      case '}':
        level--;
    }
  }
  console.log(score);
}
solve(input);
