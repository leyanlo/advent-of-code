const fs = require('fs');

const input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

const toNum = [...Array(26).keys()].reduce((acc, i) => {
  acc[String.fromCodePoint('a'.codePointAt(0) + i)] = i;
  return acc;
}, {});

const fromNum = [...Array(26).keys()].map((i) =>
  String.fromCodePoint('a'.codePointAt(0) + i)
);

function hasRun(password) {
  return password
    .slice(2)
    .some(
      (_, i) =>
        password[i] + 1 === password[i + 1] &&
        password[i + 1] + 1 === password[i + 2]
    );
}

const confusingLetters = ['i', 'o', 'l'].map((char) => toNum[char]);
function avoidsConfusingLetters(password) {
  return confusingLetters.every((char) => !password.includes(char));
}

function hasPairs(password) {
  const pairs = new Set();
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      pairs.add(password[i]);
      i++;
    }
  }
  return pairs.size >= 2;
}

function next(password) {
  let i = password.length - 1;
  let carry;
  do {
    carry = false;
    do {
      password[i] = (password[i] + 1) % 26;
    } while (confusingLetters.includes(password[i]));
    if (!password[i]) {
      carry = true;
      i--;
    }
  } while (carry);
}

function nextValid(input) {
  const password = input.split('').map((char) => toNum[char]);
  do {
    next(password);
  } while (
    !hasRun(password) ||
    !avoidsConfusingLetters(password) ||
    !hasPairs(password)
  );
  return password.map((n) => fromNum[n]).join('');
}
function solve(input) {
  const part1 = nextValid(input);
  const part2 = nextValid(part1);
  console.log(part1);
  console.log(part2);
}
solve(input);
