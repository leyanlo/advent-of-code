const fs = require('fs');

const input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();

function mulInv(a, b) {
  if (b === 1) {
    return 1;
  }

  const b0 = b;
  let x0 = 0;
  let x1 = 1;
  while (a > 1) {
    const q = ~~(a / b);
    let tmp = a;
    a = b;
    b = tmp % b;
    tmp = x0;
    x0 = x1 - q * x0;
    x1 = tmp;
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}

function chineseRemainder(a, n) {
  const prod = n.reduce((acc, n) => acc * n);
  let sm = 0;
  for (let i = 0; i < n.length; i++) {
    const p = prod / n[i];
    sm += a[i] * mulInv(p, n[i]) * p;
  }
  return sm % prod;
}

function solve(input, part) {
  const discs = input.split('\n').map((line) => {
    const [, n, total, pos] = line.match(
      /Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)./
    );
    return { n: +n, total: +total, pos: +pos };
  });
  if (part === 2) {
    discs.push({
      n: discs[discs.length - 1].n + 1,
      total: 11,
      pos: 0,
    });
  }
  console.log(
    chineseRemainder(
      discs.map(({ n, total, pos }) => 2 * total - n - pos),
      discs.map(({ total }) => total)
    )
  );
}
solve(input, 1);
solve(input, 2);
