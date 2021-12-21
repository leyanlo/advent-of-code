const fs = require('fs');

var input = `Player 1 starting position: 4
Player 2 starting position: 8`;
var input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

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

function solve(input) {
  const positions = input.split('\n').map((line) => +line.split(': ')[1]);

  const wins = [0, 0];

  let gameCounts = {
    [[positions, [0, 0]].join(';')]: 1,
  };
  while (Object.entries(gameCounts).length > 0) {
    for (const i of [0, 1]) {
      const nextGameCounts = {};
      for (const [state, gameCount] of Object.entries(gameCounts)) {
        const [positions, scores] = state
          .split(';')
          .map((s) => s.split(',').map(Number));

        for (const r1 of rolls) {
          for (const r2 of rolls) {
            for (const r3 of rolls) {
              const nextPositions = [...positions];
              nextPositions[i] = ((positions[i] + r1 + r2 + r3 - 1) % 10) + 1;

              const nextScores = [...scores];
              nextScores[i] += nextPositions[i];

              if (nextScores[i] >= 21) {
                wins[i] += gameCount;
                continue;
              }

              const nextState = [nextPositions, nextScores].join(';');
              nextGameCounts[nextState] =
                (nextGameCounts[nextState] ?? 0) + gameCount;
            }
          }
        }
      }
      gameCounts = nextGameCounts;
    }
  }

  console.log(Math.max(...wins));
}
solve(input);
