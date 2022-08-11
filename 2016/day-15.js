const fs = require('fs');

var input = `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`;
var input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();
// 123524 too low
// 307650 too low
// 390012 too high

function mul_inv(a, b) {
  var b0 = b;
  var x0 = 0;
  var x1 = 1;
  var q, tmp;
  if (b == 1) {
    return 1;
  }
  while (a > 1) {
    q = parseInt(a / b);
    tmp = a;
    a = b;
    b = tmp % b;
    tmp = x0;
    x0 = x1 - q * x0;
    x1 = tmp;
  }
  if (x1 < 0) {
    x1 = x1 + b0;
  }
  return x1;
}

function chineseRemainder(a, n) {
  var p = 1;
  var i = 1;
  var prod = 1;
  var sm = 0;
  for (i = 0; i < n.length; i++) {
    prod = prod * n[i];
  }
  for (i = 0; i < n.length; i++) {
    p = prod / n[i];
    sm = sm + a[i] * mul_inv(p, n[i]) * p;
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
  console.log(discs);
  console.log(
    chineseRemainder(
      discs.map(({ n, total, pos }) => 2 * total - n - pos),
      discs.map(({ total }) => total)
    )
  );
}
solve(input, 1);
solve(input, 2);
