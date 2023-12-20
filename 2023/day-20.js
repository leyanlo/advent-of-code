import { readFileSync } from 'node:fs';

const input = readFileSync('./day-20-input.txt', 'utf8').trimEnd();

function solve(input) {
  const map = {};
  const initialQueue = [];
  for (const line of input.split('\n')) {
    let [l, r] = line.split(' -> ');
    if (l === 'broadcaster') {
      initialQueue.push(
        ...r.split(', ').map((name) => ({ name, pulse: 0, from: 'button' }))
      );
    } else if (l[0] === '%') {
      map[l.substring(1)] = {
        kind: 'ff',
        outputs: r.split(', '),
        pulse: 0,
      };
    } else {
      map[l.substring(1)] = {
        kind: 'conj',
        outputs: r.split(', '),
        inputs: [],
      };
    }
  }

  for (const name in map) {
    for (const output of map[name].outputs) {
      if (map[output]?.kind === 'conj') {
        map[output].inputs.push({ name, pulse: 0 });
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
      const { name, pulse, from } = queue.shift();
      nPulses[pulse]++;
      if (name in buttonCounts && !pulse) {
        buttonCounts[name] ||= i;
      }
      const curr = map[name];
      if (!curr) continue;

      if (curr.kind === 'ff') {
        if (!pulse) {
          curr.pulse = +!curr.pulse;
          queue.push(
            ...curr.outputs.map((out) => ({
              name: out,
              pulse: curr.pulse,
              from: name,
            }))
          );
        }
      } else {
        curr.inputs = curr.inputs.map((inp) =>
          inp.name === from ? { name: from, pulse } : inp
        );
        queue.push(
          ...curr.outputs.map((out) => ({
            name: out,
            pulse: +!curr.inputs.every((inp) => inp.pulse),
            from: name,
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
