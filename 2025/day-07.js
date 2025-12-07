import { readFileSync } from 'node:fs';

var input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
var input = readFileSync('./day-07-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let nSplits = 0;
//   const lines = input.split('\n').map(line => line.split(''));
//   let beams = [lines[0].indexOf('S')];
//   for (let i = 1;  i< lines.length; i++) {
//     const nextBeams = new Set()
//     for (const beam of beams) {
//       if (lines[i][beam] === '^') {
//         nextBeams.add(beam - 1);
//         nextBeams.add(beam + 1);
//         nSplits++;
//       } else {
//         nextBeams.add(beam);
//       }
//     }
//     beams = Array.from(nextBeams);
//   }
//   console.log(nSplits);
// }
// solve(input);

function solve(input) {
  const lines = input.split('\n').map((line) => line.split(''));
  let beams = { [lines[0].indexOf('S')]: 1 };
  for (let i = 1; i < lines.length; i++) {
    const nextBeams = {};
    for (const [beam, t] of Object.entries(beams)) {
      if (lines[i][beam] === '^') {
        nextBeams[+beam - 1] ??= 0;
        nextBeams[+beam - 1] += t;
        nextBeams[+beam + 1] ??= 0;
        nextBeams[+beam + 1] += t;
      } else {
        nextBeams[beam] ??= 0;
        nextBeams[beam] += t;
      }
    }
    beams = nextBeams;
  }
  console.log(Object.values(beams).reduce((a, b) => a + b, 0));
}
solve(input);
