const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();
// const input = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

// function solve(input) {
//   console.log(input);
//   const bits = input.split('\n').map((line) => line.split('').map(Number));
//   console.log(bits);
//   const counts = [];
//   for (let i = 0; i < bits.length; i++) {
//     for (let j = 0; j < bits[0].length; j++) {
//       counts[j] = (counts[j] ?? 0) + bits[i][j];
//     }
//   }
//   console.log(counts);
//   console.log(
//     parseInt(counts.map((n) => +(n > bits.length / 2)).join(''), 2) *
//       parseInt(counts.map((n) => +(n < bits.length / 2)).join(''), 2)
//   );
// }
//
// solve(input);
function getCounts(bits) {
  let counts = [];
  for (let i = 0; i < bits.length; i++) {
    for (let j = 0; j < bits[0].length; j++) {
      counts[j] = (counts[j] ?? 0) + bits[i][j];
    }
  }
  const most = counts.map((n) => +(n >= bits.length / 2)).join('');
  const least = counts.map((n) => +(n < bits.length / 2)).join('');
  return { counts, most, least };
}

function solve(input) {
  console.log(input);
  const bits = input.split('\n').map((line) => line.split('').map(Number));
  console.log(bits);
  let info = getCounts(bits);
  let { counts, most, least } = info;
  console.log(counts);
  console.log(most, least);
  let o2gen = [...bits.map((row) => [...row])];
  for (let i = 0; i < most.length; i++) {
    o2gen = o2gen.filter((row) => row[i] === +most[i]);
    console.log(o2gen);
    info = getCounts(o2gen);
    counts = info.counts;
    most = info.most;
    least = info.least;
    if (o2gen.length === 1) break;
  }
  let co2scrub = [...bits.map((row) => [...row])];
  info = getCounts(co2scrub);
  counts = info.counts;
  most = info.most;
  least = info.least;
  for (let i = 0; i < most.length; i++) {
    co2scrub = co2scrub.filter((row) => row[i] === +least[i]);
    console.log(co2scrub);
    info = getCounts(co2scrub);
    counts = info.counts;
    most = info.most;
    least = info.least;
    if (co2scrub.length === 1) break;
  }
  console.log(
    parseInt(o2gen[0].join(''), 2) * parseInt(co2scrub[0].join(''), 2)
  );
}

solve(input);
