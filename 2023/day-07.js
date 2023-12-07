const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function compare1(lineA, lineB) {
  // prettier-ignore
  const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();
  const hexA = lineA[0]
    .map((card) => cards.indexOf(card).toString(16))
    .join('');
  const hexB = lineB[0]
    .map((card) => cards.indexOf(card).toString(16))
    .join('');
  const mapA = {};
  for (const char of hexA) {
    mapA[char] = (mapA[char] ?? 0) + 1;
  }
  const mapB = {};
  for (const char of hexB) {
    mapB[char] = (mapB[char] ?? 0) + 1;
  }
  const countsA = Object.values(mapA)
    .sort((a, b) => b - a)
    .join('');
  const countsB = Object.values(mapB)
    .sort((a, b) => b - a)
    .join('');
  return countsA.localeCompare(countsB) || hexA.localeCompare(hexB);
}

function compare2(lineA, lineB) {
  // prettier-ignore
  const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();
  const nJokersA = lineA[0].filter((card) => card === 'J').length;
  const nJokersB = lineB[0].filter((card) => card === 'J').length;

  const hexA = lineA[0]
    .map((card) => cards.indexOf(card).toString(16))
    .join('');
  const hexB = lineB[0]
    .map((card) => cards.indexOf(card).toString(16))
    .join('');
  const mapA = {};
  for (const char of hexA) {
    mapA[char] = (mapA[char] ?? 0) + 1;
  }
  mapA[cards.indexOf('J').toString(16)] = 0;
  const mapB = {};
  for (const char of hexB) {
    mapB[char] = (mapB[char] ?? 0) + 1;
  }
  mapB[cards.indexOf('J').toString(16)] = 0;
  let countsA = Object.values(mapA).sort((a, b) => b - a);
  countsA[0] += nJokersA;
  countsA = countsA.join('');
  let countsB = Object.values(mapB).sort((a, b) => b - a);
  countsB[0] += nJokersB;
  countsB = countsB.join('');
  return countsA.localeCompare(countsB) || hexA.localeCompare(hexB);
}

function solve(input, part) {
  const lines = input.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let [hand, bid] = lines[i].split(' ');
    hand = hand.split('');
    bid = +bid;
    lines[i] = [hand, bid];
  }
  lines.sort(part === 1 ? compare1 : compare2);
  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    sum += lines[i][1] * (i + 1);
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 2);
