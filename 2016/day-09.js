const fs = require('fs');

const input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

function decompress(input, part) {
  let length = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '(') {
      const end = input.indexOf(')', i);
      const [nChars, times] = input
        .slice(i + 1, end)
        .split('x')
        .map(Number);
      length +=
        times *
        (part === 1
          ? nChars
          : decompress(input.slice(end + 1, end + 1 + nChars)));
      i += end - i + nChars;
    } else {
      length++;
    }
  }
  return length;
}

function solve(input, part) {
  console.log(decompress(input, part));
}

solve(input, 1);
solve(input, 2);
