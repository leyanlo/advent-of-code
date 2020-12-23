const inputIdx = 1;
const debug = false;
const part1 = true;
const part2 = true;

function solve1(input) {
  const labels = input.split('').map(Number);
  const max = labels.length;
  const nextMap = labels.reduce((nextMap, label, i) => {
    nextMap[label] = labels[(i + 1) % max];
    return nextMap;
  }, {});

  let curr = labels[0];
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

function solve2(input) {
  const labels = input.split('').map(Number);
  const max = 1000000;
  const nextMap = {};
  for (let i = 0; i < max; i++) {
    nextMap[labels[i] || i + 1] = labels[i + 1] || i + 2;
  }
  nextMap[max] = labels[0];

  let curr = labels[0];
  for (let i = 0; i < 10000000; i++) {
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

  console.log(nextMap[1] * nextMap[nextMap[1]]);
}

const inputs = [];
inputs.push(`389125467`);

inputs.push(`974618352`);

part1 && solve1(inputs[inputIdx]);
part2 && solve2(inputs[inputIdx]);
