const fs = require('fs');

var input = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`,
  start = 'abcde',
  end = 'decab',
  invMap = [4, -1, 1, -2, 0];
var input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd(),
  start = 'abcdefgh',
  end = 'cbeghdaf',
  end = 'fbgdceah',
  invMap = [7, -1, 2, -2, 1, -3, 0, -4];

function swap(arr, x, y) {
  const tmp = arr[x];
  arr[x] = arr[y];
  arr[y] = tmp;
  return arr;
}

function rotate(arr, x) {
  const { length: l } = arr;
  return arr.map((_, i) => arr[(i + 2 * l - (x % l)) % l]);
}

const ops = [
  {
    re: RegExp('swap position (\\d+) with position (\\d+)'),
    fn: (arr, matches, inv = false) => {
      // means that the letters at indexes X and Y (counting from 0) should be swapped.
      let [, x, y] = matches;
      [x, y] = [x, y].map(Number);
      return swap(arr, x, y);
    },
  },
  {
    re: RegExp('swap letter (\\w) with letter (\\w)'),
    fn: (arr, matches, inv = false) => {
      // means that the letters X and Y should be swapped (regardless of where they appear in the string).
      let [, x, y] = matches;
      [x, y] = [x, y].map((char) => arr.indexOf(char));
      return swap(arr, x, y);
    },
  },
  {
    re: RegExp('rotate (left|right) (\\d+) steps?'),
    fn: (arr, matches, inv = false) => {
      // means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
      let [, dir, x] = matches;
      x = +x;
      const sign = (dir === 'right') ^ inv ? 1 : -1;
      return rotate(arr, sign * x);
    },
  },
  {
    re: RegExp('rotate based on position of letter (\\w)'),
    fn: (arr, matches, inv = false) => {
      // means that the whole string should be rotated to the right based on the index of letter X (counting from 0) as determined before this instruction does any rotations. Once the index is determined, rotate the string to the right one time, plus a number of times equal to that index, plus one additional time if the index was at least 4.
      let [, x] = matches;
      x = arr.indexOf(x);
      const rotateBy = inv ? invMap[x] : 1 + x + (x >= 4);
      return rotate(arr, rotateBy);
    },
  },
  {
    re: RegExp('reverse positions (\\d+) through (\\d+)'),
    fn: (arr, matches, inv = false) => {
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
    fn: (arr, matches, inv = false) => {
      // means that the letter which is at index X should be removed from the string, then inserted such that it ends up at index Y.
      let [, x, y] = matches;
      if (inv) {
        [x, y] = [y, x];
      }
      arr.splice(y, 0, ...arr.splice(x, 1));
      return arr;
    },
  },
];

function solve(input, start) {
  let arr = start.split('');
  const instructions = input.split('\n');
  for (const instruction of instructions) {
    for (const { re, fn } of ops) {
      if (re.test(instruction)) {
        arr = fn(arr, instruction.match(re));
      }
    }
  }
  console.log(arr.join(''));

  arr = end.split('');
  for (const instruction of instructions.reverse()) {
    for (const { re, fn } of ops) {
      if (re.test(instruction)) {
        arr = fn(arr, instruction.match(re), true);
        console.log(instruction, '-', arr.join(''));
      }
    }
  }
}
solve(input, start);
