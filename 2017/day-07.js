const fs = require('fs');

var input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function solve(input) {
  const programs = input.split('\n').map((line) => {
    const [left, right] = line.split(' -> ');
    let [, name, weight] = left.match(/^(\w+) \((\d+)\)$/);
    weight = +weight;
    const aboveNames = right?.split(', ') ?? [];
    return { name, weight, aboveNames };
  });
  const names = programs.map(({ name }) => name);
  const aboveNames = programs.flatMap(({ aboveNames }) => aboveNames);
  console.log(names.filter((name) => !aboveNames.includes(name))[0]);
}
solve(input);
