import { readFileSync } from 'node:fs';

import { init } from 'z3-solver';

const { Context, em } = await init();
const Z3 = Context('main');

const input = readFileSync('./day-10-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const machines = input.split('\n').map((line) => {
    const parts = line.split(' ');
    const lights = parts[0]
      .slice(1, -1)
      .split('')
      .map((c) => c === '#');
    const wirings = parts
      .slice(1, -1)
      .map((p) => Array.from(p.matchAll(/\d+/g)).map(Number));
    const joltages = Array.from(parts.at(-1).matchAll(/\d+/g)).map(Number);
    return { lights, wirings, joltages };
  });

  let sum = 0;
  for (const { lights, wirings } of machines) {
    const target = lights.join();
    let nPresses = 0;
    let queue = [lights.map(() => false)];
    const seen = new Set();
    outer: while (true) {
      const nextQueue = new Set();
      for (const state of queue) {
        const key = state.join();
        if (key === target) {
          sum += nPresses;
          break outer;
        }
        if (seen.has(key)) continue;
        seen.add(key);

        for (const wiring of wirings) {
          const newState = state.slice();
          for (const index of wiring) {
            newState[index] = !newState[index];
          }
          const newKey = newState.join();
          nextQueue.add(newKey);
        }
      }
      queue = Array.from(nextQueue).map((s) =>
        s.split(',').map((c) => c === 'true')
      );
      nPresses++;
    }
  }
  console.log(sum);
}
solve1(input);

async function solveMachine(machine) {
  const { wirings, joltages } = machine;
  const opt = new Z3.Optimize();

  const presses = wirings.map((_, j) => Z3.Int.const(`w${j}`));
  for (const p of presses) {
    opt.add(p.ge(0)); // non-negative
  }

  // Build A[i][j] = 1 if wiring j increments index i
  const A = joltages.map(() => wirings.map(() => 0));
  for (let j = 0; j < wirings.length; j++) {
    for (const i of wirings[j]) {
      A[i][j]++;
    }
  }

  // Constraints: A * x = target
  for (let i = 0; i < joltages.length; i++) {
    let sum = Z3.Int.val(0);
    for (let j = 0; j < wirings.length; j++) {
      if (A[i][j] !== 0) {
        sum = sum.add(presses[j].mul(A[i][j]));
      }
    }
    opt.add(sum.eq(joltages[i]));
  }

  // Objective: minimize total presses
  const nPresses = presses.reduce((acc, v) => acc.add(v), Z3.Int.val(0));
  opt.minimize(nPresses);

  // Solve
  await opt.check();
  const model = opt.model();
  return Number(model.eval(nPresses).value());
}

async function solve2(input) {
  const machines = input.split('\n').map((line) => {
    const parts = line.split(' ');
    const lights = parts[0]
      .slice(1, -1)
      .split('')
      .map((c) => c === '#');
    const wirings = parts
      .slice(1, -1)
      .map((p) => Array.from(p.matchAll(/\d+/g)).map(Number));
    const joltages = Array.from(parts.at(-1).matchAll(/\d+/g)).map(Number);
    return { lights, wirings, joltages };
  });

  let sum = 0;
  for (const machine of machines) {
    sum += await solveMachine(machine);
  }
  console.log(sum);
}
await solve2(input);

// https://github.com/Z3Prover/z3/issues/6701
em.PThread.terminateAllThreads();
