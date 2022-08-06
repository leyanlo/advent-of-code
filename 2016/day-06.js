const fs = require('fs');

var input = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;
var input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input) {
  console.log(input.split('\n').map((line) => line.split('')));
  const counts = [];
  for (const line of input.split('\n')) {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      counts[i] = counts[i] ?? {};
      counts[i][char] = (counts[i][char] ?? 0) + 1;
    }
  }
  console.log(
    counts
      .map((map) => Object.entries(map).sort((a, b) => b[1] - a[1])[0][0])
      .join('')
  );
}
solve(input);
