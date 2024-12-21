import { readFileSync } from 'node:fs';

import * as $C from 'js-combinatorics';

var input = `029A
980A
179A
456A
379A`;
var input = readFileSync('./day-21-input.txt', 'utf8').trimEnd();
// 131400 too low

const NUMPAD = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', 'A'],
];

const NUM_TO_COORDS = NUMPAD.reduce((acc, row, i) => {
  for (let j = 0; j < row.length; j++) {
    acc[row[j]] = [i, j];
  }
  return acc;
}, {});

const DIRS = {
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
  '^': [-1, 0],
};

const DIRPAD = [
  ['', '^', 'A'],
  ['<', 'v', '>'],
];

const DIR_TO_COORDS = DIRPAD.reduce((acc, row, i) => {
  for (let j = 0; j < row.length; j++) {
    acc[row[j]] = [i, j];
  }
  return acc;
}, {});

function getMoves(start, end, pad) {
  let [i, j] = start;
  const [i2, j2] = end;
  let moves = '';
  while (j2 < j) {
    moves += '<';
    j--;
  }
  while (i2 < i) {
    moves += '^';
    i--;
  }
  while (i2 > i) {
    moves += 'v';
    i++;
  }
  while (j2 > j) {
    moves += '>';
    j++;
  }

  const perms = Array.from(new $C.Permutation(moves));

  const paths = [];
  outer: for (const moves of perms) {
    let [i, j] = start;
    for (const m of moves) {
      const [di, dj] = DIRS[m];
      [i, j] = [i + di, j + dj];
      if (pad[i][j] === '') {
        continue outer;
      }
    }
    paths.push(moves.join('') + 'A');
  }

  return paths;
}

function lineToNumMoves(line, nKeypads, depth = 0, memo = {}) {
  const key = [line, depth].join();
  if (memo[key]) {
    return memo[key];
  }

  let pad, curr, toCoords;
  if (depth === 0) {
    pad = NUMPAD;
    curr = [3, 2];
    toCoords = NUM_TO_COORDS;
  } else {
    pad = DIRPAD;
    curr = [0, 2];
    toCoords = DIR_TO_COORDS;
  }

  let nMoves = 0;
  for (const char of line) {
    const next = toCoords[char];
    const moves = getMoves(curr, next, pad);

    if (depth === nKeypads) {
      nMoves += moves[0].length;
    } else {
      nMoves += Math.min(
        ...moves.map((m) => lineToNumMoves(m, nKeypads, depth + 1, memo))
      );
    }

    curr = next;
  }

  memo[key] = nMoves;
  return nMoves;
}

function solve(input, nKeypads) {
  const lines = input.split('\n');
  let sum = 0;
  for (const line of lines) {
    if (line === '456A') debugger;

    const nMoves = lineToNumMoves(line, nKeypads);
    sum += nMoves * +line.match(/\d+/g);
  }
  console.log(sum);
}
/*
<vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
v<<A>>^A<A>AvA<^AA>A<vAAA>^A
<A^A>^^AvvvA
029A
*/
// solve(input, 2);
solve(input, 25);
