import { readFileSync } from 'node:fs';

const input = readFileSync('./day-22-input.txt', 'utf8').trimEnd();

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

function solve1(input) {
  const lines = input.split('\n');
  let sum = 0;
  for (const line of lines) {
    let n = +line;
    for (let i = 0; i < 2000; i++) {
      n = evolve(n);
    }
    sum += n;
  }
  console.log(sum);
}
solve1(input);

function solve2(input) {
  const lines = input.split('\n');
  const potentialKeys = new Set();
  const priceMap = {};
  for (const line of lines) {
    let n = +line;
    let price = n % 10;
    const dPrices = [];
    let prevPrice = price;
    priceMap[line] = {};
    for (let i = 0; i < 2000; i++) {
      n = evolve(n);
      price = n % 10;
      dPrices.push(price - prevPrice);
      prevPrice = price;
      if (dPrices.length >= 4) {
        const key = dPrices.slice(-4).join();
        priceMap[line][key] ??= price;
        if (priceMap[line][key] === 9) {
          potentialKeys.add(key);
        }
      }
    }
  }

  let maxBananas = 0;
  for (const key of potentialKeys) {
    let bananas = 0;
    for (const line of lines) {
      bananas += priceMap[line][key] ?? 0;
    }
    maxBananas = Math.max(maxBananas, bananas);
  }
  console.log(maxBananas);
}
solve2(input);
