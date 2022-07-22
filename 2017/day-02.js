const fs = require('fs');

const input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();

function solve(input) {
  const sheet = input.split('\n').map((line) => line.split(/\s+/).map(Number));

  const diffs = sheet.map((row) => Math.max(...row) - Math.min(...row));
  console.log(diffs.reduce((acc, n) => acc + n));

  const ratios = sheet.map((row) => {
    for (let i = 0; i < row.length - 1; i++) {
      for (let j = i + 1; j < row.length; j++) {
        const ratio = Math.max(row[i] / row[j], row[j] / row[i]);
        if (ratio === ~~ratio) {
          return ratio;
        }
      }
    }
  });
  console.log(ratios.reduce((acc, n) => acc + n));
}
solve(input);
