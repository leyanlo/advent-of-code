function getModesAndOpcode(n) {
  const paddedN = ('' + n).padStart(5, '0');
  return [
    paddedN
      .substr(0, 3)
      .split('')
      .reverse()
      .map((s) => +s),
    +paddedN.substr(3),
  ];
}

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function intcode(input, puzzleInput) {
  const arr = [...puzzleInput];
  let i = 0;
  let relativeBase = 0;
  let [modes, opcode] = getModesAndOpcode(arr[i]);

  const hull = {
    '0,0': input,
  };
  let robotCoords = [0, 0];
  let robotDirIdx = 0;
  let robotInstrCount = 0;

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
        arr[paramIndices[0]] = hull[robotCoords.join()] || 0;
        i += 2;
        break;
      case 4:
        const output = arr[paramIndices[0]] || 0;
        if (robotInstrCount % 2 === 0) {
          // paint
          hull[robotCoords.join()] = output;
        } else {
          // turn
          if (output === 0 || output === 1) {
            robotDirIdx = robotDirIdx + (output === 0 ? -1 : 1);
            robotCoords = robotCoords.map((coord, i) => {
              return coord + dirs[((robotDirIdx % 4) + 4) % 4][i];
            });
          }
        }
        robotInstrCount++;
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
  return hull;
}

function solve1(puzzleInput) {
  const hull = intcode(0, puzzleInput);
  console.log(Object.keys(hull).length);
}

function solve2(puzzleInput) {
  const hull = intcode(1, puzzleInput);

  const coords = Object.keys(hull).map((coord) =>
    coord.split(',').map((s) => +s)
  );

  const { domain, range } = coords.reduce(
    ({ domain, range }, [x, y]) => {
      return {
        domain: [Math.min(x, domain[0]), Math.max(x, domain[1])],
        range: [Math.min(y, range[0]), Math.max(y, range[1])],
      };
    },
    {
      domain: [0, 0],
      range: [0, 0],
    }
  );

  for (let y = range[1]; y >= range[0]; y--) {
    const row = [...Array(domain[1] - domain[0]).keys()].map((i) => {
      const x = domain[0] + i;
      const panel = hull[[x, y].join()];
      return panel ? '##' : '  ';
    });
    console.log(row.join(''));
  }
}

const puzzleInput = `3,8,1005,8,324,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,29,2,1102,17,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,55,2,4,6,10,1,1006,10,10,1,6,14,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,89,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,110,1,104,8,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,137,2,9,17,10,2,1101,14,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,167,1,107,6,10,1,104,6,10,2,1106,6,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,1001,8,0,200,1006,0,52,1006,0,70,1006,0,52,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,232,1006,0,26,1,104,19,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,260,1,2,15,10,2,1102,14,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,290,1,108,11,10,1006,0,36,1006,0,90,1006,0,52,101,1,9,9,1007,9,940,10,1005,10,15,99,109,646,104,0,104,1,21101,0,666412360596,1,21101,341,0,0,1105,1,445,21101,838366659476,0,1,21102,1,352,0,1106,0,445,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,0,97713695975,1,21102,1,399,0,1106,0,445,21102,179469028392,1,1,21101,410,0,0,1105,1,445,3,10,104,0,104,0,3,10,104,0,104,0,21102,1,988220650260,1,21101,433,0,0,1105,1,445,21101,0,838345843560,1,21101,444,0,0,1106,0,445,99,109,2,22101,0,-1,1,21102,1,40,2,21102,1,476,3,21101,466,0,0,1106,0,509,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,471,472,487,4,0,1001,471,1,471,108,4,471,10,1006,10,503,1101,0,0,471,109,-2,2106,0,0,0,109,4,1202,-1,1,508,1207,-3,0,10,1006,10,526,21101,0,0,-3,22101,0,-3,1,22102,1,-2,2,21102,1,1,3,21101,0,545,0,1106,0,550,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,573,2207,-4,-2,10,1006,10,573,21201,-4,0,-4,1106,0,641,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21102,592,1,0,1106,0,550,21201,1,0,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,611,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,633,22102,1,-1,1,21102,1,633,0,106,0,508,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0`
  .split(',')
  .map((s) => +s);

solve1(puzzleInput);
solve2(puzzleInput);
