const fs = require('fs');

var input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;
// var input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

function solve(input) {
  const blueprints = input
    .split('\n')
    .map((blueprint) => blueprint.match(/\d+/g).map(Number))
    .map(([, a, b, c, d, e, f]) => [
      [a, 0, 0, 0],
      [b, 0, 0, 0],
      [c, d, 0, 0],
      [e, 0, f, 0],
    ]);
  console.log(...blueprints);

  for (let i = 0; i < blueprints.length; i++) {
    const blueprint = blueprints[i];

    const queue = [[[1, 0, 0, 0], [0, 0, 0, 0], 0]];
    const ans = [];
    while (queue.length) {
      const [nRobots, collected, t] = queue.shift();

      if (t === 24) {
        ans.push([nRobots, collected, t]);
        break;
      }

      // spend
      const canBuild = [...Array(4)].fill(0);
      for (let j = 0; j < 4; j++) {
        const cost = blueprint[j];

        if (cost.every((c, k) => c <= collected[k])) {
          canBuild[j] = 1;
        }
      }
      if (t === 6) debugger

      // collect
      nRobots.forEach((n, j) => {
        collected[j] += n;
      });

      canBuild.forEach((can, j) => {
        if (can) {
          queue.push([
            nRobots.map((n, k) => (k === j ? n + 1 : n)),
            collected.map((c, k) => c - blueprint[j][k]),
            t + 1,
          ]);
        }
      });
      queue.push([nRobots, collected, t + 1]);
      queue.sort(
        (a, b) =>
          b[0][3] - a[0][3] ||
          b[0][2] - a[0][2] ||
          b[0][1] - a[0][1] ||
          b[0][0] - a[0][0] ||
          b[1][3] - a[1][3] ||
          b[1][2] - a[1][2] ||
          b[1][1] - a[1][1] ||
          b[1][0] - a[1][0]
      );
      // TODO: filter out worse cases
    }
    console.log(ans);
    break;
  }
}
solve(input);
