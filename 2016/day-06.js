const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input) {
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
  console.log(
    counts
      .map((map) => Object.entries(map).sort((a, b) => a[1] - b[1])[0][0])
      .join('')
  );
}
solve(input);
