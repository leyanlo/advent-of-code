const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function solve(input, maxDupes) {
  const lines = input.split('\n').map((line) => line.split('-'));
  const connections = {};
  for (const [a, b] of lines) {
    if (b !== 'start' && a !== 'end') {
      connections[a] = connections[a] ?? [];
      connections[a].push(b);
    }
    if (a !== 'start' && b !== 'end') {
      connections[b] = connections[b] ?? [];
      connections[b].push(a);
    }
  }

  const validPaths = [];
  let paths = [['start']];
  while (paths.length) {
    const nextPaths = [];
    for (const path of paths) {
      const cave = path[path.length - 1];
      for (const nextCave of connections[cave]) {
        const nextPath = [...path, nextCave];
        if (nextCave === 'end') {
          validPaths.push(nextPath);
          continue;
        }
        const smallCaves = nextPath.filter((cave) => /[a-z]/.test(cave));
        if (smallCaves.length > new Set(smallCaves).size + maxDupes) {
          continue;
        }
        nextPaths.push(nextPath);
      }
    }
    paths = nextPaths;
  }
  console.log(validPaths.length);
}
solve(input, 0);
solve(input, 1);
