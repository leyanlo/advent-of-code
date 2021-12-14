const fs = require('fs');

const input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function solve(input, nSteps) {
  let [template, rules] = input.split('\n\n');

  const nextPairs = rules.split('\n').reduce((acc, rule) => {
    const [left, right] = rule.split(' -> ');
    acc[left] = [left[0] + right, right + left[1]];
    return acc;
  }, {});

  let pairCounts = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template.slice(i, i + 2);
    pairCounts[pair] = (pairCounts[pair] ?? 0) + 1;
  }

  for (let step = 0; step < nSteps; step++) {
    const nextCounts = {};
    for (const pair in pairCounts) {
      for (const nextPair of nextPairs[pair]) {
        nextCounts[nextPair] = (nextCounts[nextPair] ?? 0) + pairCounts[pair];
      }
    }
    pairCounts = nextCounts;
  }

  const elCounts = {
    [template[0]]: 1,
  };
  for (const pair in pairCounts) {
    elCounts[pair[1]] = (elCounts[pair[1]] ?? 0) + pairCounts[pair];
  }

  console.log(
    Math.max(...Object.values(elCounts)) - Math.min(...Object.values(elCounts))
  );
}
solve(input, 10);
solve(input, 40);
