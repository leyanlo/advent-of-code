const fs = require('fs');

const input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

const message = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function solve(input) {
  const sues = input.split('\n').map((line) => {
    const split = line.split(/[:,]? /);
    const map = {};
    for (let i = 0; i < split.length; i += 2) {
      map[split[i]] = +split[i + 1];
    }
    return map;
  });
  let part1, part2;
  for (const sue of sues) {
    if (
      Object.keys(message).every(
        (k) => typeof sue[k] === 'undefined' || sue[k] === message[k]
      )
    ) {
      part1 = part1 ?? sue.Sue;
    }
    if (
      Object.keys(message).every((k) => {
        if (typeof sue[k] === 'undefined') {
          return true;
        }
        switch (k) {
          case 'cats':
          case 'trees':
            return sue[k] > message[k];
          case 'pomeranians':
          case 'goldfish':
            return sue[k] < message[k];
          default:
            return sue[k] === message[k];
        }
      })
    ) {
      part2 = part2 ?? sue.Sue;
    }
  }
  console.log(part1);
  console.log(part2);
}
solve(input);
