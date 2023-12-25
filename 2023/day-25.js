import { readFileSync, writeFileSync } from 'node:fs';

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
  const digraph = ['digraph D {'];
  for (const line of input.split('\n')) {
    const [left, ...right] = line.match(/\w+/g);
    map[left] ??= new Set();
    digraph.push(`  ${left} -> {${right.join(', ')}}`);
    for (const r of right) {
      map[left].add(r);
      map[r] ??= new Set();
      map[r].add(left);
    }
  }
  digraph.push('}');
  writeFileSync('day-25.dot', digraph.join('\n'));
  // run `dot -Tsvg day-25.dot -o day-25.svg` to generate svg

  // find 3 pairs connecting 2 blobs
  // cbx -> dqf
  // hbr -> sds
  // pzv -> xft
  map.cbx.delete('dqf');
  map.dqf.delete('cbx');
  map.hbr.delete('sds');
  map.sds.delete('hbr');
  map.pzv.delete('xft');
  map.xft.delete('pzv');
  const keys = Object.keys(map);
  const group = getGroup(map, keys[0]);
  console.log(group.size * (keys.length - group.size));
}
solve(input);
