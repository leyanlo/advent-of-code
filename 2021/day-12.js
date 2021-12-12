const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

const aCodePoint = 'a'.codePointAt(0);
function isSmall(cave) {
  return cave.codePointAt(0) >= aCodePoint;
}

function solve(input, maxDupes) {
  const lines = input.split('\n').map((line) => line.split('-'));
  const connections = {};
  for (const [a, b] of lines) {
    connections[a] = connections[a] ?? [];
    connections[a].push(b);
    connections[b] = connections[b] ?? [];
    connections[b].push(a);
  }

  let paths = [['start']];
  let nexts = [[...connections.start]];
  let step = 0;
  while (nexts.flat().length) {
    step++;
    const nextPaths = [];
    const nextNexts = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const next = nexts[i];
      if (next.length === 0) {
        nextPaths.push(path);
        nextNexts.push([]);
        continue;
      }
      for (const cave of next) {
        nextPaths.push([...path, cave]);
        const nextNext = [];
        for (const nextCave of connections[cave]) {
          const smallCaves = path.filter(
            (cave) => cave !== 'start' && cave !== 'end' && isSmall(cave)
          );
          if (
            nextCave === 'start' ||
            cave === 'end' ||
            (isSmall(nextCave) &&
              [...smallCaves, nextCave].length >
                new Set([...smallCaves, nextCave]).size + maxDupes)
          ) {
            continue;
          }
          nextNext.push(nextCave);
        }
        nextNexts.push(nextNext);
      }
    }
    paths = nextPaths;
    nexts = nextNexts;
  }
  const validPaths = paths
    .filter((path) => path[path.length - 1] === 'end')
    .filter((path) => {
      const smallCaves = path.filter(
        (cave) => cave !== 'start' && cave !== 'end' && isSmall(cave)
      );
      return smallCaves.length <= new Set(smallCaves).size + maxDupes;
    });

  console.log(validPaths.length);
}
solve(input, 0);
solve(input, 1);
