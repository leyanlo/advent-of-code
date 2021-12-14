const fs = require('fs');

const input = fs.readFileSync('./day-14-input.txt', 'utf8').trimEnd();

function solve(input, nSteps) {
  let [template, rules] = input.split('\n\n');

  const nextPairs = rules.split('\n').reduce((acc, rule) => {
    const [left, right] = rule.split(' -> ');
    acc[left] = [left[0] + right, right + left[1]];
    return acc;
  }, {});

  let counts = {};
  for (let i = 0; i < template.length - 1; i++) {
    counts[template.slice(i, i + 2)] =
      (counts[template.slice(i, i + 2)] ?? 0) + 1;
  }

  for (let step = 0; step < nSteps; step++) {
    const nextCounts = {};
    for (const pair in counts) {
      for (const nextPair of nextPairs[pair]) {
        nextCounts[nextPair] = (nextCounts[nextPair] ?? 0) + counts[pair];
      }
    }
    counts = nextCounts;
  }

  const elCounts = {
    [template[0]]: 1,
  };
  for (const pair in counts) {
    elCounts[pair[1]] = (elCounts[pair[1]] ?? 0) + counts[pair];
  }

  console.log(
    Math.max(...Object.values(elCounts)) - Math.min(...Object.values(elCounts))
  );
}
solve(input, 10);
solve(input, 40);
