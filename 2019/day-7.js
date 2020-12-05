require = require("esm")(module);
const $C = require("js-combinatorics");

function getParamsAndOpcode(n) {
  const paddedN = ("" + n).padStart(5, "0");
  return [+paddedN[0], +paddedN[1], +paddedN[2], +paddedN.substr(3)];
}

function intcode(firstInput, secondInput, arr, i = 0) {
  let [mode3, mode2, mode1, opcode] = getParamsAndOpcode(arr[i]);
  let inputCount = 0;
  let output = null;
  while (opcode !== 99) {
    if (opcode === 1) {
      const first = mode1 ? arr[i + 1] : arr[arr[i + 1]];
      const second = mode2 ? arr[i + 2] : arr[arr[i + 2]];
      const position = mode3 ? i + 3 : arr[i + 3];
      arr[position] = first + second;
      i += 4;
    } else if (opcode === 2) {
      const first = mode1 ? arr[i + 1] : arr[arr[i + 1]];
      const second = mode2 ? arr[i + 2] : arr[arr[i + 2]];
      const position = mode3 ? i + 3 : arr[i + 3];
      arr[position] = first * second;
      i += 4;
    } else if (opcode === 3) {
      const position = mode1 ? i + 1 : arr[i + 1];
      inputCount++;
      switch (inputCount) {
        case 1:
          arr[position] = firstInput;
          break;
        case 2:
          arr[position] = secondInput;
          break;
        default:
          console.error("more than two inputs", inputCount);
      }
      i += 2;
    } else if (opcode === 4) {
      const position = mode1 ? i + 1 : arr[i + 1];
      output = arr[position];
      i += 2;
      return [output, i];
    } else if (opcode === 5) {
      const first = mode1 ? arr[i + 1] : arr[arr[i + 1]];
      const second = mode2 ? arr[i + 2] : arr[arr[i + 2]];
      i = first ? second : i + 3;
    } else if (opcode === 6) {
      const first = mode1 ? arr[i + 1] : arr[arr[i + 1]];
      const second = mode2 ? arr[i + 2] : arr[arr[i + 2]];
      i = !first ? second : i + 3;
    } else if (opcode === 7) {
      const first = mode1 ? arr[i + 1] : arr[arr[i + 1]];
      const second = mode2 ? arr[i + 2] : arr[arr[i + 2]];
      const position = mode3 ? i + 3 : arr[i + 3];
      arr[position] = first < second ? 1 : 0;
      i += 4;
    } else if (opcode === 8) {
      const first = mode1 ? arr[i + 1] : arr[arr[i + 1]];
      const second = mode2 ? arr[i + 2] : arr[arr[i + 2]];
      const position = mode3 ? i + 3 : arr[i + 3];
      arr[position] = first === second ? 1 : 0;
      i += 4;
    } else {
      console.error("invalid opcode", opcode);
      break;
    }
    [mode3, mode2, mode1, opcode] = getParamsAndOpcode(arr[i]);
  }
  return [output, -1];
}

function process1(puzzleInput) {
  const permutations = [...new $C.Permutation("01234")].map((arr) => {
    return arr.map((s) => +s);
  });
  const maxSignal = permutations.reduce((maxSignal, permutation) => {
    const signal = permutation.reduce((signal, phaseSetting) => {
      const [output] = intcode(phaseSetting, signal, puzzleInput);
      return output;
    }, 0);
    return Math.max(signal, maxSignal);
  }, 0);
  console.log(maxSignal);
}

function process(puzzleInput) {
  const permutations = [...new $C.Permutation("56789")].map((arr) => {
    return arr.map((s) => +s);
  });
  const maxSignal = permutations.reduce((maxSignal, permutation) => {
    let i = 0;
    let signal = 0;
    const puzzleIndices = [...Array(5)].map(() => 0);
    while (true) {
      const [nextSignal, puzzleIndex] = intcode(
        permutation[i] || signal,
        signal,
        puzzleInput,
        puzzleIndices[i % 5]
      );
      if (nextSignal === null) {
        break;
      }
      signal = nextSignal;
      puzzleIndices[i % 5] = puzzleIndex;
      i++;
    }
    return Math.max(maxSignal, signal);
  }, 0);
  console.log(maxSignal);
}

const puzzleInput = `3,8,1001,8,10,8,105,1,0,0,21,42,67,88,101,114,195,276,357,438,99999,3,9,101,3,9,9,1002,9,4,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,1001,9,3,9,1002,9,2,9,101,2,9,9,102,2,9,9,1001,9,5,9,4,9,99,3,9,102,4,9,9,1001,9,3,9,102,4,9,9,101,4,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,4,9,9,1002,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99`
  .split(",")
  .map((s) => +s);

process(puzzleInput);
