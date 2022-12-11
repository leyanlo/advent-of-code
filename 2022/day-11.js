const fs = require('fs');

const input = fs.readFileSync('./day-11-input.txt', 'utf8').trimEnd();

function solve(input, part) {
  const monkeys = [];
  for (const section of input.split('\n\n')) {
    const lines = section.split('\n');
    const items = lines[1].match(/\d+/g).map(Number);
    const op = (old) => eval(lines[2].split('= ')[1]);
    const divisibleBy = +lines[3].match(/\d+/g)[0];
    const toMonkey = [4, 5].map((i) => +lines[i].match(/\d+/g)[0]);
    const monkey = { items, op, divisibleBy, toMonkey };
    monkeys.push(monkey);
  }
  const product = monkeys
    .map(({ divisibleBy }) => divisibleBy)
    .reduce((acc, n) => acc * n);

  let nInspected = monkeys.map(() => 0);
  for (let round = 0; round < (part === 2 ? 10000 : 20); round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const { items, op, divisibleBy, toMonkey } = monkeys[i];
      let item = items.shift();
      while (item) {
        nInspected[i]++;
        const nextItem =
          part === 2 ? op(item) % product : Math.floor(op(item) / 3);
        monkeys[toMonkey[+!!(nextItem % divisibleBy)]].items.push(nextItem);
        item = items.shift();
      }
    }
  }
  console.log(
    nInspected
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((acc, n) => acc * n)
  );
}
solve(input, 1);
solve(input, 2);
