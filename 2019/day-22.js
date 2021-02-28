const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8');

function solve1(input) {
  let deck = [...Array(10007).keys()];
  for (let instr of input.split('\n')) {
    if (instr === 'deal into new stack') {
      deck.reverse();
    } else if (instr.startsWith('cut')) {
      const n = +instr.split(' ')[1];
      deck = [...deck.slice(n), ...deck.slice(0, n)];
    } else if (instr.startsWith('deal with increment')) {
      const n = +instr.split(' ')[3];
      deck = deck.reduce((nextDeck, card, i) => {
        nextDeck[(i * n) % deck.length] = card;
        return nextDeck;
      }, []);
    }
  }
  console.log(deck.indexOf(2019));
}

// https://en.wikipedia.org/wiki/Modular_exponentiation#Pseudocode
function powMod(base, exp, mod) {
  if (mod === 1n) {
    return 0n;
  }
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      res = (res * base) % mod;
    }
    exp >>= 1n;
    base = (base * base) % mod;
  }
  return res;
}

function inv(n, mod) {
  return powMod(n, mod - 2n, mod);
}

// https://www.reddit.com/r/adventofcode/comments/ee0rqi/2019_day_22_solutions/fbnkaju/
function solve2(input) {
  const nCards = 119315717514047n;

  const { offset, increment } = input.split('\n').reduce(
    ({ offset, increment }, instr) => {
      if (instr === 'deal into new stack') {
        increment *= -1n;
        offset = (offset + increment) % nCards;
      } else if (instr.startsWith('cut')) {
        const n = BigInt(instr.split(' ')[1]);
        offset = (offset + increment * n) % nCards;
      } else if (instr.startsWith('deal with increment')) {
        const n = BigInt(instr.split(' ')[3]);
        increment = (increment * inv(n, nCards)) % nCards;
      }
      return {
        offset,
        increment,
      };
    },
    {
      offset: 0n,
      increment: 1n,
    }
  );

  const nTimes = 101741582076661n;

  const finalIncrement = powMod(increment, nTimes, nCards);
  const finalOffset =
    (offset *
      (1n - powMod(increment, nTimes, nCards)) *
      inv(1n - increment, nCards)) %
    nCards;
  console.log('' + ((finalOffset + finalIncrement * 2020n) % nCards));
}

solve1(input);
solve2(input);
