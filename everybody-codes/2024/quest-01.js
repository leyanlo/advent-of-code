var input = `ABBAC`;
var part = 1;

var input = `AxBCDDCAxD`;
var part = 2;

var input = `xBxAAABCDxCC`;
var part = 3;

const N_POTIONS = {
  A: 0,
  B: 1,
  C: 3,
  D: 5,
};

function solve(input, part) {
  let sum = 0;
  for (let i = 0; i < input.length; i += part) {
    const group = input.substring(i, i + part).split('');
    const xCount = group.filter((c) => c === 'x').length;
    sum += group
      .filter((c) => c !== 'x')
      .map((c) => N_POTIONS[c] + (part - xCount - 1))
      .reduce((acc, n) => acc + n, 0);
  }
  console.log(sum);
}
solve(input, part);
