import { readFileSync } from 'node:fs';

const input = readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const lines = input.split('\n');
  const graph = {};
  for (const line of lines) {
    const [node, children] = line.split(': ');
    graph[node] = children.split(' ');
  }
  const memo = {};
  function dfs(node) {
    if (node === 'out') return 1;
    if (node in memo) return memo[node];
    let total = 0;
    for (const child of graph[node]) {
      total += dfs(child);
    }
    memo[node] = total;
    return total;
  }
  const result = dfs('you');
  console.log(result);
}
solve1(input);

function solve2(input) {
  const lines = input.split('\n');
  const graph = {};
  for (const line of lines) {
    const [node, children] = line.split(': ');
    graph[node] = children.split(' ');
  }
  const memo = {};
  function dfs(node, seenDac, seenFft) {
    seenDac ||= node === 'dac';
    seenFft ||= node === 'fft';
    if (node === 'out') return seenDac && seenFft;
    const key = `${node}-${seenDac}-${seenFft}`;
    if (key in memo) return memo[key];
    let total = 0;
    for (const child of graph[node]) {
      total += dfs(child, seenDac, seenFft);
    }
    memo[key] = total;
    return total;
  }
  const result = dfs('svr', false, false);
  console.log(result);
}
solve2(input);
