const fs = require('fs');

const input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function toDec(str) {
  let carry = 0;
  let n = 0;
  let pow = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i];
    switch (char) {
      case '=':
        carry -= 2 * 5 ** pow;
        break;
      case '-':
        carry -= 5 ** pow;
        break;
      default:
        n += +char * 5 ** pow + carry;
        carry = 0;
    }
    pow++;
  }
  return n;
}

function toSnafu(n) {
  let str = [];
  let pow = 0;
  while (n > 0) {
    str[pow] = (str[pow] ?? 0) + (n % 5);
    if (str[pow] >= 5) {
      str[pow + 1] = 1;
      str[pow] -= 5;
    }
    switch (str[pow]) {
      case 3:
        str[pow] = '=';
        str[pow + 1] = (str[pow + 1] ?? 0) + 1;
        break;
      case 4:
        str[pow] = '-';
        str[pow + 1] = (str[pow + 1] ?? 0) + 1;
        break;
    }
    n = Math.floor(n / 5);
    pow++;
  }
  return str.reverse().join('');
}

function solve(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    sum += toDec(line);
  }
  console.log(toSnafu(sum));
}
solve(input);
