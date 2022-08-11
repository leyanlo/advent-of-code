const fs = require('fs');

const input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();
function solve(input, nRows) {
  const map = [input.split('').map((char) => +(char === '^'))];
  for (let i = 1; i < nRows; i++) {
    const row = map[i - 1];
    map.push(
      row.map((char, j) => {
        return +(
          (row[j - 1] && row[j] && !row[j + 1]) ||
          (row[j] && row[j + 1] && !row[j - 1]) ||
          (row[j - 1] && !row[j] && !row[j + 1]) ||
          (!row[j - 1] && !row[j] && row[j + 1])
        );
      })
    );
  }
  console.log(map.flat().filter((char) => !char).length);
}
solve(input, 40);
solve(input, 400000);
