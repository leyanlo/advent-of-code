const fs = require('fs');

var input = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`,
  total = 1000;
var input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd(),
  total = 2503;

// function solve(input) {
//   console.log(input);
//   const reindeer = input.split('\n').map((line) => {
//     const [, name, v, tFly, tRest] = line.match(
//       /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./
//     );
//     return { name, v: +v, tFly: +tFly, tRest: +tRest };
//   });
//   console.log(reindeer);
//   const dists = reindeer.map(({ name, v, tFly, tRest }) => {
//     const tCycle = tFly + tRest;
//     const nCycles = ~~(total / tCycle);
//     const tRemainder = total % tCycle;
//     return nCycles * (v * tFly) + Math.min(tRemainder, tFly) * v;
//   });
//   console.log(Math.max(...dists))
// }
// solve(input);
function solve(input) {
  console.log(input);
  const reindeer = input.split('\n').map((line) => {
    const [, name, v, tFly, tRest] = line.match(
      /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./
    );
    return { name, v: +v, tFly: +tFly, tRest: +tRest };
  });
  console.log(reindeer);
  const points = reindeer.reduce((acc, { name }) => {
    acc[name] = 0;
    return acc;
  }, {});
  for (let t = 1; t <= total; t++) {
    const dists = reindeer.map(({ name, v, tFly, tRest }) => {
      const tCycle = tFly + tRest;
      const nCycles = ~~(t / tCycle);
      const tRemainder = t % tCycle;
      return {
        name,
        dist: nCycles * (v * tFly) + Math.min(tRemainder, tFly) * v,
      };
    });
    const maxDist = Math.max(...dists.map(({ dist }) => dist));
    for (const { name, dist } of dists) {
      if (dist === maxDist) {
        points[name]++;
      }
    }
  }
  console.log(Math.max(...Object.values(points)));
}
solve(input);
