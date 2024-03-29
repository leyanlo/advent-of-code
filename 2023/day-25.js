import { readFileSync } from 'node:fs';

import { mincut } from '@graph-algorithm/minimum-cut';

const input = readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function getGroup(map, key) {
  function addKeys(keys, group) {
    for (const k of keys) {
      if (!group.has(k)) {
        group.add(k);
        addKeys(map[k], group);
      }
    }
  }

  const group = new Set([key]);
  addKeys(map[key], group);
  return group;
}
function solve(input) {
  const map = {};
  const graph = [];
  for (const line of input.split('\n')) {
    const [left, ...right] = line.match(/\w+/g);
    map[left] ??= new Set();
    for (const r of right) {
      graph.push([left, r]);
      map[left].add(r);
      map[r] ??= new Set();
      map[r].add(left);
    }
  }

  for (const [a, b] of mincut(graph)) {
    map[a].delete(b);
    map[b].delete(a);
  }
  const keys = Object.keys(map);
  const group = getGroup(map, keys[0]);
  console.log(group.size * (keys.length - group.size));
}
solve(input);
