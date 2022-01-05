const fs = require('fs');

var input = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

// function getNextStep(requirements) {
//   console.log({ requirements });
//   const unavailableSteps = new Set(Object.values(requirements).flat());
//   console.log({ unavailableSteps });
//   const nextStep = Object.keys(requirements)
//     .filter((step) => !unavailableSteps.has(step))
//     .sort()[0];
//   console.log({ nextStep });
//   return nextStep;
// }
//
// function solve(input) {
//   const instructions = input
//     .split('\n')
//     .map((line) => [...line.matchAll(/step (\w)/gi)].map((match) => match[1]));
//   const requirements = {};
//   for (const [start, end] of instructions) {
//     requirements[start] = requirements[start] ?? [];
//     requirements[start].push(end);
//   }
//   const steps = [];
//   while (Object.keys(requirements).length > 1) {
//     const nextStep = getNextStep(requirements);
//     steps.push(nextStep);
//     delete requirements[nextStep];
//   }
//   steps.push(...Object.entries(requirements)[0]);
//   console.log(steps.join(''));
// }
// solve(input);
function getNextStep(requirements, workers, steps) {
  const unavailableSteps = new Set([
    ...Object.keys(requirements)
      .filter((s) => !steps.has(s))
      .flatMap((s) => requirements[s]),
    ...workers.map((worker) => worker.step),
    ...steps,
  ]);
  return Object.entries(requirements)
    .flat(2)
    .filter((step) => !unavailableSteps.has(step))
    .sort()[0];
}

const aCodePoint = 'A'.codePointAt(0);
function nSeconds(step, offset) {
  return step.codePointAt(0) - aCodePoint + offset + 1;
}

function solve2(input, nWorkers, offset) {
  const instructions = input
    .split('\n')
    .map((line) => [...line.matchAll(/step (\w)/gi)].map((match) => match[1]));
  const requirements = {};
  for (const [start, end] of instructions) {
    requirements[start] = requirements[start] ?? [];
    requirements[start].push(end);
  }
  const steps = new Set();
  const allSteps = new Set(Object.entries(requirements).flat(2));
  const workers = [...Array(nWorkers)].map(() => ({
    step: null,
    end: 0,
  }));
  let nextStep = getNextStep(requirements, workers, steps);
  let t = -1;
  while (steps.size < allSteps.size) {
    t++;
    checkWorkers: while (true) {
      for (const worker of workers) {
        if (t >= worker.end) {
          let shouldRecheck = false;
          if (worker.step && !steps.has(worker.step)) {
            steps.add(worker.step);
            shouldRecheck = true;
          }
          nextStep = getNextStep(requirements, workers, steps);
          if (nextStep) {
            worker.step = nextStep;
            worker.end = t + nSeconds(nextStep, offset);
            shouldRecheck = true;
          }
          if (shouldRecheck) {
            continue checkWorkers;
          }
        }
      }
      break;
    }
  }
  console.log(t);
}
// solve2(input, 2, 0);
solve2(input, 5, 60);
