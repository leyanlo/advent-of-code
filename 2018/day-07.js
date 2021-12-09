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
function getNextStep(requirements, workers) {
  // console.log({ requirements });
  const unavailableSteps = new Set([
    ...Object.values(requirements).flat(),
    ...workers.map((worker) => worker.step),
  ]);
  // console.log({ unavailableSteps });
  const nextStep = Object.keys(requirements)
    .filter((step) => !unavailableSteps.has(step))
    .sort()[0];
  // console.log({ nextStep });
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
  const workers = [];
  let t = -1;
  outer: do {
    console.log(
      t.toString(10).padStart(3, ' '),
      [...Array(nWorkers).keys()].map((i) => workers[i]?.step ?? '.').join(' '),
      steps.join('')
    );
    let nextStep = getNextStep(requirements, workers);
    for (let i = 0; i < nWorkers; i++) {
      let worker = workers[i];
      if (worker) {
        worker.remaining--;
        if (worker.remaining === 0) {
          steps.push(worker.step);
          if (Object.keys(requirements).length === 1) {
            workers.length = 0;
            break outer;
          }
          delete requirements[worker.step];
          nextStep = getNextStep(requirements, workers);
          workers.splice(i, 1);
          worker = undefined;
        }
      }
      if (nextStep && !worker) {
        workers.push({
          step: nextStep,
          remaining: nSeconds(nextStep, offset),
        });
        nextStep = getNextStep(requirements, workers);
      }
    }
    t++;
  } while (workers.some(({ remaining }) => remaining > -1));
  const lastStep = Object.values(requirements)[0][0];
  workers.push({
    step: lastStep,
    remaining: nSeconds(lastStep, offset),
  });
  for (; workers[0].remaining > 0; workers[0].remaining--) {
    t++;
    console.log(
      t.toString(10).padStart(3, ' '),
      workers.map(({ step }) => step ?? '.').join(' '),
      steps.join('')
    );
  }
  t++;
  steps.push(lastStep);
  console.log(t, steps.join(''));
}
solve2(input, 5, 60);
