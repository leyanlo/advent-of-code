const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

const aCodePoint = 'a'.codePointAt(0);
function isBig(char) {
  return char.codePointAt(0) < aCodePoint;
}

function solve(input, maxDupes) {
  const lines = input.split('\n').map((line) => line.split('-'));
  const connections = {};
  for (const [a, b] of lines) {
    connections[a] = connections[a] ?? new Set();
    connections[a].add(b);
    connections[b] = connections[b] ?? new Set();
    connections[b].add(a);
  }

  let paths = [['start']];
  let next = [[...connections.start]];
  let step = 0;
  while (next.flat().length) {
    step++;
    const nextPaths = [];
    const nextNext = [];
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (next[i].length === 0) {
        nextPaths.push([...path]);
        nextNext.push([]);
      }
      for (const connection of next[i]) {
        nextPaths.push([...path, connection]);
        const nextNextOne = [];
        for (const nextConnection of connections[connection]) {
          const lowercaseConnections = path.filter(
            (c) => c !== 'start' && c !== 'end' && !isBig(c)
          );
          if (
            nextConnection === 'start' ||
            connection === 'end' ||
            (!isBig(nextConnection) &&
              [...lowercaseConnections, nextConnection].length >
                new Set([...lowercaseConnections, nextConnection]).size +
                  maxDupes)
          ) {
            continue;
          }
          nextNextOne.push(nextConnection);
        }
        nextNext.push(nextNextOne);
      }
    }
    paths = nextPaths;
    next = nextNext;
  }
  const validPaths = paths
    .filter((path) => path[path.length - 1] === 'end')
    .filter((path) => {
      const lowercase = path.filter(
        (c) => c !== 'start' && c !== 'end' && !isBig(c)
      );
      return lowercase.length <= new Set(lowercase).size + maxDupes;
    });

  console.log(validPaths.length);
}
solve(input, 0);
solve(input, 1);
