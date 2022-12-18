require = require('esm')(module);
const fs = require('fs');

const $C = require('js-combinatorics');

const input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = {};
  for (const line of input.split('\n')) {
    const [, a, change, n, b] = line.match(
      /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)./
    );
    map[a] = map[a] ?? {};
    map[a][b] = (change === 'gain' ? 1 : -1) * +n;
  }
  let permutations = [...new $C.Permutation(Object.keys(map))];
  console.log(
    Math.max(
      ...permutations.map((p) =>
        p
          .map(
            (a, i) =>
              map[a][p[(i + 1) % p.length]] +
              map[a][p[(i - 1 + p.length) % p.length]]
          )
          .reduce((acc, n) => acc + n)
      )
    )
  );

  permutations = [...new $C.Permutation(['me', ...Object.keys(map)])];
  let max = 0;
  for (const p of permutations) {
    max = Math.max(
      max,
      p
        .map(
          (a, i) =>
            (map[a]?.[p[(i + 1) % p.length]] ?? 0) +
            (map[a]?.[p[(i - 1 + p.length) % p.length]] ?? 0)
        )
        .reduce((acc, n) => acc + n)
    );
  }
  console.log(max);
}
solve(input);
