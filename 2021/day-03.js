const fs = require('fs');

const input = fs.readFileSync('./day-03-input.txt', 'utf8').trimEnd();

const debug = false;

function getRates(bits) {
  const counts = [];
  for (let i = 0; i < bits.length; i++) {
    for (let j = 0; j < bits[0].length; j++) {
      counts[j] = (counts[j] ?? 0) + bits[i][j];
    }
  }
  debug && console.log(counts);
  const gamma = counts.map((n) => +(n >= bits.length / 2)).join('');
  const epsilon = counts.map((n) => +(n < bits.length / 2)).join('');
  return [gamma, epsilon];
}

function solve1(input) {
  debug && console.log(input);
  const bits = input.split('\n').map((line) => line.split('').map(Number));
  debug && console.log(bits);
  const [gamma, epsilon] = getRates(bits);
  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
}

solve1(input);

function solve2(input) {
  debug && console.log(input);
  const bits = input.split('\n').map((line) => line.split('').map(Number));
  debug && console.log(bits);
  let o2Rating = [...bits];
  let [gamma, epsilon] = getRates(o2Rating);
  debug && console.log(gamma, epsilon);
  for (let i = 0; i < gamma.length; i++) {
    o2Rating = o2Rating.filter((row) => row[i] === +gamma[i]);
    debug && console.log(o2Rating);
    [gamma, epsilon] = getRates(o2Rating);
    if (o2Rating.length === 1) break;
  }

  let co2Rating = [...bits];
  [gamma, epsilon] = getRates(o2Rating);
  for (let i = 0; i < epsilon.length; i++) {
    co2Rating = co2Rating.filter((row) => row[i] === +epsilon[i]);
    debug && console.log(co2Rating);
    [gamma, epsilon] = getRates(co2Rating);
    if (co2Rating.length === 1) break;
  }
  console.log(
    parseInt(o2Rating[0].join(''), 2) * parseInt(co2Rating[0].join(''), 2)
  );
}

solve2(input);
