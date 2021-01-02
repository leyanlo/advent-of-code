const debug = false;

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
  let count = 0;
  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 50; j++) {
      count += intcode([i, j], puzzleInput)[0];
    }
  }
  console.log(count);
}

function solve2(puzzleInput) {
  for (let y = 0; y < 100; y++) {
    let row = [];
    for (let x = 0; x < 100; x++) {
      row.push(intcode([x, y], puzzleInput)[0] ? '#' : '.');
    }
    debug && console.log(row.join(''));
  }

  let y = 0;
  let x = 0;
  for (let validRow, validCol; !validRow || !validCol; y++) {
    debug && console.log(x, y);

    // get left-most point affected by beam
    validRow = false;
    for (let dx = 0; dx < 100; dx++) {
      if (intcode([x + dx, y], puzzleInput)[0]) {
        x += dx;
        validRow = true;
        break;
      }
    }

    // no beam points on this row
    if (!validRow) {
      continue;
    }

    // iterate dx over beam region with width > 100
    for (let dx = 0; intcode([x + dx + 99, y], puzzleInput)[0]; dx++) {
      // find beam region with height > 100
      if (intcode([x + dx, y + 99], puzzleInput)[0]) {
        x += dx;
        validCol = true;
        break;
      }
    }
  }
  console.log(10000 * x + y - 1);
}

`#.......................................
.#......................................
..##....................................
...###..................................
....###.................................
.....####...............................
......#####.............................
......######............................
.......#######..........................
........########........................
.........#########......................
..........#########.....................
...........##########...................
...........############.................
............############................
.............#############..............
..............##############............
...............###############..........
................###############.........
................#################.......
.................########OOOOOOOOOO.....
..................#######OOOOOOOOOO#....
...................######OOOOOOOOOO###..
....................#####OOOOOOOOOO#####
.....................####OOOOOOOOOO#####
.....................####OOOOOOOOOO#####
......................###OOOOOOOOOO#####
.......................##OOOOOOOOOO#####
........................#OOOOOOOOOO#####
.........................OOOOOOOOOO#####
..........................##############
..........................##############
...........................#############
............................############
.............................###########`;

const puzzleInput = `109,424,203,1,21102,1,11,0,1106,0,282,21101,0,18,0,1106,0,259,1202,1,1,221,203,1,21101,0,31,0,1105,1,282,21102,38,1,0,1105,1,259,20102,1,23,2,21201,1,0,3,21102,1,1,1,21101,0,57,0,1105,1,303,2101,0,1,222,20102,1,221,3,21002,221,1,2,21101,0,259,1,21101,0,80,0,1106,0,225,21102,1,152,2,21101,91,0,0,1106,0,303,1201,1,0,223,21001,222,0,4,21101,0,259,3,21102,225,1,2,21101,0,225,1,21102,1,118,0,1105,1,225,20101,0,222,3,21102,61,1,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,148,1,0,1105,1,259,2101,0,1,223,21001,221,0,4,21001,222,0,3,21101,0,14,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21101,0,195,0,105,1,109,20207,1,223,2,20101,0,23,1,21102,-1,1,3,21102,214,1,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,2101,0,-4,249,21202,-3,1,1,21202,-2,1,2,21201,-1,0,3,21102,1,250,0,1106,0,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22102,1,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21202,-2,1,3,21101,343,0,0,1106,0,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21101,0,384,0,1106,0,303,1105,1,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21201,1,0,-4,109,-5,2106,0,0`
  .split(',')
  .map(Number);

solve1(puzzleInput);
solve2(puzzleInput);
