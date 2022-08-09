const crypto = require('crypto');
const fs = require('fs');

var input = `abc`;
var input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const triples = {
//     0: [],
//     1: [],
//     2: [],
//     3: [],
//     4: [],
//     5: [],
//     6: [],
//     7: [],
//     8: [],
//     9: [],
//     a: [],
//     b: [],
//     c: [],
//     d: [],
//     e: [],
//     f: [],
//   };
//   let i = 0;
//   const keys = [];
//   while (keys.length < 64 || i < keys[63] + 1000) {
//     const hash = crypto.createHash('md5').update(`${input}${i}`).digest('hex');
//
//     const quintuples = (hash.match(/([0-f])\1\1\1\1/g) ?? []).map(
//       (str) => str[0]
//     );
//     for (const quintuple of quintuples) {
//       triples[quintuple] = triples[quintuple].filter((j) => j >= i - 1000);
//       if (triples[quintuple].length) {
//         keys.push(...triples[quintuple]);
//         triples[quintuple].length = 0;
//         keys.sort((a, b) => a - b);
//       }
//     }
//
//     const triple = hash.match(/([0-f])\1\1/)?.[1] ?? null;
//     if (triple) {
//       triples[triple].push(i);
//     }
//     i++;
//   }
//   console.log(keys[63]);
// }
// solve(input);
function solve(input) {
  const triples = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
  };
  let i = 0;
  const keys = [];
  while (keys.length < 64 || i < keys[63] + 1000) {
    let hash = crypto.createHash('md5').update(`${input}${i}`).digest('hex');
    for (let j = 0; j < 2016; j++) {
      hash = crypto.createHash('md5').update(hash).digest('hex');
    }

    const quintuples = (hash.match(/([0-f])\1\1\1\1/g) ?? []).map(
      (str) => str[0]
    );
    for (const quintuple of quintuples) {
      triples[quintuple] = triples[quintuple].filter((j) => j >= i - 1000);
      if (triples[quintuple].length) {
        keys.push(...triples[quintuple]);
        triples[quintuple].length = 0;
        keys.sort((a, b) => a - b);
      }
    }

    const triple = hash.match(/([0-f])\1\1/)?.[1] ?? null;
    if (triple) {
      triples[triple].push(i);
    }
    i++;
  }
  console.log(keys[63]);
}
solve(input);
