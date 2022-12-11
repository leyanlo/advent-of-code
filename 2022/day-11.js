const fs = require('fs');

var input = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;
var input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   const monkeys = [];
//   for (const section of input.split('\n\n')) {
//     const lines = section.split('\n');
//     const items = lines[1].match(/\d+/g).map(Number);
//     const op = (old) => eval(lines[2].split('= ')[1]);
//     const divisible = +lines[3].match(/\d+/g)[0];
//     const toMonkey = [4, 5].map((i) => +lines[i].match(/\d+/g)[0]);
//     const monkey = { items, op, divisible, toMonkey };
//     monkeys.push(monkey);
//   }
//   console.log(monkeys);
//
//   let nInspected = monkeys.map(() => 0);
//   for (let round = 0; round < 20; round++) {
//     for (let i = 0; i < monkeys.length; i++) {
//       const { items, op, divisible, toMonkey } = monkeys[i];
//       let item = items.shift();
//       while (item) {
//         nInspected[i]++;
//         const nextItem = Math.floor(op(item) / 3);
//         monkeys[toMonkey[+(nextItem % divisible !== 0)]].items.push(nextItem);
//         item = items.shift();
//       }
//     }
//   }
//   console.log(monkeys.map(({ items }) => items));
//   console.log(nInspected);
//   console.log(
//     nInspected
//       .sort((a, b) => b - a)
//       .slice(0, 2)
//       .reduce((acc, n) => acc * n)
//   );
// }
// solve(input);
function solve(input) {
  const monkeys = [];
  for (const section of input.split('\n\n')) {
    const lines = section.split('\n');
    const items = lines[1].match(/\d+/g).map(BigInt);
    const op = (old) => eval(lines[2].split('= ')[1].replaceAll(/\d+/g, '$&n'));
    const divisible = BigInt(+lines[3].match(/\d+/g)[0]);
    const toMonkey = [4, 5].map((i) => +lines[i].match(/\d+/g)[0]);
    const monkey = { items, op, divisible, toMonkey };
    monkeys.push(monkey);
  }
  console.log(monkeys);
  const mod = monkeys
    .map(({ divisible }) => divisible)
    .reduce((acc, n) => acc * n);

  let nInspected = monkeys.map(() => 0);
  for (let round = 0; round < 10000; round++) {
    const prevNInspected = [...nInspected];
    for (let i = 0; i < monkeys.length; i++) {
      const { items, op, divisible, toMonkey } = monkeys[i];
      let item = items.shift();
      while (item) {
        nInspected[i]++;
        const nextItem = op(item) % mod;
        monkeys[toMonkey[+(nextItem % divisible !== 0n)]].items.push(nextItem);
        item = items.shift();
      }
    }
    // console.log(
    //   round + 1,
    //   nInspected,
    //   nInspected.map((_, i) => nInspected[i] - prevNInspected[i])
    // );
  }
  // 5 6 5 5 6 5 6 4 6 4
  // console.log(monkeys.map(({ items }) => items));
  console.log(
    nInspected
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((acc, n) => acc * n)
  );
}
solve(input);
