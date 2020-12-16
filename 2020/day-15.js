const inputIdx = 1;

function solve(input, iters) {
  const seen = input.reduce((seen, num, i) => {
    seen[num] = i + 1;
    return seen;
  }, new Uint32Array(iters)); // use Uint32Array for performance on V8

  let next = 0;
  for (let i = input.length; i < iters - 1; i++) {
    const prev = seen[next];
    seen[next] = i + 1;
    next = prev ? i + 1 - prev : 0;
  }

  console.log(next);
}

function solve1(input) {
  solve(input, 2020);
}

function solve2(input) {
  solve(input, 30000000);
}

let inputs = [];
inputs.push(`0,3,6`);
inputs.push(`1,2,16,19,18,0`);

inputs = inputs.map((s) => s.split(',').map(Number));

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
