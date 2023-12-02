const fs = require('fs');

var input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
var input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();
// 2206 wrong
// 149 wrong

// function solve(input) {
//   // console.log(input);
//
//   let sum = 0;
//   outer: for (const line of input.split('\n')) {
//     console.log(line);
//     let [game, sets] = line.split(': ');
//     game = +game.match(/\d+/);
//     console.log(game);
//
//     sets = sets.split('; ');
//     let nRed = 12;
//     let nGreen = 13;
//     let nBlue = 14;
//     for (const set of sets) {
//       console.log(set);
//       const cubes = set.split(', ');
//       for (const cube of cubes) {
//         let [n, color] = cube.split(' ');
//         n = +n;
//         switch (color) {
//           case 'red':
//             if (n > nRed) continue outer;
//             break;
//           case 'green':
//             if (n > nGreen) continue outer;
//             break;
//           case 'blue':
//             if (n > nBlue) continue outer;
//             break;
//         }
//       }
//     }
//     console.log(game, 'POSSIBLE!');
//     sum += game;
//   }
//   console.log(sum);
// }
function solve(input) {
  // console.log(input);

  let sum = 0;
  outer: for (const line of input.split('\n')) {
    console.log(line);
    let [game, sets] = line.split(': ');
    game = +game.match(/\d+/);
    console.log(game);

    sets = sets.split('; ');
    const mins = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const set of sets) {
      console.log(set);
      const cubes = set.split(', ');
      for (const cube of cubes) {
        let [n, color] = cube.split(' ');
        n = +n;
        mins[color] = Math.max(mins[color], n);
      }
    }
    sum += mins.red * mins.green * mins.blue;
  }
  console.log(sum);
}
solve(input);
