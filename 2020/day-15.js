const inputIdx = 1;

function solve(input, iters) {
  const map = input.reduce((map, num, i) => {
    map[num] = [i + 1];
    return map;
  }, {});

  let last = input[input.length - 1];
  for (let i = input.length; i < iters; i++) {
    if (i % 1000000 === 0) {
      console.log(i);
    }
    const spoken = map[last][1] ? map[last][0] - map[last][1] : 0;
    map[spoken] = map[spoken] || [];
    map[spoken].unshift(i + 1);
    map[spoken].length = Math.min(2, map[spoken].length);
    last = spoken;
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

inputs = inputs.map((s) => s.split(','));

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
