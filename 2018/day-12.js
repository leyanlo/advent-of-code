const fs = require('fs');

var input = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;
var input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();
// 3277 too low

function solve(input) {
  let [state, rules] = input.replace(/\./g, ' ').split('\n\n');
  state = state.split(': ')[1];
  rules = rules
    .split('\n')
    .map((rule) => rule.split(' => '))
    .reduce((acc, [left, right]) => {
      acc[left] = right;
      return acc;
    }, {});
  console.log(state, rules);
  for (let i = 0; i < 20; i++) {
    state = state.padStart(state.length + 3, ' ');
    state = state.padEnd(state.length + 3, ' ');
    const nextState = [];
    for (let i = 0; i <= state.length - 5; i++) {
      nextState.push(rules[state.substring(i, i + 5)] ?? ' ');
    }
    state = nextState.join('');
    console.log(state.replace(/ /g, '.'));
  }
  console.log(
    state
      .split('')
      .map((c, i) => (c === '#' ? i - 20 : 0))
      .reduce((acc, n) => acc + n)
  );
}
solve(input);
