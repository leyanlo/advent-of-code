import { readFileSync, writeFileSync } from 'node:fs';

const input = readFileSync('./day-25-input.txt', 'utf8').trimEnd();

function getGroups(map) {
  const keys = Object.keys(map);
  const groups = [];
  function addKeys(keys, group) {
    for (const k of keys) {
      if (!group.has(k)) {
        group.add(k);
        addKeys(map[k], group);
      }
    }
  }

  for (const k of keys) {
    if (!groups.find((g) => g.has(k))) {
      const group = new Set([k]);
      groups.push(group);
      addKeys(map[k], group);
    }
  }
  return groups;
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
  const groups = getGroups(map);
  console.log(groups[0].size * groups[1].size);
}
solve(input);
