const fs = require('fs');

var input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;
var input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();
// 26270 wrong

// function rotate(map) {
//   return map[0].split('').map((_, j) => map.map((_, i) => map[i][j]).join(''));
// }

function rotate(map) {
  return map[0].map((_, j) => map.map((_, i) => map[i][j]));
}

// function getReflection(map) {
//   outer: for (let i = 0; i < map.length - 1; i++) {
//     if (map[i] === map[i + 1]) {
//       for (let j = i - 1; j >= 0; j--) {
//         const delta = i - j;
//         if (!map[j] || !map[i + 1 + delta]) {
//           break;
//         }
//         if (map[j] !== map[i + 1 + delta]) {
//           continue outer;
//         }
//       }
//       return i + 1;
//     }
//   }
//   return 0;
// }

function getErrors(a, b) {
  a = a.toString(2);
  b = b.toString(2);
  const maxLength = Math.max(a.length, b.length);
  a = a.padStart(maxLength, '0');
  b = b.padStart(maxLength, '0');
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    count += +(a[i] !== b[i]);
  }
  return count;
}

function getReflection(map) {
  outer: for (let i = 0; i < map.length - 1; i++) {
    let nErrors = getErrors(map[i], map[i + 1]);
    if (nErrors <= 1) {
      for (let j = i - 1; j >= 0; j--) {
        const delta = i - j;
        if (!map[j] || !map[i + 1 + delta]) {
          break;
        }
        nErrors += getErrors(map[j], map[i + 1 + delta]);
        if (nErrors > 1) {
          continue outer;
        }
      }
      if (nErrors === 1) {
        return i + 1;
      }
    }
  }
  return 0;
}

// function solve(input) {
//   console.log(input);
//   let sum = 0;
//   for (let map of input.split('\n\n')) {
//     map = map.split('\n');
//     const rot = rotate(map);
//     // console.log(map);
//     // console.log(rot);
//
//     const hReflect = getReflection(map);
//     const vReflect = getReflection(rot);
//     console.log({ hReflect, vReflect });
//     sum += hReflect * 100;
//     sum += vReflect;
//
//     console.log(sum);
//   }
// }
// solve(input);

function solve(input) {
  // console.log(input);
  let sum = 0;
  for (let map of input.split('\n\n')) {
    map = map
      .split('\n')
      .map((line) => line.split('').map((char) => +(char === '#')));
    let rot = rotate(map);
    map = map.map((row) => parseInt(row.join(''), 2));
    rot = rot.map((row) => parseInt(row.join(''), 2));
    console.log(map);
    console.log(rot);

    const hReflect = getReflection(map);
    const vReflect = getReflection(rot);
    console.log({ hReflect, vReflect });
    if (hReflect && vReflect) debugger;
    sum += hReflect * 100;
    sum += vReflect;

    console.log(sum);
  }
}
solve(input);
