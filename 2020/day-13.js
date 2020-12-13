const inputIdx = 1;

function solve1(input) {
  let [ts, ids] = input;
  ts = +ts;
  ids = ids
    .split(',')
    .filter((s) => s !== 'x')
    .map((s) => +s);
  let min = ids[0] - (ts % ids[0]);
  let minId = 0;
  for (let i = 1; i < ids.length; i++) {
    const id = ids[i];
    const curr = id - (ts % id);
    if (curr < min) {
      min = curr;
      minId = id;
    }
  }
  console.log(min * minId);
}

function solve2(input) {
  let [, ids] = input;

  ids = ids.split(',').map((s) => +s);

  let earliestTs = ids[0];
  let currProduct = ids[0];
  for (let i = 1; i < ids.length; i++) {
    const id = ids[i];
    if (isNaN(id)) {
      continue;
    }
    while ((earliestTs + i) % id) {
      earliestTs += currProduct;
    }
    currProduct *= id;
  }
  console.log(earliestTs);
}

let inputs = [];
inputs.push(`939
7,13,x,x,59,x,31,19`);

inputs.push(`1000508
29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,467,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,19,x,x,x,x,x,x,x,x,x,x,x,443,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`);

inputs = inputs.map((s) => s.split('\n'));

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
