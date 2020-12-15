const inputIdx = 1;

function solve(input, iters) {
  const map = {};
  for (let i = 0; i < input.length - 1; i++) {
    const num = input[i];
    map[num] = i + 1;
  }

  let last = input[input.length - 1];
  for (let i = input.length - 1; i < iters - 1; i++) {
    if (i % 1000000 === 0) {
      console.log(i);
    }

    const next = map[last] ? i + 1 - map[last] : 0;
    map[last] = i + 1;
    last = next;
  }

  console.log(last);
}

function solve1(input) {
  solve(input, 2020);
}

function solve2(input) {
  // paste into Safari for best performance
  solve(input, 30000000);
}

let inputs = [];
inputs.push(`0,3,6`);
inputs.push(`1,2,16,19,18,0`);

inputs = inputs.map((s) => s.split(',').map(Number));

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
