const fs = require('fs');

var input = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`,
  start = 'abcde';
var input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd(),
  start = 'abcdefgh';
function swap(arr, x, y) {
  const tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
  return arr;
}

const ops = [
  {
    re: RegExp('swap position (\\d+) with position (\\d+)'),
    fn: (arr, matches) => {
      // means that the letters at indexes X and Y (counting from 0) should be swapped.
      let [, x, y] = matches;
      [x, y] = [x, y].map(Number);
      return swap(arr, x, y);
    },
  },
  {
    re: RegExp('swap letter (\\w) with letter (\\w)'),
    fn: (arr, matches) => {
      // means that the letters X and Y should be swapped (regardless of where they appear in the string).
      let [, x, y] = matches;
      [x, y] = [x, y].map((char) => arr.indexOf(char));
      return swap(arr, x, y);
    },
  },
  {
    re: RegExp('rotate (left|right) (\\d+) steps?'),
    fn: (arr, matches) => {
      // means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
      let [, dir, x] = matches;
      x = +x;
      const sign = dir === 'right' ? 1 : -1;
      return arr.map((_, i) => arr[(i + arr.length - sign * x) % arr.length]);
    },
  },
  {
    re: RegExp('rotate based on position of letter (\\w)'),
    fn: (arr, matches) => {
      // means that the whole string should be rotated to the right based on the index of letter X (counting from 0) as determined before this instruction does any rotations. Once the index is determined, rotate the string to the right one time, plus a number of times equal to that index, plus one additional time if the index was at least 4.
      let [, x] = matches;
      x = arr.indexOf(x);
      return arr.map(
        (_, i) => arr[(i + 2 * arr.length - 1 - x - (x >= 4)) % arr.length]
      );
    },
  },
  {
    re: RegExp('reverse positions (\\d+) through (\\d+)'),
    fn: (arr, matches) => {
      // means that the span of letters at indexes X through Y (including the letters at X and Y) should be reversed in order.
      let [, x, y] = matches;
      [x, y] = [x, y].map(Number);
      return [
        ...arr.slice(0, x),
        ...arr.slice(x, y + 1).reverse(),
        ...arr.slice(y + 1),
      ];
    },
  },
  {
    re: RegExp('move position (\\d+) to position (\\d+)'),
    fn: (arr, matches) => {
      // means that the letter which is at index X should be removed from the string, then inserted such that it ends up at index Y.
      let [, x, y] = matches;
      arr.splice(y, 0, ...arr.splice(x, 1));
      return arr;
    },
  },
];

function solve(input, start) {
  let arr = start.split('');
  for (const line of input.split('\n')) {
    for (const { re, fn } of ops) {
      if (re.test(line)) {
        arr = fn(arr, line.match(re));
        console.log(line, '-', arr.join(''));
      }
    }
  }
}
solve(input, start);
