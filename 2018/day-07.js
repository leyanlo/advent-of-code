const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function getNextStep(requirements, workers, steps) {
  const unavailableSteps = new Set([
    ...Object.keys(requirements)
      .filter((step) => !steps.has(step))
      .flatMap((step) => requirements[step]),
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
  return step.codePointAt(0) - aCodePoint + 1 + offset;
}

function solve(input, nWorkers, offset, part) {
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
  if (part === 1) {
    console.log([...steps].join(''));
  } else {
    console.log(t);
  }
}
solve(input, 1, 0, 1);
solve(input, 5, 60, 2);
