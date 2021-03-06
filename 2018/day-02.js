const fs = require('fs');

const input = fs.readFileSync('./day-02-input.txt', 'utf8');

function solve1(input) {
  let twoCount = 0;
  let threeCount = 0;
  for (let line of input.split('\n')) {
    const counts = {};
    for (let char of line.split('')) {
      counts[char] = (counts[char] ?? 0) + 1;
    }
    let hasTwo = false;
    let hasThree = false;
    for (let count of Object.values(counts)) {
      switch (count) {
        case 2:
          hasTwo = true;
          break;
        case 3:
          hasThree = true;
          break;
      }
    }
    twoCount += hasTwo;
    threeCount += hasThree;
  }
  console.log(twoCount * threeCount);
}

function solve2(input) {
  const lines = input.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    const line1 = lines[i];
    for (let j = i + 1; j < lines.length; j++) {
      const line2 = lines[j];
      let errors = [];
      for (let k = 0; k < line1.length; k++) {
        if (line1[k] !== line2[k]) {
          errors.push(k);
          if (errors.length > 1) {
            break;
          }
        }
      }
      if (errors.length === 1) {
        console.log(line1.substr(0, errors[0]) + line1.substr(errors[0] + 1));
        return;
      }
    }
  }
}

solve1(input);
solve2(input);
