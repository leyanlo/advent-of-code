const fs = require('fs');

var input = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
// var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

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
function getNextStep(requirements, workers) {
  console.log({ requirements });
  const unavailableSteps = new Set([
    ...Object.values(requirements).flat(),
    ...workers.map((worker) => worker.step),
  ]);
  console.log({ unavailableSteps });
  const nextStep = Object.keys(requirements)
    .filter((step) => !unavailableSteps.has(step))
    .sort()[0];
  console.log({ nextStep });
  return nextStep;
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
  const steps = [];
  const workers = [...Array(nWorkers).keys()].map(() => ({
    step: null,
    remaining: -1,
  }));
  let t = -1;
  while (Object.keys(requirements).length>1) {
    console.log({ t, steps, workers });
    let nextStep = getNextStep(requirements, workers);
    for (const worker of workers) {
      worker.remaining = Math.max(-1, worker.remaining - 1);
      if (worker.remaining === 0) {
        steps.push(worker.step);
        delete requirements[worker.step];
        nextStep = getNextStep(requirements, workers);
        worker.step = null;
        worker.remaining = -1;
      }
      if (nextStep && !worker.step) {
        worker.step = nextStep;
        worker.remaining = nSeconds(nextStep, offset);
        nextStep = getNextStep(requirements, workers);
      }
    }
    t++;
  }
  steps.push(...Object.entries(requirements)[0]);
  console.log(steps.join(''));
  console.log(
    t +
      nSeconds(...Object.values(requirements)[0], offset) +
      workers
        .filter((worker) => worker.remaining !== -1)
        .reduce((acc, worker) => acc + worker.remaining, 0)
  );
}
solve2(input, 2, 0);
