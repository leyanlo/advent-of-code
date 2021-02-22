function getModesAndOpcode(n) {
  const paddedN = ('' + n).padStart(5, '0');
  return [
    paddedN.substr(0, 3).split('').reverse().map(Number),
    +paddedN.substr(3),
  ];
}

module.exports = function* intcode(arr) {
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
        arr[paramIndices[0]] = yield;
        i += 2;
        break;
      case 4:
        yield arr[paramIndices[0]] || 0;
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
        throw new Error(`invalid opcode: ${opcode}`);
    }
    [modes, opcode] = getModesAndOpcode(arr[i]);
  }
  return output;
};
