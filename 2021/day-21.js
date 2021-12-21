const fs = require('fs');

var input = `Player 1 starting position: 4
Player 2 starting position: 8`;
// var input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const positions = input.split('\n').map((line) => +line[line.length - 1]);
//   const scores = positions.map(() => 0);
//
//   let roll = 0;
//   let t = 0;
//   outer: while (true) {
//     for (let i = 0; i < positions.length; i++) {
//       for (let r = 0; r < 3; r++) {
//         roll = (roll + 1) % 100;
//         positions[i] += roll;
//         t++;
//       }
//       positions[i] = ((positions[i] + 9) % 10) + 1;
//       scores[i] += positions[i];
//       if (scores[i] >= 1000) {
//         console.log(scores[(i + 1) % 2] * t);
//         break outer;
//       }
//     }
//   }
// }
// solve(input);

const rolls = [1, 2, 3];

const memo = {};

function countWins(p1, p2, score1, score2, wins) {
  const key = [p1, p2, score1, score2].join();
  if (memo[key]) {
    wins[memo[key] - 1]++;
    return;
  }
  if (score1 >= 21) {
    wins[0]++;
    memo[key] = 1;
    console.log(wins);
    return;
  }
  if (score2 >= 21) {
    wins[1]++;
    memo[key] = 2;
    return;
  }
  for (const r1a of rolls) {
    for (const r1b of rolls) {
      for (const r1c of rolls) {
        for (const r2a of rolls) {
          for (const r2b of rolls) {
            for (const r2c of rolls) {
              const nextP1 = ((p1 + r1a + r1b + r1c - 1) % 10) + 1;
              const nextP2 = ((p2 + r2a + r2b + r2c - 1) % 10) + 1;
              countWins(nextP1, nextP2, score1 + nextP1, score2 + nextP2, wins);
            }
          }
        }
      }
    }
  }
}

function solve(input) {
  const [p1, p2] = input.split('\n').map((line) => +line[line.length - 1]);

  const wins = Array(2).fill(0n);
  countWins(p1, p2, 0, 0, wins);
  console.log(wins);
}
solve(input);
