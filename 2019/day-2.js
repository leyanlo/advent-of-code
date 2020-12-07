function solve1(input) {
  const arr = [...input];
  let i = 0;
  let opcode = arr[i];
  while (opcode !== 99) {
    if (opcode === 1) {
      arr[arr[i + 3]] = arr[arr[i + 1]] + arr[arr[i + 2]];
    } else if (opcode === 2) {
      arr[arr[i + 3]] = arr[arr[i + 1]] * arr[arr[i + 2]];
    } else {
      console.error('invalid opcode', opcode);
      break;
    }
    i += 4;
    opcode = arr[i];
  }
  console.log(arr[0]);
}

function solve2(input) {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const program = [...input];
      program[1] = noun;
      program[2] = verb;
      let i = 0;
      let opcode = program[i];
      while (opcode !== 99) {
        if (opcode === 1) {
          program[program[i + 3]] =
            program[program[i + 1]] + program[program[i + 2]];
        } else if (opcode === 2) {
          program[program[i + 3]] =
            program[program[i + 1]] * program[program[i + 2]];
        } else {
          console.error('invalid opcode', opcode);
          break;
        }
        i += 4;
        opcode = program[i];
      }
      if (program[0] === 19690720) {
        console.log(100 * noun + verb);
        break;
      }
    }
  }
}

const input = `1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,6,19,23,1,10,23,27,2,27,13,31,1,31,6,35,2,6,35,39,1,39,5,43,1,6,43,47,2,6,47,51,1,51,5,55,2,55,9,59,1,6,59,63,1,9,63,67,1,67,10,71,2,9,71,75,1,6,75,79,1,5,79,83,2,83,10,87,1,87,5,91,1,91,9,95,1,6,95,99,2,99,10,103,1,103,5,107,2,107,6,111,1,111,5,115,1,9,115,119,2,119,10,123,1,6,123,127,2,13,127,131,1,131,6,135,1,135,10,139,1,13,139,143,1,143,13,147,1,5,147,151,1,151,2,155,1,155,5,0,99,2,0,14,0`
  .split(',')
  .map((s) => +s);

solve1(input);
solve2(input);
