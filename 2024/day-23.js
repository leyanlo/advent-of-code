import { readFileSync } from 'node:fs';

const input = readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const edges = input.split('\n').map((line) => line.split('-'));
  const map = {};
  for (const [a, b] of edges) {
    (map[a] ??= []).push(b);
    (map[b] ??= []).push(a);
  }

  const sets = new Set();
  for (const node in map) {
    for (const edge of edges) {
      if (edge.every((n) => map[n].includes(node))) {
        const set = edge.concat(node);
        if (set.some((n) => n.startsWith('t'))) {
          sets.add(set.sort().join());
        }
      }
    }
  }
  console.log(sets.size);
}
solve1(input);

function solve2(input) {
  const edges = input.split('\n').map((line) => line.split('-'));
  const map = {};
  for (const [a, b] of edges) {
    (map[a] ??= []).push(b);
    (map[b] ??= []).push(a);
  }

  const sets = edges;
  for (const node in map) {
    for (const set of sets) {
      if (set.every((n) => map[n].includes(node))) {
        set.push(node);
      }
    }
  }
  console.log(
    sets
      .sort((a, b) => b.length - a.length)[0]
      .sort()
      .join()
  );
}
solve2(input);
