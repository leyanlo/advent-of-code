const inputIdx = 1;
const debug = false;
const part1 = true;
const part2 = false;

function solve1(input) {
  const labels = input.split('').map(Number);
  const nextMap = labels.reduce((nextMap, label, i) => {
    nextMap[label] = labels[(i + 1) % labels.length];
    return nextMap;
  }, {});
  let curr = labels[0];
  const max = 9;

  for (let i = 0; i < 100; i++) {
    const pickup = [
      nextMap[curr],
      nextMap[nextMap[curr]],
      nextMap[nextMap[nextMap[curr]]],
    ];

    let dest = ((curr - 2 + max) % max) + 1;
    while (pickup.includes(dest)) {
      dest = ((dest - 2 + max) % max) + 1;
    }

    debug && console.log({ i, nextMap, curr, pickup, dest });

    nextMap[curr] = nextMap[pickup[2]];
    const tmp = nextMap[dest];
    nextMap[dest] = pickup[0];
    nextMap[pickup[2]] = tmp;
    curr = nextMap[curr];
  }

  console.log(
    [...Array(max - 1)]
      .reduce(
        (cups) => {
          cups.push(nextMap[cups[cups.length - 1]]);
          return cups;
        },
        [1]
      )
      .slice(1)
      .join('')
  );
}

function solve2(input) {}

const inputs = [];
inputs.push(`389125467`);

inputs.push(`974618352`);

part1 && solve1(inputs[inputIdx]);
part2 && solve2(inputs[inputIdx]);
