const fs = require('fs');

const input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

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
  const bridges = [...bridgeKeys].map((key) =>
    key.split(';').map((c) => c.split(',').map(Number))
  );
  let maxStrength = 0;
  let longest = { length: 0, strength: 0 };
  for (const bridge of bridges) {
    const strength = bridge.flat().reduce((acc, n) => acc + n);
    maxStrength = Math.max(maxStrength, strength);
    if (
      bridge.length > longest.length ||
      (bridge.length === longest.length && strength > longest.strength)
    ) {
      longest = {
        length: bridge.length,
        strength,
      };
    }
  }
  console.log(maxStrength);
  console.log(longest.strength);
}
solve(input);
