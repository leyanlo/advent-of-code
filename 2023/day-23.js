import { readFileSync } from 'node:fs';

const input = readFileSync('./day-23-input.txt', 'utf8').trimEnd();

const dirs = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
};

function solve1(input) {
  const map = input.split('\n').map((line) => line.split(''));

  let maxLen = 0;
  const queue = [[[0, 1].join()]];
  while (queue.length) {
    const path = queue.shift();
    const [r, c] = path.at(-1).split(',').map(Number);
    const char = map[r][c];

    for (const dirChar in dirs) {
      if (char in dirs && char !== dirChar) continue;

      const [dr, dc] = dirs[dirChar];
      const r2 = r + dr;
      const c2 = c + dc;
      const node = [r2, c2].join();
      if (path.includes(node)) continue;

      switch (map[r2]?.[c2]) {
        case '.':
        case '^':
        case '>':
        case 'v':
        case '<':
          queue.push(path.concat(node));
      }
    }
    if (r === map.length - 1) {
      maxLen = Math.max(maxLen, path.length - 1);
    }
  }
  console.log(maxLen);
}
solve1(input);

function solve2(input) {
  const map = input.split('\n').map((line) =>
    line.split('').map((char) => {
      switch (char) {
        case '^':
        case '>':
        case 'v':
        case '<':
          return '.';
      }
      return char;
    })
  );

  const start = [0, 1].join();
  const end = [map.length - 1, map[0].length - 2].join();
  const nodes = [start, end];
  const distances = [];
  for (const node of nodes) {
    distances[node] = {};
    const [r, c] = node.split(',').map(Number);

    function move(nSteps, prevDir, r, c) {
      if (map[r]?.[c] !== '.') return;

      const nEdges = Object.values(dirs).filter(
        ([dr, dc]) => map[r + dr]?.[c + dc] === '.'
      ).length;
      if (nSteps && (nEdges > 2 || !r || r === map.length - 1)) {
        const nextNode = [r, c].join();
        if (!nodes.includes(nextNode)) {
          nodes.push(nextNode);
        }
        distances[node][nextNode] = nSteps;
        return;
      }

      if (prevDir !== 'v' && r) move(nSteps + 1, '^', r - 1, c);
      if (prevDir !== '^' && r !== map.length - 1)
        move(nSteps + 1, 'v', r + 1, c);
      if (prevDir !== '>') move(nSteps + 1, '<', r, c - 1);
      if (prevDir !== '<') move(nSteps + 1, '>', r, c + 1);
    }

    move(0, null, r, c);
  }

  let maxSteps = 0;
  function move(steps, node, path) {
    if (node === end) {
      maxSteps = Math.max(maxSteps, steps);
      return;
    }
    path.push(node);
    for (const nextNode in distances[node]) {
      if (path.includes(nextNode)) continue;
      move(steps + distances[node][nextNode], nextNode, [...path]);
    }
  }

  move(0, start, []);
  console.log(maxSteps);
}
solve2(input);
