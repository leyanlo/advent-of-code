const fs = require('fs');

var input = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input) {
  const instructions = input
    .split('\n')
    .map((line) => [...line.matchAll(/step (\w)/gi)].map((match) => match[1]));
  console.log(instructions);
  const requirements = {};
  for (const [start, end] of instructions) {
    requirements[start] = requirements[start] ?? [];
    requirements[start].push(end);
  }

  let availableSteps = [];
  const steps = [];
  do {
    console.log({ requirements });
    const allSteps = new Set(Object.entries(requirements).flat(2));
    console.log({ allSteps });
    const unavailableSteps = new Set(Object.values(requirements).flat());
    console.log({ unavailableSteps });
    availableSteps = [...allSteps]
      .filter((step) => !unavailableSteps.has(step))
      .sort();
    console.log({ availableSteps });
    if (availableSteps.length) {
      steps.push(availableSteps[0]);
      if (availableSteps.length === 1 && unavailableSteps.size === 1) {
        steps.push(...unavailableSteps);
      }
      delete requirements[availableSteps[0]];
    }
  } while (availableSteps.length);
  console.log(steps.join(''));
}
solve(input);
