const fs = require('fs');

const input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function hasBingo(marks) {
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].every(Boolean)) return true;
  }
  outer: for (let j = 0; j < marks[0].length; j++) {
    for (let i = 0; i < marks.length; i++) {
      if (!marks[i][j]) continue outer;
    }
    return true;
  }
  return false;
}

function getBingo(nums, boards, part) {
  boards = [...boards];
  const marks = boards.map((board) => board.map((row) => row.map(() => false)));
  for (const n of nums) {
    for (let i = 0; i < boards.length; i++) {
      for (let j = 0; j < boards[0].length; j++) {
        for (let k = 0; k < boards[0][0].length; k++) {
          if (boards[i][j][k] === n) marks[i][j][k] = true;
        }
      }
    }
    for (let i = 0; i < boards.length; i++) {
      if (hasBingo(marks[i])) {
        if (part === 1 || boards.length === 1) {
          return {
            board: boards[i],
            marks: marks[i],
            n,
          };
        }
        boards.splice(i, 1);
        marks.splice(i, 1);
      }
    }
  }
}

function getScore({ board, marks, n }) {
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!marks[i][j]) sum += board[i][j];
    }
  }
  return sum * n;
}

function solve(input) {
  let [nums, ...boards] = input.split('\n\n');
  nums = nums.split(',').map(Number);
  boards = boards.map((board) =>
    board.split('\n').map((row) => row.trim().split(/\s+/).map(Number))
  );
  console.log(getScore(getBingo(nums, boards, 1)));
  console.log(getScore(getBingo(nums, boards, 2)));
}
solve(input);
