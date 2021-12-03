const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

function getRates(bits) {
  const counts = [];
  for (let i = 0; i < bits.length; i++) {
    for (let j = 0; j < bits[0].length; j++) {
      counts[j] = (counts[j] ?? 0) + bits[i][j];
    }
  }
  const gamma = counts.map((n) => +(n >= bits.length / 2)).join('');
  const epsilon = counts.map((n) => +(n < bits.length / 2)).join('');
  return [gamma, epsilon];
}

function solve1(input) {
  const bits = input.split('\n').map((line) => line.split('').map(Number));
  const [gamma, epsilon] = getRates(bits);
  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

solve1(input);

function solve2(input) {
  const bits = input.split('\n').map((line) => line.split('').map(Number));

  let o2Rating = [...bits];
  let [gamma] = getRates(o2Rating);
  for (let i = 0; i < gamma.length; i++) {
    o2Rating = o2Rating.filter((row) => row[i] === +gamma[i]);
    [gamma] = getRates(o2Rating);
    if (o2Rating.length === 1) break;
  }

  let co2Rating = [...bits];
  [, epsilon] = getRates(o2Rating);
  for (let i = 0; i < epsilon.length; i++) {
    co2Rating = co2Rating.filter((row) => row[i] === +epsilon[i]);
    [, epsilon] = getRates(co2Rating);
    if (co2Rating.length === 1) break;
  }

  console.log(
    parseInt(o2Rating[0].join(''), 2) * parseInt(co2Rating[0].join(''), 2)
  );
}

solve2(input);
