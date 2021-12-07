const fs = require('fs');

var input = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
// var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function getNextStep(requirements) {
  console.log({ requirements });
  const unavailableSteps = new Set(Object.values(requirements).flat());
  console.log({ unavailableSteps });
  const nextStep = Object.keys(requirements)
    .filter((step) => !unavailableSteps.has(step))
    .sort()[0];
  console.log({ nextStep });
  return nextStep;
}

function solve(input) {
  const instructions = input
    .split('\n')
    .map((line) => [...line.matchAll(/step (\w)/gi)].map((match) => match[1]));
  const requirements = {};
  for (const [start, end] of instructions) {
    requirements[start] = requirements[start] ?? [];
    requirements[start].push(end);
  }
  const steps = [];
  while (Object.keys(requirements).length > 1) {
    const nextStep = getNextStep(requirements);
    steps.push(nextStep);
    delete requirements[nextStep];
  }
  steps.push(...Object.entries(requirements)[0]);
  console.log(steps.join(''));
}
solve(input);
