const fs = require('fs');

var input = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function solve(input) {
  const components = input
    .split('\n')
    .map((line) => line.split('/').map(Number));
  const bridgeKeys = new Set();
  const queue = [{ bridge: [], last: 0 }];
  while (queue.length) {
    const { bridge, last } = queue.shift();
    for (const component of components.filter(
      (c) => !bridge.includes(c) && c.includes(last)
    )) {
      const nextBridge = [...bridge, component];
      const nextBridgeKey = nextBridge.map((c) => c.join()).join(';');
      if (bridgeKeys.has(nextBridgeKey)) {
        continue;
      }
      bridgeKeys.add(nextBridgeKey);
      queue.push({
        bridge: nextBridge,
        last: component[+!component.indexOf(last)],
      });
    }
  }
  const strengths = [...bridgeKeys]
    .map((key) => key.split(';').map((c) => c.split(',').map(Number)))
    .map((bridge) => bridge.flat().reduce((acc, n) => acc + n));
  let maxStrength = 0;
  for (const s of strengths) {
    maxStrength = Math.max(maxStrength, s);
  }
  console.log(maxStrength);
}
solve(input);
