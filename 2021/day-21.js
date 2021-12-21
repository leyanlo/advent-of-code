const fs = require('fs');

const input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

const rolls = [1, 2, 3];

function solve1(input) {
  const positions = input.split('\n').map((line) => +line.split(': ')[1]);
  const scores = [0, 0];

  let roll = 0;
  while (true) {
    for (const i of [0, 1]) {
      for (const r of rolls) {
        roll++;
        positions[i] += ((roll - 1) % 100) + 1;
      }
      positions[i] = ((positions[i] - 1) % 10) + 1;
      scores[i] += positions[i];
      if (scores[i] >= 1000) {
        console.log(scores[(i + 1) % 2] * roll);
        return;
      }
    }
  }
}
solve1(input);

function solve2(input) {
  let positions = input.split('\n').map((line) => +line.split(': ')[1]);
  let scores = [0, 0];

  const wins = [0, 0];

  let gameCounts = {
    [[positions, scores].join(';')]: 1,
  };
  while (Object.entries(gameCounts).length > 0) {
    for (const i of [0, 1]) {
      const nextGameCounts = {};
      for (const [state, gameCount] of Object.entries(gameCounts)) {
        [positions, scores] = state
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
solve2(input);
