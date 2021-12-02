const fs = require('fs');

const input = fs.readFileSync('./day-02-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const course = input.split('\n').map((line) => {
    const [dir, units] = line.split(' ');
    switch (dir) {
      case 'forward':
        return [+units, 0];
      case 'down':
        return [0, +units];
      case 'up':
        return [0, -+units];
    }
  });
  const [horiz, depth] = course.reduce(([x, y], [dx, dy]) => [x + dx, y + dy], [
    0,
    0,
  ]);
  console.log(horiz * depth);
}

solve1(input);

function solve2(input) {
  const course = input.split('\n').map((line) => {
    const [dir, units] = line.split(' ');
    switch (dir) {
      case 'forward':
        return [+units, 0, 0];
      case 'down':
        return [0, 0, +units];
      case 'up':
        return [0, 0, -+units];
    }
  });
  const [horiz, depth] = course.reduce(
    ([x, y, aim], [dx, dy, daim]) => [x + dx, y + aim * dx, aim + daim],
    [0, 0, 0]
  );
  console.log(horiz * depth);
}

solve2(input);
