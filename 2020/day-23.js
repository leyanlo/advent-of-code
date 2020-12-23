const inputIdx = 1;

function solve1(input) {
  let cups = input.split('').map(Number);
  console.log({ cups });

  for (let i = 0; i < 100; i++) {
    console.log({ i });
    let pickUp = cups.splice(1, 3);
    console.log({ pickUp });

    let dest = cups[0] - 1;
    while (cups.indexOf(dest) === -1) {
      dest = dest === 0 ? 9 : dest - 1;
    }

    const destI = cups.indexOf(dest);
    console.log({ dest });

    cups.splice(destI + 1, 0, ...pickUp);
    cups = [...cups.slice(1), cups[0]];

    console.log();
    console.log({ cups });
  }

  const i = cups.indexOf(1);
  console.log([...cups, ...cups].slice(i + 1, i + 9).join(''));
}

const inputs = [];
inputs.push(`389125467`);

inputs.push(`974618352`);

solve1(inputs[inputIdx]);
