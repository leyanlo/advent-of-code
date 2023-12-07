const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function compare1(lineA, lineB) {
  // prettier-ignore
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  const hexA = lineA[0].map((card) => cards.indexOf(card).toString(16));
  const hexB = lineB[0].map((card) => cards.indexOf(card).toString(16));

  const mapA = {};
  for (const char of hexA) {
    mapA[char] = (mapA[char] ?? 0) + 1;
  }
  const mapB = {};
  for (const char of hexB) {
    mapB[char] = (mapB[char] ?? 0) + 1;
  }

  const countsA = Object.values(mapA).sort().reverse();
  const countsB = Object.values(mapB).sort().reverse();

  return (
    countsA.join().localeCompare(countsB.join()) ||
    hexA.join().localeCompare(hexB.join())
  );
}

function compare2(lineA, lineB) {
  // prettier-ignore
  const cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

  const nJokersA = lineA[0].filter((card) => card === 'J').length;
  const nJokersB = lineB[0].filter((card) => card === 'J').length;

  const hexA = lineA[0].map((card) => cards.indexOf(card).toString(16));
  const hexB = lineB[0].map((card) => cards.indexOf(card).toString(16));

  const mapA = {};
  for (const char of hexA) {
    mapA[char] = (mapA[char] ?? 0) + 1;
  }
  mapA[0] = 0;
  const mapB = {};
  for (const char of hexB) {
    mapB[char] = (mapB[char] ?? 0) + 1;
  }
  mapB[0] = 0;

  let countsA = Object.values(mapA).sort().reverse();
  countsA[0] += nJokersA;
  let countsB = Object.values(mapB).sort().reverse();
  countsB[0] += nJokersB;

  return (
    countsA.join().localeCompare(countsB.join()) ||
    hexA.join().localeCompare(hexB.join())
  );
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
