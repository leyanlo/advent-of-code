const fs = require('fs');

var input = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;
var input = fs.readFileSync('./day-25-input.txt', 'utf8').trimEnd();
// 2--1-11==-==0112-222 wrong
// 20-1-11==0--0112-222 wrong
// 20-1-11==0--0112-222 wrong
// 20-1-11==0-=0112-222 wrong
// 20-1-11==0-=0112-222
// 20-1-11==0-=0112-222
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
  console.log(toDec('1') === 1);
  console.log(toDec('2') === 2);
  console.log(toDec('1=') === 3);
  console.log(toDec('1-') === 4);
  console.log(toDec('10') === 5);
  console.log(toDec('11') === 6);
  console.log(toDec('12') === 7);
  console.log(toDec('2=') === 8);
  console.log(toDec('2-') === 9);
  console.log(toDec('20') === 10);
  console.log(toDec('1=0') === 15);
  console.log(toDec('1-0') === 20);
  console.log(toDec('1=11-2') === 2022);
  console.log(toDec('1-0---0') === 12345);
  console.log(toDec('1121-1110-1=0') === 314159265);

  console.log(toSnafu(1) === '1');
  console.log(toSnafu(2) === '2');
  console.log(toSnafu(3) === '1=');
  console.log(toSnafu(4) === '1-');
  console.log(toSnafu(5) === '10');
  console.log(toSnafu(6) === '11');
  console.log(toSnafu(7) === '12');
  console.log(toSnafu(8) === '2=');
  console.log(toSnafu(9) === '2-');
  console.log(toSnafu(10) === '20');
  console.log(toSnafu(15) === '1=0');
  console.log(toSnafu(20) === '1-0');
  console.log(toSnafu(2022) === '1=11-2');
  console.log(toSnafu(12345) === '1-0---0');
  console.log(toSnafu(314159265) === '1121-1110-1=0');

  console.log(toSnafu(sum));
}
solve(input);
