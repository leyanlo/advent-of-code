require = require('esm')(module);
const $C = require('js-combinatorics');
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
// 1091 too low
// 1126 too low

// AA DD(20) CC BB(13) AA II JJ(21) II AA DD EE GG HH(22) GG FF EE(3) DD CC(2)

function solve(input) {
  const map = {};
  for (const line of input.split('\n')) {
    let [from, rate, ...to] = line.match(/[A-Z]{2}|\d+/g);
    rate = +rate;
    map[from] = { rate, to };
  }
  console.log(map);

  const dists = {
    AA: {
      AA: 0,
    },
  };
  const queue = ['AA'];
  while (queue.length) {
    const from = queue.shift();
    for (const to of map[from].to) {
      if (dists[from][to] === undefined) {
        dists[to] = { [to]: 0 };
        for (const [from2, value] of Object.entries(dists[from])) {
          dists[to][from2] = value + 1;
          dists[from2][to] = value + 1;
        }
        dists[from][to] = 1;
        queue.push(to);
      }
    }
  }
  console.log(dists);

  let pos = 'AA';
  let total = 0;
  let t = 0;
  let valves = Object.keys(map).filter((key) => map[key].rate);
  do {
    const ranks = valves
      .map((valve) => ({
        valve,
        dist: dists[pos][valve],
        rate: map[valve].rate,
        rank: map[valve].rate / dists[pos][valve],
      }))
      .sort((a, b) => b.rank - a.rank);
    console.log(ranks);
    const next = ranks[0];
    total += (30 - t - 1 - dists[pos][next.valve]) * map[next.valve].rate;
    t += dists[pos][next.valve] + 1;
    pos = next.valve;
    console.log({ total, t, pos });
    console.log(valves);
    valves.splice(valves.indexOf(pos), 1);
    console.log(valves);
  } while (t < 30 && valves.length);

  // var x = {
  //   AA: 0,
  //   BB: 1 13, // 13 13 13 13 13
  //   CC: 2 2,  // 2 2 2 2
  //   DD: 1 20, // 20 20 20 20 20
  //   EE: 2 3,  // 3 3 3 3
  //   FF: 3,
  //   GG: 4,
  //   HH: 5 22, // 22
  //   II: 1,
  //   JJ: 2 21, // 21 21 21 21
  // };

  // JJ 3 21
  // BB 2 13
  // HH 4 22
  // EE 1 3
  // CC 1 2

  // const valves = ['AA', ...Object.keys(map).filter((key) => map[key].rate)];
  // console.log(valves);
  // const dists = {};
  // for (let i = 0; i < valves.length - 1; i++) {
  //   const v1 = valves[i];
  //   dists[v1] = dists[v1] ?? {};
  //   for (let j = i + 1; j < valves.length; j++) {
  //     const v2 = valves[j];
  //     dists[v2] = dists[v2] ?? {};
  //     const dist = getDist(v1, v2, map);
  //     dists[v2][v1] = dist;
  //     dists[v1][v2] = dist;
  //   }
  // }

  // const queue = [{ t: 1, open: [], path: ['AA'], total: 0 }];
  // while (queue.length && queue.some(({ t }) => t < 30)) {
  //   const { t, open, path, total } = queue.shift();
  //   if (t === 30) {
  //     continue;
  //   }
  //   if (!open.includes(path.at(-1)) && map[path.at(-1)].rate) {
  //     queue.push({
  //       t: t + 1,
  //       open: [...open, path.at(-1)],
  //       path,
  //       total:
  //         total + open.map((p) => map[p].rate).reduce((acc, n) => acc + n, 0),
  //     });
  //   }
  //   for (const to of map[path.at(-1)].to) {
  //     // no doubling back
  //     if (to === path.at(-2) && !open.includes(path.at(-1))) {
  //       continue;
  //     }
  //     if (open.length < Object.keys(map).length - 1) {
  //       queue.push({
  //         t: t + 1,
  //         open,
  //         path: [...path, to],
  //         total:
  //           total + open.map((p) => map[p].rate).reduce((acc, n) => acc + n, 0),
  //       });
  //     }
  //   }
  //   queue.sort((a, b) => b.total - a.total);
  // }
  // console.log(queue);
}
solve(input);
