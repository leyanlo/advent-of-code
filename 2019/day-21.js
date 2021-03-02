const fs = require('fs');

const input = fs.readFileSync('./day-21-input.txt', 'utf8');

function getModesAndOpcode(n) {
  const paddedN = ('' + n).padStart(5, '0');
  return [
    paddedN.substr(0, 3).split('').reverse().map(Number),
    +paddedN.substr(3),
  ];
}

function intcode(input, puzzleInput) {
  const arr = [...puzzleInput];
  let i = 0;
  let relativeBase = 0;
  let [modes, opcode] = getModesAndOpcode(arr[i]);
  const output = [];
  while (opcode !== 99) {
    const paramIndices = modes.map((mode, j) => {
      const paramIndex = i + 1 + j;
      switch (mode) {
        case 0:
          return arr[paramIndex] || 0;
        case 1:
          return paramIndex;
        case 2:
          return relativeBase + (arr[paramIndex] || 0);
      }
    });
    switch (opcode) {
      case 1:
        arr[paramIndices[2]] =
          (arr[paramIndices[0]] || 0) + (arr[paramIndices[1]] || 0);
        i += 4;
        break;
      case 2:
        arr[paramIndices[2]] =
          (arr[paramIndices[0]] || 0) * (arr[paramIndices[1]] || 0);
        i += 4;
        break;
      case 3:
        arr[paramIndices[0]] = input.shift();
        i += 2;
        break;
      case 4:
        output.push(arr[paramIndices[0]] || 0);
        i += 2;
        break;
      case 5:
        i = arr[paramIndices[0]] || 0 ? arr[paramIndices[1]] || 0 : i + 3;
        break;
      case 6:
        i = !(arr[paramIndices[0]] || 0) ? arr[paramIndices[1]] || 0 : i + 3;
        break;
      case 7:
        arr[paramIndices[2]] = +(
          (arr[paramIndices[0]] || 0) < (arr[paramIndices[1]] || 0)
        );
        i += 4;
        break;
      case 8:
        arr[paramIndices[2]] = +(
          (arr[paramIndices[0]] || 0) === (arr[paramIndices[1]] || 0)
        );
        i += 4;
        break;
      case 9:
        relativeBase += arr[paramIndices[0]] || 0;
        i += 2;
        break;
      default:
        console.error('invalid opcode', opcode);
    }
    [modes, opcode] = getModesAndOpcode(arr[i]);
  }
  return output;
}

function solve1(puzzleInput) {
  const program = [
    // gap at C
    'NOT C J',
    'AND D J',
    // gap at A
    'NOT A T',
    'OR T J',
    'WALK',
    '',
  ].join('\n');
  const output = intcode(
    program.split('').map((c) => c.charCodeAt(0)),
    puzzleInput
  );
  console.log(output[output.length - 1]);
}

function solve2(puzzleInput) {
  const program = [
    // gap at C
    'NOT C J',
    'AND D J',
    // also gaps at E and H
    'NOT E T',
    'NOT T T',
    'OR H T',
    'AND T J',
    // gaps at B and and E
    'NOT B T',
    'NOT T T',
    'OR E T',
    'NOT T T',
    'OR T J',
    // gap at A
    'NOT A T',
    'OR T J',
    'RUN',
    '',
  ].join('\n');

  const output = intcode(
    program.split('').map((c) => c.charCodeAt(0)),
    puzzleInput
  );
  console.log(output[output.length - 1]);
}

const puzzleInput = input
  .split(',')
  .map(Number);

solve1(puzzleInput);
solve2(puzzleInput);
