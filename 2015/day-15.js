const fs = require('fs');

const input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();

const props = ['capacity', 'durability', 'flavor', 'texture', 'calories'];

function solve(input, part) {
  const ingredients = input.split('\n').map((line) => {
    const [left, right] = line.split(': ');
    return right.split(', ').reduce((acc, prop) => {
      const [left, right] = prop.split(' ');
      acc[left] = +right;
      return acc;
    }, {});
  });
  let maxScore = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100 - i; j++) {
      for (let k = 0; k < 100 - i - j; k++) {
        const l = 100 - i - j - k;
        const calories =
          i * ingredients[0].calories +
          j * ingredients[1].calories +
          k * ingredients[2].calories +
          l * ingredients[3].calories;
        if (part === 2 && calories !== 500) {
          continue;
        }
        maxScore = Math.max(
          maxScore,
          props
            .filter((p) => p !== 'calories')
            .map((p) =>
              Math.max(
                0,
                i * ingredients[0][p] +
                  j * ingredients[1][p] +
                  k * ingredients[2][p] +
                  l * ingredients[3][p]
              )
            )
            .reduce((acc, n) => acc * n)
        );
      }
    }
  }
  console.log(maxScore);
}
solve(input, 1);
solve(input, 2);
