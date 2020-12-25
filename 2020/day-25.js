const inputIdx = 1;
const subjectNum = 7;

function solve(input) {
  const keys = input.split('\n').map(Number);

  const loopSizes = [];
  for (let key of keys) {
    let curr = 1;
    let loopSize = 0;
    while (curr !== key) {
      loopSize++;
      curr = (curr * subjectNum) % 20201227;
    }
    loopSizes.push(loopSize);
  }

  let curr = 1;
  for (let i = 0; i < loopSizes[0]; i++) {
    curr = (curr * keys[1]) % 20201227;
  }
  console.log(curr);
}

const inputs = [];
inputs.push(`5764801
17807724`);

inputs.push(`15335876
15086442`);

solve(inputs[inputIdx]);
