const fs = require('fs');

const input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

function hasBingo(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].every((cell) => cell === -1)) return true;
  }
  outer: for (let j = 0; j < board[0].length; j++) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][j] !== -1) continue outer;
    }
    return true;
  }
  return false;
}

function getBingo(nums, boards, part) {
  boards = boards.map((board) => board.map((row) => row.map((cell) => cell)));
  for (const n of nums) {
    for (let i = 0; i < boards.length; i++) {
      for (let j = 0; j < boards[0].length; j++) {
        for (let k = 0; k < boards[0][0].length; k++) {
          if (boards[i][j][k] === n) boards[i][j][k] = -1;
        }
      }
    }
    for (let i = 0; i < boards.length; i++) {
      if (hasBingo(boards[i])) {
        if (part === 1 || boards.length === 1) {
          return {
            board: boards[i],
            n,
          };
        }
        boards.splice(i, 1);
        i--;
      }
    }
  }
}

function getScore({ board, n }) {
  return (
    n *
    board
      .flat()
      .filter((cell) => cell !== -1)
      .reduce((acc, cell) => acc + cell, 0)
  );
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
