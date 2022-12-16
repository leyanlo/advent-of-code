const fs = require('fs');

var input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;
var input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

function solve(input) {
  function getRate(mask) {
    let rate = 0;
    for (let i = 0; i < valves.length; i++) {
      if ((2 ** i) & mask) {
        rate += map[valves[i]].rate;
      }
    }
    return rate;
  }

  const map = {};
  for (const line of input.split('\n')) {
    let [from, rate, ...to] = line.match(/[A-Z]{2}|\d+/g);
    rate = +rate;
    map[from] = { rate, to };
  }
  console.log(map);

  const dists = {};
  for (const from of Object.keys(map)) {
    dists[from] = { [from]: 0 };
    const seen = new Set([from]);
    const queue = [from];

    while (queue.length) {
      const to = queue.shift();
      const dist = dists[from][to];

      for (const next of map[to].to) {
        if (!seen.has(next)) {
          seen.add(next);
          dists[from][next] = dist + 1;
          queue.push(next);
        }
      }
    }
  }
  console.log(dists);

  const valves = Object.keys(map).filter((key) => map[key].rate);
  console.log(valves);

  // pressure at valve given mask and time
  const pressures = valves.map(() =>
    [...Array(2 ** valves.length)].map(() => [...Array(31)].fill(-Infinity))
  );

  for (let i = 0; i < valves.length; i++) {
    const dist = dists.AA[valves[i]];
    pressures[i][2 ** i][dist + 1] = 0;
  }

  let max = 0;
  for (let t = 1; t < 31; t++) {
    for (let mask = 0; mask < 2 ** valves.length; mask++) {
      for (let i = 0; i < valves.length; i++) {
        if (!((2 ** i) & mask)) {
          continue;
        }

        const rate = getRate(mask);
        pressures[i][mask][t] = Math.max(
          pressures[i][mask][t],
          pressures[i][mask][t - 1] + rate
        );
        max = Math.max(max, pressures[i][mask][t]);

        for (let j = 0; j < valves.length; j++) {
          if ((2 ** j) & mask) {
            continue;
          }

          const dist = dists[valves[i]][valves[j]];
          if (t + dist + 1 >= 31) {
            continue;
          }

          pressures[j][mask | (2 ** j)][t + dist + 1] = Math.max(
            pressures[j][mask | (2 ** j)][t + dist + 1],
            pressures[i][mask][t] + rate * (dist + 1)
          );
        }
      }
    }
  }
  console.log(max);

  max = 0;
  for (let i = 0; i < 2 ** valves.length; i++) {
    for (let j = 0; j < 2 ** valves.length; j++) {
      if ((i & j) !== j) {
        continue;
      }

      const a = Math.max(...pressures.map((p) => p[j][26]));
      const b = Math.max(...pressures.map((p) => p[i & ~j][26]));

      max = Math.max(max, a + b);
    }
  }
  console.log(max);
}
solve(input);
