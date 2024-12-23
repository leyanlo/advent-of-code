import { readFileSync } from 'node:fs';

var input = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;
var input = readFileSync('./day-23-input.txt', 'utf8').trimEnd();
// av,dc,di,en,hs,ql,sx,tg,ub,xp,xr,yt wrong
// bg,bu,ce,ga,hw,jw,nf,nt,ox,tj,uu,vk,wp

// function solve(input) {
//   const map = {};
//   for (const line of input.split('\n')) {
//     const [a, b] = line.split('-');
//     (map[a] ??= []).push(b);
//     (map[b] ??= []).push(a);
//   }
//   console.log(map);
//
//   const set = new Set();
//   for (const key in map) {
//     for (const key2 of map[key]) {
//       for (const key3 of map[key2]) {
//         if (map[key3].includes(key)) {
//           const arr = [key, key2, key3];
//           if (arr.some((k) => k.startsWith('t'))) {
//             set.add(arr.sort().join());
//           }
//         }
//       }
//     }
//   }
//   console.log(set.size);
// }
// solve(input);
//
function solve(input) {
  const map = {};
  for (const line of input.split('\n')) {
    const [a, b] = line.split('-');
    (map[a] ??= []).push(b);
  }

  let maxSize = 0;
  let maxPath = [];
  for (const key in map) {
    let queue = [[key, []]];
    while (queue.length !== 0) {
      const nextQueue = [];
      for (const [key, path] of queue) {
        if (
          !path.every((k1) =>
            path.every(
              (k2) => k1 === k2 || map[k2].includes(k1) || map[k1].includes(k2)
            )
          )
        ) {
          continue;
        }
        if (path.length > maxSize) {
          maxSize = path.length;
          maxPath = path;
          console.log(maxPath.sort().join());
        }
        if (path.includes(key)) {
          continue;
        }

        nextQueue.push(...map[key].map((k) => [k, path.concat(key)]));
      }
      queue = nextQueue;
    }
  }
}
solve(input);
