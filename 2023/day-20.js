import { readFileSync } from 'node:fs';

const input = readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = {};
  const initialQueue = [];
  for (const line of input.split('\n')) {
    let [l, r] = line.split(' -> ');
    if (l === 'broadcaster') {
      initialQueue.push(
        ...r.split(', ').map((module) => ({ module, pulse: 0, from: 'button' }))
      );
    } else if (l[0] === '%') {
      map[l.substring(1)] = {
        kind: 'ff',
        outputs: r.split(', '),
        state: 0,
      };
    } else {
      map[l.substring(1)] = {
        kind: 'conj',
        outputs: r.split(', '),
        inputs: [],
      };
    }
  }

  for (const module in map) {
    const outputs = map[module].outputs;
    for (const output of outputs) {
      if (map[output]?.kind === 'conj') {
        map[output].inputs.push({ module, state: 0 });
      }
    }
  }

  // these lead to gq, which lead to rx
  const buttonCounts = {
    xj: null,
    qs: null,
    kz: null,
    km: null,
  };
  let i = 0;
  const nPulses = [0, 0];
  while (!Object.values(buttonCounts).every(Boolean)) {
    const queue = [...initialQueue];
    nPulses[0]++;
    while (queue.length) {
      const { module, pulse, from } = queue.shift();
      nPulses[pulse]++;
      if (module in buttonCounts && !pulse) {
        buttonCounts[module] ||= i;
      }
      const input = map[module];
      if (!input) continue;

      if (input.kind === 'ff') {
        if (!pulse) {
          input.state = +!input.state;
          queue.push(
            ...input.outputs.map((m) => ({
              module: m,
              pulse: input.state,
              from: module,
            }))
          );
        }
      } else {
        input.inputs = input.inputs.map((i) =>
          i.module === from
            ? {
                module: from,
                state: pulse,
              }
            : i
        );
        queue.push(
          ...input.outputs.map((m) => ({
            module: m,
            pulse: +!input.inputs.every((i) => i.state),
            from: module,
          }))
        );
      }
    }
    i++;
    if (i === 1000) {
      console.log(nPulses[0] * nPulses[1]);
    }
  }
  console.log(Object.values(buttonCounts).reduce((acc, n) => acc * (n + 1), 1));
}
solve(input);
