const fs = require('fs');

const input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

function getRate(mask, map, valves) {
  let rate = 0;
  for (let i = 0; i < valves.length; i++) {
    if ((2 ** i) & mask) {
      rate += map[valves[i]].rate;
    }
  }
  return rate;
}

function solve(input) {
  const map = {};
  for (const line of input.split('\n')) {
    let [from, rate, ...to] = line.match(/[A-Z]{2}|\d+/g);
    rate = +rate;
    map[from] = { rate, to };
  }

  // build distance map
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

  // filter out valves with rates of zero
  const valves = Object.keys(map).filter((key) => map[key].rate);

  // DP map of pressure at valve given mask and time
  const pressures = valves.map(() =>
    [...Array(2 ** valves.length)].map(() => [...Array(31)].fill(-Infinity))
  );

  // initialize DP for all starting points
  for (let i = 0; i < valves.length; i++) {
    const dist = dists.AA[valves[i]];
    pressures[i][2 ** i][dist + 1] = 0;
  }

  // part 1 and build DP
  let max = 0;
  for (let t = 1; t < 31; t++) {
    for (let mask = 0; mask < 2 ** valves.length; mask++) {
      for (let i = 0; i < valves.length; i++) {
        // skip if valve marked closed in mask
        if (!((2 ** i) & mask)) {
          continue;
        }

        const rate = getRate(mask, map, valves);
        pressures[i][mask][t] = Math.max(
          pressures[i][mask][t],
          pressures[i][mask][t - 1] + rate
        );
        max = Math.max(max, pressures[i][mask][t]);

        for (let j = 0; j < valves.length; j++) {
          // skip if next valve already open
          if ((2 ** j) & mask) {
            continue;
          }

          const dist = dists[valves[i]][valves[j]];
          // skip if too far away
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
    for (let j = 0; j < i; j++) {
      // skip if j is not a subset of i
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
