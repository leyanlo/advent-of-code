const fs = require('fs');

const input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function minTotal(risks, start, end) {
  const queue = [[start, 0]];
  const seen = risks.map((row) => row.map(() => false));
  while (queue.length > 0) {
    const [[i, j], total] = queue.shift();
    if (i === end[0] && j === end[1]) {
      return total;
    }

    for (const [di, dj] of dirs) {
      const ii = i + di;
      const jj = j + dj;
      if (risks[ii]?.[jj] === undefined || seen[ii][jj]) {
        continue;
      }

      seen[ii][jj] = true;
      queue.push([[ii, jj], total + risks[ii][jj]]);
    }
    queue.sort(([, aTotal], [, bTotal]) => aTotal - bTotal);
  }
}

function solve(input, nTimes) {
  const risks = input.split('\n').map((line) => line.split('').map(Number));

  const allRisks = [];
  for (let i = 0; i < nTimes * risks.length; i++) {
    const row = [];
    for (let j = 0; j < nTimes * risks[0].length; j++) {
      row.push(
        ((risks[i % risks.length][j % risks[0].length] +
          ~~(i / risks.length) +
          ~~(j / risks[0].length) +
          8) %
          9) +
          1
      );
    }
    allRisks.push(row);
  }

  console.log(
    minTotal(allRisks, [0, 0], [allRisks.length - 1, allRisks[0].length - 1])
  );
}
solve(input, 1);
solve(input, 5);
