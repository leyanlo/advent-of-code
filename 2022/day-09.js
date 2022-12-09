const fs = require('fs');

var input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

const toDir = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

// function solve(input) {
//   console.log(input);
//   let tail = [0, 0];
//   let dist = [0, 0];
//   const visited = { 0: { 0: 1 } };
//   for (const line of input.split('\n')) {
//     let [char, n] = line.split(' ');
//     const dir = toDir[char];
//     n = +n;
//
//     for (let i = 0; i < n; i++) {
//       dist[0] += dir[0];
//       dist[1] += dir[1];
//       if (
//         dist.filter((x) => Math.abs(x) === 2).length === 1 &&
//         dist.filter((x) => !x).length === 1
//       ) {
//         const dir2 = dist.map((x) => x / 2);
//         tail[0] += dir2[0];
//         tail[1] += dir2[1];
//         dist[0] -= dir2[0];
//         dist[1] -= dir2[1];
//         visited[tail[0]] = visited[tail[0]] ?? {};
//         visited[tail[0]][tail[1]] = 1;
//       } else if (dist.reduce((acc, n) => acc + Math.abs(n), 0) === 3) {
//         const dir2 = dist.map((x) => (Math.abs(x) === 2 ? x / 2 : x));
//         tail[0] += dir2[0];
//         tail[1] += dir2[1];
//         dist[0] -= dir2[0];
//         dist[1] -= dir2[1];
//         visited[tail[0]] = visited[tail[0]] ?? {};
//         visited[tail[0]][tail[1]] = 1;
//       }
//     }
//   }
//   console.log(
//     Object.values(visited)
//       .map((row) => Object.values(row))
//       .flat()
//       .reduce((acc, n) => acc + n)
//   );
// }
// solve(input);
function solve(input) {
  console.log(input);
  let dists = [...Array(10)].map(() => [0, 0]);
  const visited = { 0: { 0: 1 } };
  for (const line of input.split('\n')) {
    let [char, n] = line.split(' ');
    const dir = toDir[char];
    n = +n;

    for (let i = 0; i < n; i++) {
      let dist = dists[0];
      dist[0] += dir[0];
      dist[1] += dir[1];
      for (let j = 1; j < dists.length; j++) {
        const dist2 = dists[j];
        if (
          dist.filter((x) => Math.abs(x) === 2).length === 1 &&
          dist.filter((x) => !x).length === 1
        ) {
          const dir2 = dist.map((x) => x / 2);
          dist2[0] += dir2[0];
          dist2[1] += dir2[1];
          dist[0] -= dir2[0];
          dist[1] -= dir2[1];
          if (j === dists.length - 1) {
            visited[dist2[0]] = visited[dist2[0]] ?? {};
            visited[dist2[0]][dist2[1]] = 1;
          }
        } else if (dist.reduce((acc, n) => acc + Math.abs(n), 0) >= 3) {
          const dir2 = dist.map((x) => x / Math.abs(x));
          dist2[0] += dir2[0];
          dist2[1] += dir2[1];
          dist[0] -= dir2[0];
          dist[1] -= dir2[1];
          if (j === dists.length - 1) {
            visited[dist2[0]] = visited[dist2[0]] ?? {};
            visited[dist2[0]][dist2[1]] = 1;
          }
        }
        dist = dist2;
      }
    }
    console.log(dists);
  }
  console.log(
    Object.values(visited)
      .map((row) => Object.values(row))
      .flat()
      .reduce((acc, n) => acc + n)
  );
}
solve(input);
