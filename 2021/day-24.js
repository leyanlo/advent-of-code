const fs = require('fs');

var input = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function* solve(input, vars) {
  for (const line of input.split('\n')) {
    let [cmd, a, b] = line.split(' ');
    b = vars[b] ?? +b;

    switch (cmd) {
      case 'inp':
        vars[a] = yield null;
        vars[a] = +vars[a];
        break;
      case 'add':
        vars[a] += b;
        break;
      case 'mul':
        vars[a] *= b;
        break;
      case 'div':
        vars[a] = ~~(vars[a] / b);
        break;
      case 'mod':
        vars[a] %= b;
        break;
      case 'eql':
        vars[a] = +(vars[a] === b);
        break;
    }
  }
}

for (let n = 99999999999999; n > 11111111111111; n--) {
  if (n.toString(10).includes('0')) {
    continue;
  }
  const vars = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };
  const generator = solve(input, vars);
  generator.next();
  for (const d of n.toString(10)) {
    generator.next(d);
  }
  if (vars.z === 0) {
    console.log(n);
    break;
  }
}
