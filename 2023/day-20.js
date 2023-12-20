import { readFileSync } from 'node:fs';

var input = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;
var input = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;
var input = readFileSync('./day-20-input.txt', 'utf8').trimEnd();
// 625185522 too low

function solve(input) {
  // console.log(input);
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
  // console.log('map', map);
  // console.log('initialQueue', initialQueue);

  const nPulses = [0, 0];
  for (let i = 0; i < 1000; i++) {
    const queue = [...initialQueue];
    nPulses[0]++;
    while (queue.length) {
      const { module, pulse, from } = queue.shift();
      nPulses[pulse]++;
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
    // console.log('map', map);
    // console.log('nPulses', nPulses);
  }
  console.log('nPulses', nPulses);
  console.log(nPulses[0] * nPulses[1]);
}
solve(input);
