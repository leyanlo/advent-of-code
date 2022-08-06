const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function hasAbba(str) {
  for (let i = 0; i <= str.length - 4; i++) {
    const [a, b, c, d] = str.slice(i, i + 4);
    if (a !== b && b === c && a === d) {
      return true;
    }
  }
  return false;
}

function solve1(input) {
  let count = 0;
  for (const line of input.split('\n')) {
    const insides = line
      .match(/\[\w+]/g)
      .map((match) => match.substring(1, match.length - 1));
    const outsides = line.split(/\[\w+]/);
    if (outsides.some(hasAbba) && !insides.some(hasAbba)) {
      count++;
    }
  }
  console.log(count);
}
solve1(input);

function getAbas(str) {
  const abas = [];
  for (let i = 0; i <= str.length - 3; i++) {
    const slice = str.slice(i, i + 3);
    const [a, b, c] = slice;
    if (a !== b && a === c) {
      abas.push(slice);
    }
  }
  return abas;
}

function getBab(aba) {
  return `${aba[1]}${aba[0]}${aba[1]}`;
}

function solve2(input) {
  let count = 0;
  for (const line of input.split('\n')) {
    const insides = line
      .match(/\[\w+]/g)
      .map((match) => match.substring(1, match.length - 1));
    const outsides = line.split(/\[\w+]/);
    if (
      outsides
        .flatMap(getAbas)
        .some((aba) => insides.some((inside) => inside.includes(getBab(aba))))
    )
      count++;
  }
  console.log(count);
}
solve2(input);
