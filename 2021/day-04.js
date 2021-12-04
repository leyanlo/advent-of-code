const fs = require('fs');

var input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;
var input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

// function hasBingo(marks) {
//   for (let i = 0; i < marks.length; i++) {
//     if (marks[i].every(Boolean)) return true;
//   }
//   let every = true;
//   for (let j = 0; j < marks[0].length; j++) {
//     for (let i = 0; i < marks.length; i++) {
//       if (!marks[i][j]) {
//         every = false;
//         break;
//       }
//     }
//     if (every) return true;
//   }
// }
//
// function findBingo(input) {
//   let [nums, ...boards] = input.split('\n\n');
//   nums = nums.split(',').map(Number);
//   boards = boards.map((board) =>
//     board.split('\n').map((row) => row.trim().split(/\s+/).map(Number))
//   );
//   console.log(nums, boards);
//   const marks = [...boards].map((board) =>
//     [...board].map((row) => [...row].fill(false))
//   );
//   for (const n of nums) {
//     for (let i = 0; i < boards.length; i++) {
//       for (let j = 0; j < boards[0].length; j++) {
//         for (let k = 0; k < boards[0][0].length; k++) {
//           if (boards[i][j][k] === n) marks[i][j][k] = true;
//         }
//       }
//     }
//     for (let i = 0; i < boards.length; i++) {
//       if (hasBingo(marks[i]))
//         return {
//           board: boards[i],
//           marks: marks[i],
//           n,
//         };
//     }
//   }
// }
// function solve(input) {
//   const { board, marks, n } = findBingo(input);
//   console.log({ board, marks, n });
//   let sum = 0;
//   for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[0].length; j++) {
//       if (!marks[i][j]) sum += board[i][j];
//     }
//   }
//   console.log(sum * n);
// }
// solve(input);
function hasBingo(marks) {
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].every(Boolean)) return true;
  }
  for (let j = 0; j < marks[0].length; j++) {
    let every = true;
    for (let i = 0; i < marks.length; i++) {
      if (!marks[i][j]) {
        every = false;
        break;
      }
    }
    if (every) return true;
  }
}

function findBingo(input) {
  let [nums, ...boards] = input.split('\n\n');
  nums = nums.split(',').map(Number);
  boards = boards.map((board) =>
    board.split('\n').map((row) => row.trim().split(/\s+/).map(Number))
  );
  console.log(nums, boards);
  const marks = [...boards].map((board) =>
    [...board].map((row) => [...row].fill(false))
  );
  const bingos = boards.map(() => false);
  let lastBoardIdx = null;
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
        bingos[i] = true;
      }
    }
    const numBingos = bingos.reduce((acc, b) => acc + +b, 0);
    // console.log(boards, marks, bingos, n)
    if (numBingos === boards.length - 1) {
      lastBoardIdx = bingos.findIndex((v) => !v);
    } else if (numBingos === boards.length) {
      return {
        board: boards[lastBoardIdx],
        marks: marks[lastBoardIdx],
        n,
      };
    }
  }
}
function solve(input) {
  const { board, marks, n } = findBingo(input);
  console.log({ board, marks, n });
  let sum = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!marks[i][j]) sum += board[i][j];
    }
  }
  console.log(sum);
  console.log(sum * n);
}
solve(input);
