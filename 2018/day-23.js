const fs = require('fs');

const input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

// manhattan distance between two points
function getDist(p1, p2) {
  return p1.map((_, i) => Math.abs(p1[i] - p2[i])).reduce((acc, n) => acc + n);
}

// manhattan distance between origin and closest vertex of prism
function getDistToOrigin(prism) {
  return getDist(
    prism.map((range) => Math.min(...range.map(Math.abs))),
    [0, 0, 0]
  );
}

// split prism into 8 pieces
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

// count how many bots are in range of prism
function getInRange(prism, bots) {
  const prismVertices = [...Array(8).keys()].map((i) =>
    prism.map(([min, max], j) => ((i >> j) % 2 === 0 ? min : max))
  );
  return bots.reduce(
    (acc, { pos, r, vertices }) =>
      acc +
      // bot is in range if prism vertex is in bot range or bot vertex is in prism
      (prismVertices.some((v) => getDist(v, pos) <= r) ||
        vertices.some((v) =>
          v.every((p, i) => {
            const [min, max] = prism[i];
            return min <= p && p <= max;
          })
        )),
    0
  );
}

function solve(input) {
  let bots = input.split('\n').map((line) => {
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

  bots = bots.map(({ pos, r }) => ({
    pos,
    r,
    vertices: [r, -r].flatMap((dp) =>
      pos.map((_, i) => pos.map((p, j) => p + (i === j) * dp))
    ),
  }));

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

  const inRangeMap = new Map();
  const best = {};
  while (prisms.length) {
    const prism = prisms.pop();
    if (prism.some(([min, max]) => min < max)) {
      // prism has non-zero volume
      for (const p of split(prism)) {
        const inRange = getInRange(p, bots);
        if (
          inRange &&
          (!best.inRange || inRange >= best.inRange) &&
          (!best.distToOrigin || getDistToOrigin(p) <= best.distToOrigin)
        ) {
          // p is a possible candidate
          prisms.push(p);
          inRangeMap.set(p, inRange);
        }
      }
      prisms.sort((a, b) => inRangeMap.get(a) - inRangeMap.get(b));
    } else {
      // prism is a point
      best.prism = [best.prism, prism].sort(
        (a, b) =>
          !a ||
          -!b ||
          inRangeMap.get(b) - inRangeMap.get(a) ||
          getDistToOrigin(a) - getDistToOrigin(b)
      )[0];

      if (best.prism === prism) {
        // we have a new best prism
        best.distToOrigin = getDistToOrigin(best.prism);
        best.inRange = inRangeMap.get(best.prism);
        prisms = prisms.filter(
          (p) =>
            inRangeMap.get(p) >= best.inRange &&
            getDistToOrigin(p) <= best.distToOrigin
        );
      }
    }
  }
  console.log(best.distToOrigin);
}
solve(input);
