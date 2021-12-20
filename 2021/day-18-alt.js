const fs = require('fs');

const input = fs.readFileSync('./day-18-input.txt', 'utf8').trimEnd();

function add(a, b) {
  return reduce(a.concat(b).map((el) => ({ n: el.n, depth: el.depth + 1 })));
}

function reduce(sNum) {
  reduce: while (true) {
    for (let i = 0; i < sNum.length - 1; i++) {
      const a = sNum[i];
      const b = sNum[i + 1];
      if (a.depth !== b.depth) {
        continue;
      }

      if (a.depth > 4) {
        if (sNum[i - 1]) {
          sNum[i - 1].n += a.n;
        }
        if (sNum[i + 2]) {
          sNum[i + 2].n += b.n;
        }
        sNum.splice(i, 2, {
          n: 0,
          depth: a.depth - 1,
        });
        continue reduce;
      }
    }

    for (let i = 0; i < sNum.length; i++) {
      const { n, depth } = sNum[i];
      if (sNum[i].n >= 10) {
        sNum.splice(
          i,
          1,
          {
            n: Math.floor(n / 2),
            depth: depth + 1,
          },
          {
            n: Math.ceil(n / 2),
            depth: depth + 1,
          }
        );
        continue reduce;
      }
    }
    break;
  }
  return sNum;
}

function magnitude(sNum) {
  outer: while (sNum.length > 1) {
    const maxDepth = sNum.reduce((acc, el) => Math.max(acc, el.depth), 0);
    for (let i = 0; i < sNum.length; i++) {
      const el = sNum[i];
      if (el.depth === maxDepth) {
        sNum.splice(i, 2, {
          n: 3 * el.n + 2 * sNum[i + 1].n,
          depth: el.depth - 1,
        });
        continue outer;
      }
    }
  }
  return sNum[0].n;
}

function solve(input) {
  const assignment = input.split('\n').map((line) => {
    let depth = 0;
    const els = [];
    for (const char of line) {
      if (char === '[') {
        depth++;
      } else if (char === ']') {
        depth--;
      } else if (/\d/.test(char)) {
        els.push({
          n: +char,
          depth,
        });
      }
    }
    return els;
  });
  console.log(magnitude(assignment.reduce((acc, sNum) => add(acc, sNum))));

  let maxMagnitude = 0;
  for (let i = 0; i < assignment.length - 1; i++) {
    for (let j = 1; j < assignment.length; j++) {
      maxMagnitude = Math.max(
        maxMagnitude,
        magnitude(add(assignment[i], assignment[j])),
        magnitude(add(assignment[j], assignment[i]))
      );
    }
  }
  console.log(maxMagnitude);
}
solve(input);
