import { readFileSync } from 'node:fs';

const input = readFileSync('./day-02-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let sum = 0;
  outer: for (const line of input.split('\n')) {
    let [game, sets] = line.split(': ');
    game = +game.match(/\d+/);
    sets = sets.split('; ');
    for (const set of sets) {
      const cubes = set.split(', ');
      const totals = {
        red: 12,
        green: 13,
        blue: 14,
      };
      for (const cube of cubes) {
        let [n, color] = cube.split(' ');
        n = +n;
        if (n > totals[color]) continue outer;
      }
    }
    sum += game;
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  let sum = 0;
  for (const line of input.split('\n')) {
    let [game, sets] = line.split(': ');
    game = +game.match(/\d+/);
    sets = sets.split('; ');
    const mins = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const set of sets) {
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
solve2(input);
