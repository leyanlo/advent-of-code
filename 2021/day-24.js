const fs = require('fs');

var input = `inp w // { w: w0, x: x0, y: y0, z: z0 }
mul x 0 // { w: w0, x: 0, y: y0, z: z0 }
add x z // { w: w0, x: z0, y: y0, z: z0 }
mod x 26 // { w: w0, x: z0 % 26, y: y0, z: z0 }
div z a // { w: w0, x: z0 % 26, y: y0, z: ~~(z0 / a) }
add x b // { w: w0, x: z0 % 26 + b, y: y0, z: ~~(z0 / a) }
eql x w // { w: w0, x: +(w0 === z0 % 26 + b), y: y0, z: ~~(z0 / a) }
eql x 0 // { w: w0, x: +(w0 !== z0 % 26 + b), y: y0, z: ~~(z0 / a) }
mul y 0 // { w: w0, x: +(w0 !== z0 % 26 + b), y: 0, z: ~~(z0 / a) }
add y 25 // { w: w0, x: +(w0 !== z0 % 26 + b), y: 25, z: ~~(z0 / a) }
mul y x // { w: w0, x: +(w0 !== z0 % 26 + b), y: 25 * +(w0 !== z0 % 26 + b), z: ~~(z0 / a) }
add y 1 // { w: w0, x: +(w0 !== z0 % 26 + b), y: 25 * +(w0 !== z0 % 26 + b) + 1, z: ~~(z0 / a) }
mul z y // { w: w0, x: +(w0 !== z0 % 26 + b), y: 25 * +(w0 !== z0 % 26 + b) + 1, z: ~~(z0 / a) * (25 * +(w0 !== z0 % 26 + b) + 1) }
mul y 0 // { w: w0, x: +(w0 !== z0 % 26 + b), y: 0, z: ~~(z0 / a) * (25 * +(w0 !== z0 % 26 + b) + 1) }
add y w // { w: w0, x: +(w0 !== z0 % 26 + b), y: w0, z: ~~(z0 / a) * (25 * +(w0 !== z0 % 26 + b) + 1) }
add y c // { w: w0, x: +(w0 !== z0 % 26 + b), y: w0 + c, z: ~~(z0 / a) * (25 * +(w0 !== z0 % 26 + b) + 1) }
mul y x // { w: w0, x: +(w0 !== z0 % 26 + b), y: (w0 + c) * +(w0 !== z0 % 26 + b), z: ~~(z0 / a) * (25 * +(w0 !== z0 % 26 + b) + 1) }
add z y // { w: w0, x: +(w0 !== z0 % 26 + b), y: (w0 + c) * +(w0 !== z0 % 26 + b), z: ~~(z0 / a) * (25 * +(w0 !== z0 % 26 + b) + 1) + (w0 + c) * +(w0 !== z0 % 26 + b) }
`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();

function* alu(input, vars) {
  for (const line of input.split('\n')) {
    let [cmd, a, b] = line.split(' ');
    b = vars[b] ?? +b;

    switch (cmd) {
      case 'inp':
        vars[a] = yield null;
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

function solve(input, part) {
  const lines = input.split('\n');
  const coeffs = [];
  for (let i = 0; i < 14; i++) {
    coeffs.push([4, 5, 15].map((j) => +lines[18 * i + j].split(' ')[2]));
  }
  // console.log(coeffs);

  const deps = [];
  const depMap = Array(14).fill(null);
  for (let i = 0; i < 14; i++) {
    if (coeffs[i][0] === 1) {
      deps.push(i);
    } else {
      depMap[i] = deps.pop();
    }
  }
  // console.log(depMap);

  const digits = Array(14).fill(null);
  for (let i = 0; i < 14; i++) {
    const dep = depMap[i];
    if (dep === null) {
      continue;
    }

    digits[dep] =
      part === 1
        ? Math.min(9, 9 - coeffs[dep][2] - coeffs[i][1])
        : Math.max(1, 1 - coeffs[dep][2] - coeffs[i][1]);
    digits[i] = digits[dep] + coeffs[dep][2] + coeffs[i][1];
  }
  console.log(digits.join(''));

  const vars = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };
  const generator = alu(input, vars);
  generator.next();
  for (const d of digits) {
    generator.next(d);
  }
  // console.log(vars);
}
solve(input, 1);
solve(input, 2);

// function solve(input) {
//   let minZ = Number.POSITIVE_INFINITY;
//   for (let n = 99799219349967; n > 11111111111111; n -= 1) {
//     const digits = n.toString(10);
//     if (digits.includes('0')) {
//       continue;
//     }
//     const vars = {
//       w: 0,
//       x: 0,
//       y: 0,
//       z: 0,
//     };
//     const generator = alu(input, vars);
//     generator.next();
//     for (const d of n.toString(10)) {
//       generator.next(d);
//     }
//     if (vars.z < minZ) {
//       console.log(n, vars);
//       if (vars.z === 0) {
//         break;
//       }
//       minZ = vars.z;
//     }
//   }
// }
// solve(input);
