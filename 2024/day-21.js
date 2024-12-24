import { readFileSync } from 'node:fs';

const input = readFileSync('./day-21-input.txt', 'utf8').trimEnd();

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
  const [i, j] = start;
  const [i2, j2] = end;
  const [di, dj] = [i2 - i, j2 - j];
  const vertMoves = di >= 0 ? 'v'.repeat(di) : '^'.repeat(-di);
  const horizMoves = dj >= 0 ? '>'.repeat(dj) : '<'.repeat(-dj);

  const perms = [vertMoves + horizMoves, horizMoves + vertMoves];

  const validPerms = perms.filter((perm) => {
    let [i, j] = start;
    for (const move of perm) {
      const [di, dj] = DIRS[move];
      [i, j] = [i + di, j + dj];
      if (pad[i][j] === '') {
        return false;
      }
    }
    return true;
  });

  return validPerms.map((perm) => perm + 'A');
}

function lineToNumMoves(line, limit, depth = 0, memo = {}) {
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

    if (depth === limit) {
      nMoves += moves[0].length;
    } else {
      nMoves += Math.min(
        ...moves.map((m) => lineToNumMoves(m, limit, depth + 1, memo))
      );
    }

    curr = next;
  }

  memo[key] = nMoves;
  return nMoves;
}

function solve(input, limit) {
  const lines = input.split('\n');
  let sum = 0;
  for (const line of lines) {
    const nMoves = lineToNumMoves(line, limit);
    sum += nMoves * +line.match(/\d+/g);
  }
  console.log(sum);
}
solve(input, 2);
solve(input, 25);
