import { readFileSync } from 'node:fs';

const input = readFileSync('./day-16-input.txt', 'utf8').trimEnd();

const DIR = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

const NEXT_DIRS = {
  '.': {
    [DIR.U]: [DIR.U],
    [DIR.D]: [DIR.D],
    [DIR.L]: [DIR.L],
    [DIR.R]: [DIR.R],
  },
  '#': {
    [DIR.U]: [],
    [DIR.D]: [],
    [DIR.L]: [],
    [DIR.R]: [],
  },
  '\\': {
    [DIR.U]: [DIR.L],
    [DIR.D]: [DIR.R],
    [DIR.L]: [DIR.U],
    [DIR.R]: [DIR.D],
  },
  '/': {
    [DIR.U]: [DIR.R],
    [DIR.D]: [DIR.L],
    [DIR.L]: [DIR.D],
    [DIR.R]: [DIR.U],
  },
  '|': {
    [DIR.U]: [DIR.U],
    [DIR.D]: [DIR.D],
    [DIR.L]: [DIR.U, DIR.D],
    [DIR.R]: [DIR.U, DIR.D],
  },
  '-': {
    [DIR.U]: [DIR.L, DIR.R],
    [DIR.D]: [DIR.L, DIR.R],
    [DIR.L]: [DIR.L],
    [DIR.R]: [DIR.R],
  },
};

function solve(input) {
  const map = input.split('\n').map((line) => line.split(''));

  const queues = [];
  for (let i = 0; i < map.length; i++) {
    queues.push([[i, 0, DIR.R]]);
    queues.push([[i, map[0].length - 1, DIR.L]]);
  }
  for (let j = 0; j < map[0].length; j++) {
    queues.push([[0, j, DIR.D]]);
    queues.push([[map.length - 1, j, DIR.U]]);
  }

  let max = 0;
  let part1;
  for (const queue of queues) {
    const seen = map.map((row) => row.map(() => []));
    while (queue.length) {
      let [i, j, dir] = queue.shift();
      if (!map[i]?.[j] || seen[i][j].includes(dir)) continue;

      seen[i][j].push(dir);
      const nextDirs = NEXT_DIRS[map[i][j]][dir];
      for (const nextDir of nextDirs) {
        const [di, dj] = nextDir;
        queue.push([i + di, j + dj, nextDir]);
      }
    }
    max = Math.max(
      max,
      seen
        .map((row) => row.map((b) => +!!b.length))
        .flat()
        .reduce((acc, n) => acc + n),
    );
    part1 = part1 ?? max;
  }
  console.log(part1);
  console.log(max);
}
solve(input);
