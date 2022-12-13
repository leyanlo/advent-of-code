const fs = require('fs');

var input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
var input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'number' && typeof b === 'object') {
    a = [a];
  } else if (typeof a === 'object' && typeof b === 'number') {
    b = [b];
  }

  for (let i = 0; i < a.length; i++) {
    if (b[i] === undefined) {
      return 1;
    }
    const c = compare(a[i], b[i]);
    if (c !== 0) {
      return c;
    }
  }

  return a.length === b.length ? 0 : -1;
}

// function solve(input) {
//   console.log();
//   const pairs = input
//     .split('\n\n')
//     .map((group) => group.split('\n').map(JSON.parse));
//   console.log(pairs);
//   const corrects = pairs.map(() => 0);
//   for (let i = 0; i < pairs.length; i++) {
//     const [a, b] = pairs[i];
//     corrects[i] = +([a, b].sort(compare)[0] === a);
//   }
//   console.log(
//     corrects.map((correct, i) => correct * (i + 1)).reduce((acc, n) => acc + n)
//   );
// }
// solve(input);
function solve(input) {
  console.log();
  const pairs = input
    .split('\n\n')
    .map((group) => group.split('\n').map(JSON.parse))
    .flat();
  const dividers = [[[2]], [[6]]];
  pairs.push(...dividers);
  console.log(pairs);
  console.log(pairs.sort(compare));
  console.log(
    (pairs.indexOf(dividers[0]) + 1) * (pairs.indexOf(dividers[1]) + 1)
  );
}
solve(input);
