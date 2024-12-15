import { readFileSync } from 'node:fs';

var input = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`;
var input = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;
// var input = `#######
// #...#.#
// #.....#
// #..OO@#
// #..O..#
// #.....#
// #######
//
// <vv<<^^<<^^`;
var input = readFileSync('./day-15-input.txt', 'utf8').trimEnd();

const DIRS = {
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
  '^': [-1, 0],
};

// function solve(input) {
//   let [map, moves] = input.split('\n\n');
//   let start;
//   map = map.split('\n').map((row, i) =>
//     row.split('').map((char, j) => {
//       if (char === '@') {
//         start = [i, j];
//         return '.';
//       }
//       return char;
//     })
//   );
//
//   let curr = start;
//   moves = moves.replaceAll('\n', '').split('');
//   for (const move of moves) {
//     const [di, dj] = DIRS[move];
//     const [i, j] = curr;
//     let [i2, j2] = [i + di, j + dj];
//     switch (map[i2][j2]) {
//       case '.': {
//         curr = [i2, j2];
//         break;
//       }
//       case 'O': {
//         let [i3, j3] = [i2, j2];
//         while (map[i3][j3] === 'O') {
//           i3 += di;
//           j3 += dj;
//         }
//         if (map[i3][j3] === '.') {
//           curr = [i2, j2];
//           map[i2][j2] = '.';
//           while (i2 !== i3 || j2 !== j3) {
//             i2 += di;
//             j2 += dj;
//             map[i2][j2] = 'O';
//           }
//         }
//       }
//     }
//     // console.log(`Move ${move}:`);
//     // console.log(
//     //   map
//     //     .map((row, i) =>
//     //       row
//     //         .map((char, j) => (i === curr[0] && j === curr[1] ? '@' : char))
//     //         .join('')
//     //     )
//     //     .join('\n')
//     // );
//     // console.log();
//   }
//
//   let sum = 0;
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[0].length; j++) {
//       if (map[i][j] === 'O') {
//         sum += 100 * i + j;
//       }
//     }
//   }
//   console.log(sum);
// }
// solve(input);

function solve(input) {
  let [map, moves] = input.split('\n\n');
  let start;
  map = map.split('\n').map((row, i) =>
    row.split('').flatMap((char, j) => {
      switch (char) {
        case '@':
          start = [i, j * 2];
          return '..'.split('');
        case 'O':
          return '[]'.split('');
        default:
          return [char, char];
      }
    })
  );
  let curr = start;

  console.log('Initial state:');
  console.log(
    map
      .map((row, i) =>
        row
          .map((char, j) => (i === curr[0] && j === curr[1] ? '@' : char))
          .join('')
      )
      .join('\n')
  );
  console.log();

  moves = moves.replaceAll('\n', '').split('');
  for (const move of moves) {
    const [di, dj] = DIRS[move];
    const [i, j] = curr;
    let [i2, j2] = [i + di, j + dj];
    outer: switch (map[i2][j2]) {
      case '.': {
        curr = [i2, j2];
        break;
      }

      case '[':
      case ']': {
        if (di === 0) {
          let [i3, j3] = [i2, j2];
          while ('[]'.includes(map[i3][j3])) {
            j3 += dj;
          }
          if (map[i3][j3] === '.') {
            curr = [i2, j2];
            let prev = map[i2][j2];
            map[i2][j2] = '.';
            while (i2 !== i3 || j2 !== j3) {
              i2 += di;
              j2 += dj;
              [prev, map[i2][j2]] = [map[i2][j2], prev];
            }
          }
        } else {
          const start = [
            [i2, j2],
            map[i2][j2] === '[' ? [i2, j + 1] : [i2, j - 1],
          ];
          let frontier = [...start];
          while (frontier.some(([i3, j3]) => '[]'.includes(map[i3][j3]))) {
            const nextFrontier = [];
            for (let [i3, j3] of frontier) {
              if (map[i3][j3] === '.') continue;

              i3 += di;
              switch (map[i3][j3]) {
                case '#':
                  break outer;
                case '.':
                  nextFrontier.push([i3, j3]);
                  break;
                case '[':
                  nextFrontier.push([i3, j3], [i3, j3 + 1]);
                  break;
                case ']':
                  nextFrontier.push([i3, j3], [i3, j3 - 1]);
                  break;
              }
            }
            frontier = nextFrontier;
          }

          curr = [i2, j2];
          let frontier2 = start.map(([i3, j3]) => [i3, j3, map[i3][j3]]);
          for (const [i3, j3] of frontier2) {
            map[i3][j3] = '.';
          }
          while (frontier2.length !== 0) {
            const nextFrontier2 = [];
            for (let [i3, j3, char] of frontier2) {
              i3 += di;
              switch (map[i3][j3]) {
                case '.':
                  map[i3][j3] = char;
                  break;
                case '[':
                  nextFrontier2.push([i3, j3, '['], [i3, j3 + 1, ']']);
                  map[i3][j3] = char;
                  map[i3][j3 + 1] = '.';
                  break;
                case ']':
                  nextFrontier2.push([i3, j3, ']'], [i3, j3 - 1, '[']);
                  map[i3][j3] = char;
                  map[i3][j3 - 1] = '.';
                  break;
              }
            }
            frontier2 = nextFrontier2;
          }
        }
      }
    }
    // console.log(`Move ${move}:`);
    // console.log(
    //   map
    //     .map((row, i) =>
    //       row
    //         .map((char, j) => (i === curr[0] && j === curr[1] ? '@' : char))
    //         .join('')
    //     )
    //     .join('\n')
    // );
    // console.log();
  }

  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === '[') {
        sum += 100 * i + j;
      }
    }
  }
  console.log(sum);
}
solve(input);
