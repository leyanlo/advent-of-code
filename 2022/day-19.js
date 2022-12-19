const fs = require('fs');

const input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

function getMaxGeodes(costs, tMax) {
  let maxGeodes = 0;
  const queue = [[[1, 0, 0, 0], [0, 0, 0, 0], 0]];
  const seen = new Set();
  while (queue.length) {
    const state = queue.shift();
    const [robots, collected, t] = state;

    maxGeodes = Math.max(maxGeodes, collected[3]);
    if (t === tMax) continue;

    // cap robots and resources to reduce search space
    for (let i = 0; i < 3; i++) {
      robots[i] = Math.min(
        robots[i],
        Math.max(...costs.map((cost) => cost[i] ?? 0))
      );
      collected[i] = Math.min(
        collected[i],
        (tMax - t) * Math.max(...costs.map((cost) => cost[i] ?? 0)) -
          robots[i] * (tMax - t - 1)
      );
    }

    if (seen.has(JSON.stringify(state))) continue;
    seen.add(JSON.stringify(state));

    queue.push([robots, collected.map((c, i) => c + robots[i]), t + 1]);
    costs.forEach((cost, i) => {
      if (cost.every((c, j) => c <= collected[j])) {
        queue.push([
          robots.map((r, j) => r + (j === i)),
          collected.map((c, j) => c - (cost[j] ?? 0) + robots[j]),
          t + 1,
        ]);
      }
    });
  }
  return maxGeodes;
}

function solve1(input) {
  console.log(
    input
      .split('\n')
      .map((line) => line.match(/\d+/g).slice(1).map(Number))
      .map(([a, b, c, d, e, f]) => [[a], [b], [c, d], [e, 0, f]])
      .map((costs, i) => (i + 1) * getMaxGeodes(costs, 24))
      .reduce((acc, n) => acc + n)
  );
}
solve1(input);

function solve2(input) {
  console.log(
    input
      .split('\n')
      .map((line) => line.match(/\d+/g).slice(1).map(Number))
      .slice(0, 3)
      .map(([a, b, c, d, e, f]) => [[a], [b], [c, d], [e, 0, f]])
      .map((costs) => getMaxGeodes(costs, 32))
      .reduce((acc, n) => acc * n)
  );
}
solve2(input);
