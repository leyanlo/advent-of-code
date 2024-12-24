import { readFileSync, writeFileSync } from 'node:fs';

import { execSync } from 'child_process';

const input = readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const [top, bottom] = input.split('\n\n');
  const map = {};
  for (const line of top.split('\n')) {
    const [left, right] = line.split(': ');
    map[left] = +right;
  }

  const queue = bottom.split('\n').map((line) => line.split(' '));
  for (const line of queue) {
    const [a, op, b, , c] = line;
    if (map[a] === undefined || map[b] === undefined) {
      queue.push(line);
      continue;
    }

    switch (op) {
      case 'AND': {
        map[c] = map[a] & map[b];
        break;
      }
      case 'OR': {
        map[c] = map[a] | map[b];
        break;
      }
      case 'XOR': {
        map[c] = map[a] ^ map[b];
        break;
      }
    }
  }

  console.log(
    'Part 1:',
    parseInt(
      Object.keys(map)
        .filter((k) => k[0] === 'z')
        .sort((a, b) => b.localeCompare(a))
        .map((k) => map[k])
        .join(''),
      2
    )
  );
}
solve1(input);

function swap(c, [a, b]) {
  if (c === a) return b;
  if (c === b) return a;
  return c;
}

function toBit(i) {
  return i.toString().padStart(2, '0');
}

function solve2(input) {
  const [top, bottom] = input.split('\n\n');
  const nBits = top.split('\n').length / 2;

  // inspect day-24.svg to determine which swaps will fix the errors
  const swaps = [
    // ['z07', 'nqk'],
    // ['pcp', 'fgt'],
    // ['z24', 'fpq'],
    // ['z32', 'srn'],
  ];

  const errors = [];
  for (let i = 0; i < nBits; i++) {
    const map = {};
    for (let j = 0; j < nBits; j++) {
      map['x' + toBit(j)] = +(i === j);
      map['y' + toBit(j)] = 0;
    }

    const queue = bottom.split('\n').map((line) => line.split(' '));
    for (const line of queue) {
      let [a, op, b, , c] = line;

      for (const s of swaps) {
        c = swap(c, s);
      }

      if (map[a] === undefined || map[b] === undefined) {
        queue.push(line);
        continue;
      }

      switch (op) {
        case 'AND': {
          map[c] = map[a] & map[b];
          break;
        }
        case 'OR': {
          map[c] = map[a] | map[b];
          break;
        }
        case 'XOR': {
          map[c] = map[a] ^ map[b];
          break;
        }
      }
    }

    const binary = Object.keys(map)
      .filter((k) => k[0] === 'z')
      .sort((a, b) => b.localeCompare(a))
      .map((k) => map[k])
      .join('');
    const isError = 2 ** i !== parseInt(binary, 2);
    console.log(`${'x' + toBit(i)}=1`, `z=${binary}`, isError ? '❌ ' : '✅ ');
    if (isError) {
      errors.push('z' + toBit(i));
    }
  }

  console.log(
    errors.length !== 0
      ? `Error bits: ${errors.join()}`
      : `Part 2: ${swaps.flat().sort().join()}`
  );

  const digraph = ['digraph {'];
  for (const line of bottom.split('\n')) {
    const [a, op, b, , c] = line.split(' ');
    digraph.push(`  {${a} ${b}} -> ${c} [label="${op}"]`);
  }
  for (const error of errors) {
    digraph.push(`  ${error} [style="filled" color="#f00"]`);
  }
  digraph.push('}');
  writeFileSync('day-24.dot', digraph.join('\n'));
  execSync('dot -Tsvg day-24.dot > day-24.svg');
}
solve2(input);
