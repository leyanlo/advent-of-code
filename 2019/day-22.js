const inputIdx = 1;
const part1 = true;
const part2 = true;

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

const inputs = [];
inputs.push(`deal with increment 7
deal into new stack
deal into new stack`);

inputs.push(`cut 181
deal with increment 61
cut -898
deal with increment 19
cut -1145
deal with increment 35
cut 3713
deal with increment 8
deal into new stack
cut -168
deal with increment 32
cut -3050
deal with increment 74
cut 7328
deal with increment 38
deal into new stack
deal with increment 11
cut 5419
deal with increment 34
cut 7206
deal with increment 53
cut 4573
deal into new stack
deal with increment 50
cut -1615
deal with increment 9
cut -4772
deal with increment 66
cut 9669
deal into new stack
deal with increment 2
cut 5003
deal with increment 46
cut -3368
deal into new stack
cut 1276
deal with increment 19
cut 530
deal with increment 57
cut 8914
deal with increment 41
cut -6173
deal with increment 44
cut -2173
deal with increment 55
deal into new stack
cut 5324
deal with increment 58
cut 592
deal with increment 17
cut 8744
deal with increment 10
cut -5679
deal into new stack
deal with increment 37
cut 1348
deal with increment 30
cut -8824
deal with increment 54
deal into new stack
cut -1263
deal with increment 29
deal into new stack
deal with increment 13
cut -9682
deal with increment 19
cut 8665
deal with increment 42
cut 3509
deal with increment 57
cut 7536
deal with increment 42
cut -1391
deal with increment 25
deal into new stack
deal with increment 49
cut 7942
deal with increment 49
cut -9595
deal with increment 59
cut 9964
deal with increment 22
deal into new stack
cut 5436
deal into new stack
cut 4605
deal into new stack
deal with increment 36
cut -2667
deal with increment 49
cut 4727
deal into new stack
cut 2236
deal with increment 66
cut 8098
deal into new stack
deal with increment 62
deal into new stack
deal with increment 70
cut -9110`);

part1 && solve1(inputs[inputIdx]);
part2 && solve2(inputs[inputIdx]);
