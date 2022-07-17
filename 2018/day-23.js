const fs = require('fs');

const input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function getDist(p1, p2) {
  return p1.map((_, i) => Math.abs(p1[i] - p2[i])).reduce((acc, n) => acc + n);
}

function getDistToOrigin(prism) {
  return getDist(
    prism.map((range) => Math.min(...range.map(Math.abs))),
    [0, 0, 0]
  );
}

function split(prism) {
  const mids = prism.map(([min, max]) => Math.floor((max + min) / 2));
  return [...Array(8).keys()].map((i) =>
    prism.map(([min, max], j) =>
      min === max
        ? [min, max]
        : (i >> j) % 2 === 0
        ? [min, mids[j]]
        : [mids[j] + 1, max]
    )
  );
}

function getInRange(prism, bots) {
  const prismVertices = [...Array(8).keys()].map((i) =>
    prism.map(([min, max], j) => ((i >> j) % 2 === 0 ? min : max))
  );
  let inRange = 0;
  for (const { pos, r } of bots) {
    // bot is in range if prism contains bot vertex or bot range contains prism vertex
    const botVertices = [r, -r].flatMap((dp) =>
      pos.map((_, i) => pos.map((p, j) => p + (i === j) * dp))
    );
    inRange +=
      prismVertices.some((v) => getDist(v, pos) <= r) ||
      botVertices.some((v) =>
        v.every((p, i) => {
          const [min, max] = prism[i];
          return min <= p && p <= max;
        })
      );
  }
  return inRange;
}

function solve(input) {
  const bots = input.split('\n').map((line) => {
    const [x, y, z, r] = line
      .match(/pos=<(.+),(.+),(.+)>, r=(.+)/)
      .slice(1)
      .map(Number);
    return { pos: [x, y, z], r };
  });
  const strongest = bots.reduce((acc, bot) => (acc.r > bot.r ? acc : bot));
  console.log(
    bots.filter(({ pos }) => getDist(pos, strongest.pos) <= strongest.r).length
  );

  let prisms = [
    bots.slice(1).reduce(
      (acc, { pos }) =>
        pos.map((p, i) => {
          const [min, max] = acc[i];
          return [Math.min(p, min), Math.max(p, max)];
        }),
      bots[0].pos.map((p) => [p, p])
    ),
  ];

  const inRange = new Map();
  const best = {};
  while (prisms.length) {
    const prism = prisms.pop();
    if (prism.some(([min, max]) => min < max)) {
      const nextPrisms = split(prism);
      for (const p of nextPrisms) {
        inRange.set(p, getInRange(p, bots));
      }
      prisms.push(
        ...nextPrisms.filter(
          (p) =>
            inRange.get(p) &&
            (!best.inRange || inRange.get(p) >= best.inRange) &&
            (!best.distToOrigin || getDistToOrigin(p) <= best.distToOrigin)
        )
      );
      prisms.sort((a, b) => inRange.get(a) - inRange.get(b));
    } else {
      // evaluate point
      best.prism = [best.prism, prism].sort(
        (a, b) =>
          !a ||
          -!b ||
          inRange.get(b) - inRange.get(a) ||
          getDistToOrigin(a) - getDistToOrigin(b)
      )[0];

      if (best.prism === prism) {
        // remove all worse prisms if we have a new best
        best.distToOrigin = getDistToOrigin(best.prism);
        best.inRange = inRange.get(best.prism);
        prisms = prisms.filter(
          (p) =>
            inRange.get(p) >= best.inRange &&
            getDistToOrigin(p) <= best.distToOrigin
        );
      }
    }
  }
  console.log(best.distToOrigin);
}
solve(input);
