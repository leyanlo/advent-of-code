const fs = require('fs');

var input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;
var input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   console.log(input);
//   const map = {};
//   let lines = input.split('\n');
//   while (map.root === undefined) {
//     for (const line of lines) {
//       const [monkey, job] = line.split(': ');
//       if (/\d+/.test(job)) {
//         map[monkey] = +job;
//         continue;
//       }
//
//       const [m1, op, m2] = job.split(' ');
//       if (map[m1] === undefined || map[m2] === undefined) {
//         continue;
//       }
//
//       map[monkey] = [m1, m2]
//         .map((m) => map[m])
//         .reduce((acc, n) =>
//           op === '+'
//             ? acc + n
//             : op === '-'
//             ? acc - n
//             : op === '*'
//             ? acc * n
//             : acc / n
//         );
//     }
//     lines = lines.filter((line) => map[line.slice(0, 4)] === undefined);
//   }
//   console.log(map.root)
// }
// solve(input);
function solve(input) {
  const map = {};
  let lines = input.split('\n');
  lines = lines.map((line) =>
    line.startsWith('root')
      ? line.replace('+', '=')
      : line.startsWith('humn')
      ? line.replace(/\d+/, '3782852515583')
      : line
  );
  while (map.root === undefined) {
    for (const line of lines) {
      const [monkey, job] = line.split(': ');
      if (/\d+/.test(job)) {
        map[monkey] = +job;
        continue;
      }

      const [m1, op, m2] = job.split(' ');
      if (map[m1] === undefined || map[m2] === undefined) {
        continue;
      }

      map[monkey] = [m1, m2]
        .map((m) => map[m])
        .reduce((acc, n) =>
          op === '+'
            ? acc + n
            : op === '-'
            ? acc - n
            : op === '*'
            ? acc * n
            : op === '/'
            ? acc / n
            : acc - n
        );
    }
    lines = lines.filter((line) => map[line.slice(0, 4)] === undefined);
  }
  console.log(map.root);
}
solve(input);
