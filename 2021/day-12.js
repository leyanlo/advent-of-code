const fs = require('fs');

var input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
var input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;
// var input = `fs-end
// he-DX
// fs-he
// start-DX
// pj-DX
// end-zg
// zg-sl
// zg-pj
// pj-he
// RW-he
// fs-DX
// pj-RW
// zg-RW
// start-pj
// he-WI
// zg-he
// pj-fs
// start-RW`;
var input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();
// 98874 is not right

function isBig(char) {
  return char.codePointAt(0) < 'a'.codePointAt(0);
}

function solve(input) {
  const lines = input.split('\n').map((line) => line.split('-'));
  // console.log(lines);
  const connections = {};
  for (const [a, b] of lines) {
    connections[a] = connections[a] ?? new Set();
    connections[a].add(b);
    connections[b] = connections[b] ?? new Set();
    connections[b].add(a);
  }
  // console.log(connections);

  let paths = [['start']];
  let next = [[...connections.start]];
  let step = 0;
  while (next.flat().length) {
    console.log(step, { paths, next });
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
          // if (path.join() === 'start,kj,dc,kj' && nextPaths.length === 35)
          //   debugger;
          if (
            nextConnection === 'start' ||
            connection === 'end' ||
            (!isBig(nextConnection) &&
              [...lowercaseConnections, nextConnection].length >
                new Set([...lowercaseConnections, nextConnection]).size + 1)
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
  // console.log(step, { paths, next });
  const validPaths = paths
    .filter((path) => path[path.length - 1] === 'end')
    .filter((path) => {
      const lowercase = path.filter(
        (c) => c !== 'start' && c !== 'end' && !isBig(c)
      );
      return lowercase.length <= new Set(lowercase).size + 1;
    });

  console.log(validPaths.join('\n'));
  console.log(validPaths.length);

  // console.log(answer);
  // console.log(validPaths.map((line) => line.join()));
  // const validPathLines = validPaths.map((line) => line.join());
  // console.log(validPathLines.filter((path) => !answer.includes(path)));
  // console.log(answer.filter((a) => !validPathLines.includes(a)));
}
solve(input);
