import { readFileSync } from 'node:fs';

const input = readFileSync('./day-23-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const connections = input.split('\n').map((line) => line.split('-'));
  const map = {};
  for (const [a, b] of connections) {
    (map[a] ??= []).push(b);
    (map[b] ??= []).push(a);
  }

  const sets = new Set();
  for (const node in map) {
    for (const [a, b] of connections) {
      if (map[a].includes(node) && map[b].includes(node)) {
        const arr = [a, b, node];
        if (arr.some((n) => n.startsWith('t'))) {
          sets.add(arr.sort().join());
        }
      }
    }
  }
  console.log(sets.size);
}
solve1(input);

function solve2(input) {
  const connections = input.split('\n').map((line) => line.split('-'));
  const map = {};
  for (const [a, b] of connections) {
    (map[a] ??= []).push(b);
    (map[b] ??= []).push(a);
  }

  const sets = connections;
  for (const node in map) {
    for (const set of sets) {
      if (
        !set.includes(node) &&
        set.every((node2) => map[node2].includes(node))
      ) {
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
