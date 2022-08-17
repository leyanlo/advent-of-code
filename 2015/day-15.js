const fs = require('fs');

var input = `Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`;
var input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();

const props = ['capacity', 'durability', 'flavor', 'texture', 'calories'];

function solve(input) {
  console.log(input);
  const ingredients = input.split('\n').map((line) => {
    const [left, right] = line.split(': ');
    return right.split(', ').reduce((acc, prop) => {
      const [left, right] = prop.split(' ');
      acc[left] = +right;
      return acc;
    }, {});
  });
  console.log(ingredients);
  let maxScore = 0;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100 - i; j++) {
      for (let k = 0; k < 100 - i - j; k++) {
        const w = 100 - i - j - k;
        const calories =
          i * ingredients[0].calories +
          j * ingredients[1].calories +
          k * ingredients[2].calories +
          w * ingredients[3].calories;
        if (calories !== 500) {
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
                  w * ingredients[3][p]
              )
            )
            .reduce((acc, n) => acc * n)
        );
      }
    }
  }
  console.log(maxScore);
}
solve(input);
