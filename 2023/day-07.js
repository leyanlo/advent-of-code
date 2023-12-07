const fs = require('fs');

var input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();
// 250400159 wrong
// 251509853 wrong

// const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

// function compare(lineA, lineb) {
//   const a = lineA[0].map((card) => cards.length - cards.indexOf(card) + 1);
//   const b = lineb[0].map((card) => cards.length - cards.indexOf(card) + 1);
//   const mapA = {};
//   for (const char of a) {
//     mapA[char] = (mapA[char] ?? 0) + 1;
//   }
//   const mapB = {};
//   for (const char of b) {
//     mapB[char] = (mapB[char] ?? 0) + 1;
//   }
//   const countsA = Object.values(mapA).sort((a, b) => b - a);
//   const countsB = Object.values(mapB).sort((a, b) => b - a);
//   return (
//     countsA[0] - countsB[0] ||
//     (countsA[1] ?? 0) - (countsB[1] ?? 0) ||
//     (countsA[2] ?? 0) - (countsB[2] ?? 0) ||
//     (countsA[3] ?? 0) - (countsB[3] ?? 0) ||
//     (countsA[4] ?? 0) - (countsB[4] ?? 0) ||
//     a[0] - b[0] ||
//     a[1] - b[1] ||
//     a[2] - b[2] ||
//     a[3] - b[3] ||
//     a[4] - b[4]
//   );
// }
function compare(lineA, lineB) {
  const nJokersA = lineA[0].filter((card) => card === 'J').length;
  const nJokersB = lineB[0].filter((card) => card === 'J').length;

  const a = lineA[0].map((card) => cards.length - cards.indexOf(card) + 1);
  const b = lineB[0].map((card) => cards.length - cards.indexOf(card) + 1);
  const mapA = {};
  for (const char of a) {
    mapA[char] = (mapA[char] ?? 0) + 1;
  }
  mapA[2] = 0;
  const mapB = {};
  for (const char of b) {
    mapB[char] = (mapB[char] ?? 0) + 1;
  }
  mapB[2] = 0;
  const countsA = Object.values(mapA).sort((a, b) => b - a);
  countsA[0] += nJokersA;
  const countsB = Object.values(mapB).sort((a, b) => b - a);
  countsB[0] += nJokersB;
  return (
    countsA[0] - countsB[0] ||
    (countsA[1] ?? 0) - (countsB[1] ?? 0) ||
    (countsA[2] ?? 0) - (countsB[2] ?? 0) ||
    (countsA[3] ?? 0) - (countsB[3] ?? 0) ||
    (countsA[4] ?? 0) - (countsB[4] ?? 0) ||
    a[0] - b[0] ||
    a[1] - b[1] ||
    a[2] - b[2] ||
    a[3] - b[3] ||
    a[4] - b[4]
  );
}

function solve(input) {
  const lines = input.split('\n');
  console.log(lines);
  for (let i = 0; i < lines.length; i++) {
    let [hand, bid] = lines[i].split(' ');
    hand = hand.split('');
    bid = +bid;
    lines[i] = [hand, bid];
  }
  console.log(lines);
  lines.sort(compare);
  console.log(lines);
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    sum += lines[i][1] * (i + 1);
  }
  console.log(sum);
}
solve(input);
