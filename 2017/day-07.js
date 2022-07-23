const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function addTotalWeight(programs, bottomName) {
  const program = programs[bottomName];
  const aboveWeights = program.aboveNames.reduce((acc, name) => {
    acc[name] = addTotalWeight(programs, name);
    return acc;
  }, {});
  const counts = Object.values(aboveWeights).reduce((acc, weight) => {
    acc[weight] = (acc[weight] ?? 0) + 1;
    return acc;
  }, {});
  if (Object.keys(counts).length === 2) {
    const wrongWeight = +Object.entries(counts).filter(
      ([, count]) => count === 1
    )[0][0];
    const rightWeight = +Object.entries(counts).filter(
      ([, count]) => count !== 1
    )[0][0];
    const wrongName = Object.entries(aboveWeights).filter(
      ([, weight]) => weight === wrongWeight
    )[0][0];
    console.log(programs[wrongName].weight + rightWeight - wrongWeight);
    // update value to be correct to avoid other errors
    aboveWeights[wrongName] = rightWeight;
  }
  program.totalWeight = Object.values(aboveWeights).reduce(
    (acc, n) => acc + n,
    program.weight
  );
  return program.totalWeight;
}

function solve(input) {
  const programs = input.split('\n').reduce((acc, line) => {
    const [left, right] = line.split(' -> ');
    let [, name, weight] = left.match(/^(\w+) \((\d+)\)$/);
    weight = +weight;
    const aboveNames = right?.split(', ') ?? [];
    acc[name] = { weight, aboveNames };
    return acc;
  }, {});
  const aboveNames = Object.values(programs).flatMap(
    ({ aboveNames }) => aboveNames
  );
  const bottomName = Object.keys(programs).filter(
    (name) => !aboveNames.includes(name)
  )[0];
  console.log(bottomName);

  addTotalWeight(programs, bottomName);
}
solve(input);
