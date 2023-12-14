import { readFileSync } from 'node:fs';

var input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
var input = readFileSync('./day-14-input.txt', 'utf8').trimEnd();
// 102512 wrong

// function solve(input) {
//   console.log(input);
//   console.log();
//   const map = input.split('\n').map((line) => line.split(''));
//   for (let j = 0; j < map[0].length; j++) {
//     for (let i = 0; i < map.length; i++) {
//       let i2 = i;
//       while (map[i2][j] === 'O' && map[i2 - 1]?.[j] === '.') {
//         map[i2][j] = '.';
//         i2--;
//         map[i2][j] = 'O';
//       }
//     }
//   }
//   console.log(map.map((row) => row.join('')).join('\n'));
//   console.log();
//
//   let sum = 0;
//   for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[0].length; j++) {
//       if (map[i][j] === 'O') {
//         sum += map.length - i;
//       }
//     }
//   }
//   console.log(sum);
// }
// solve(input);

function rotate(map) {
  return map[0].map((_, j) => map[j].map((_, i) => map[map.length - 1 - i][j]));
}

function move(map) {
  for (let j = 0; j < map[0].length; j++) {
    for (let i = 0; i < map.length; i++) {
      let i2 = i;
      while (map[i2][j] === 'O' && map[i2 - 1]?.[j] === '.') {
        map[i2][j] = '.';
        i2--;
        map[i2][j] = 'O';
      }
    }
  }
}

function score(map) {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'O') {
        sum += map.length - i;
      }
    }
  }
  return sum;
}

function solve(input) {
  console.log(input);
  console.log();
  let map = input.split('\n').map((line) => line.split(''));

  const seen = [];
  for (let i = 0; i < 1000 * 4; i++) {
    move(map);
    map = rotate(map);
    let load = score(map);
    if ((i + 1) % 4 === 0) {
      const cycle = (i + 1) / 4;
      console.log('cycle', cycle, load);
      if (cycle >= 100) {
        if (seen.includes(load)) {
          console.log(cycle - seen.lastIndexOf(load) - 100);
        }
        seen.push(load);
      }
      // console.log(map.map((row) => row.join('')).join('\n'));
    }
  }
  console.log(1000000000 % 9);
  console.log(999 + 1);
}
solve(input);
