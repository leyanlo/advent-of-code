import { readFileSync } from 'node:fs';

import { Heap } from 'heap-js';

const input = readFileSync('./day-23-input.txt', 'utf8').trimEnd();

const dirs = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
};

// function solve(input) {
//   // console.log(input);
//   const map = [];
//   for (const line of input.split('\n')) {
//     map.push(line.split(''));
//   }
//   // console.log(map);
//
//   const heap = new Heap((a, b) => b.path.length - a.path.length);
//   // const heap = [];
//   heap.push({ path: [[0, 1].join()] });
//   let maxLen = 0;
//   while (heap.size()) {
//     const { path } = heap.pop();
//     const [r, c] = path.at(-1).split(',').map(Number);
//     const char = map[r][c];
//
//     for (const dirKey in dirs) {
//       if (char in dirs && char !== dirKey) continue;
//
//       const [dr, dc] = dirs[dirKey];
//       const r2 = r + dr;
//       const c2 = c + dc;
//       const key = [r2, c2].join();
//       if (path.includes(key)) continue;
//
//       switch (map[r2]?.[c2]) {
//         case '.':
//         case '^':
//         case '>':
//         case 'v':
//         case '<':
//           heap.add({ path: path.concat(key) });
//           break;
//         case '#':
//       }
//     }
//     if (
//       r === map.length - 1 &&
//       c === map[r].length - 2 &&
//       path.length - 1 > maxLen
//     ) {
//       // console.log(
//       //   map
//       //     .map((row, r) =>
//       //       row
//       //         .map((char, c) => (path.includes([r, c].join()) ? 'O' : char))
//       //         .join('')
//       //     )
//       //     .join('\n'),
//       //   '\n'
//       // );
//       maxLen = Math.max(maxLen, path.length - 1);
//     }
//   }
//   console.log(maxLen);
// }
// solve(input);

function solve(input) {
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

      let edgeCount = 0;
      for (const [dr, dc] of Object.values(dirs)) {
        if (map[r + dr]?.[c + dc] === '.') {
          edgeCount++;
        }
      }
      if (nSteps > 0 && (edgeCount > 2 || r === 0 || r === map.length - 1)) {
        const nextNode = [r, c].join();
        if (!nodes.includes(nextNode)) {
          nodes.push(nextNode);
        }
        distances[node][nextNode] = nSteps;
        return;
      }

      if (prevDir !== 'v' && r > 0) move(nSteps + 1, '^', r - 1, c);
      if (prevDir !== '^' && r < map.length - 1)
        move(nSteps + 1, 'v', r + 1, c);
      if (prevDir !== '>') move(nSteps + 1, '<', r, c - 1);
      if (prevDir !== '<') move(nSteps + 1, '>', r, c + 1);
    }

    move(0, null, r, c);
  }

  console.log(nodes, distances);

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
solve(input);
