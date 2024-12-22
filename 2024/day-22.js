import { readFileSync } from 'node:fs';

var input = `123`;
var input = `1
10
100
2024`;
var input = `1
2
3
2024`;
var input = readFileSync('./day-22-input.txt', 'utf8').trimEnd();
// 1562 wrong

// function mix(a, b) {
//   return (a ^ b) >>> 0;
// }
// function prune(n) {
//   return n % 16777216;
// }
// function evolve(n) {
//   n = mix(n, n * 64);
//   n = prune(n);
//   n = mix(n, Math.floor(n / 32));
//   n = prune(n);
//   n = mix(n, n * 2048);
//   n = prune(n);
//   return n;
// }
//
// function solve(input) {
//   const lines = input.split('\n');
//   let sum = 0;
//   for (const line of lines) {
//     let n = +line;
//     for (let i = 0; i < 2000; i++) {
//       n = evolve(n);
//     }
//     sum+=n;
//   }
//   console.log(sum);
// }
// solve(input);

function mix(a, b) {
  return (a ^ b) >>> 0;
}
function prune(n) {
  return n % 16777216;
}
function evolve(n) {
  n = mix(n, n * 64);
  n = prune(n);
  n = mix(n, Math.floor(n / 32));
  n = prune(n);
  n = mix(n, n * 2048);
  n = prune(n);
  return n;
}

function solve(input) {
  const lines = input.split('\n');
  const allCandidates = new Set();
  const allPrices = {};
  for (const line of lines) {
    let n = +line;
    let price = n % 10;
    const dPrices = [];
    let prevPrice = price;
    const seen = new Set();
    allPrices[line] = {};
    for (let i = 0; i < 2000; i++) {
      n = evolve(n);
      price = n % 10;
      dPrices.push(price - prevPrice);
      prevPrice = price;
      if (dPrices.length >= 4) {
        const key = dPrices.slice(-4);
        allPrices[line][key] ??= price;
        if (price < 9) {
          seen.add(key);
        } else if (!seen.has(key)) {
          allCandidates.add(dPrices.slice(-4).join());
        }
      }
    }
  }

  let maxBananas = 0;
  for (const candidate of allCandidates) {
    let sum = 0;
    for (const line of lines) {
      sum += allPrices[line][candidate] ?? 0;
    }
    if (sum > maxBananas) {
      console.log(sum);
    }
    maxBananas = Math.max(maxBananas, sum);
  }
  console.log(maxBananas);
}
solve(input);
