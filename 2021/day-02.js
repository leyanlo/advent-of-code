const fs = require('fs');

const input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();
// const input = `forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2`;

function solve(input) {
  const course = input.split('\n').map((line) => {
    const [dir, units] = line.split(' ');
    switch (dir) {
      case 'forward':
        return [0, +units, 0];
      case 'down':
        return [0, 0, +units];
      case 'up':
        return [0, 0, -+units];
    }
  });
  const [depth, horiz] = course.reduce(
    ([y, x, aim], [dy, dx, daim]) => {
      return [dx ? y + aim * dx : y + dy, x + dx, aim + daim];
    },
    [0, 0, 0]
  );
  console.log(depth * horiz);
}

solve(input);

// function solve(input) {
//   const course = input.split('\n').map((line) => {
//     const [dir, units] = line.split(' ');
//     switch (dir) {
//       case 'forward':
//         return [0, +units];
//       case 'down':
//         return [+units, 0];
//       case 'up':
//         return [-+units, 0];
//     }
//   });
//   const [depth, horiz] = course.reduce(([y, x], [dy, dx]) => [y + dy, x + dx], [
//     0,
//     0,
//   ]);
//   console.log(depth * horiz);
// }
//
// solve(input);
