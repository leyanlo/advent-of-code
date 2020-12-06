function solve1(input) {
  const [min, max] = input;
  let count = 0;
  for (let i = min; i <= max; i++) {
    const digits = ("" + i).split("").map((s) => +s);
    let hasAdjacent = false;
    let neverDecrease = true;
    let digit = digits[0];
    for (let j = 1; j < digits.length; j++) {
      const nextDigit = digits[j];
      if (nextDigit === digit) hasAdjacent = true;
      if (nextDigit < digit) neverDecrease = false;
      digit = nextDigit;
    }
    if (hasAdjacent && neverDecrease) count++;
  }
  console.log(count);
}

function solve2(input) {
  const [min, max] = input;
  let count = 0;
  for (let i = min; i <= max; i++) {
    const digits = ("" + i).split("").map((s) => +s);
    let hasAdjacent = false;
    let neverDecrease = true;
    let digit = digits[0];
    let adjacentCount = 1;
    for (let j = 1; j < digits.length; j++) {
      const nextDigit = digits[j];
      if (nextDigit === digit) {
        adjacentCount++;
      } else {
        if (adjacentCount === 2) {
          hasAdjacent = true;
        }
        adjacentCount = 1;
      }
      if (nextDigit < digit) neverDecrease = false;
      digit = nextDigit;
    }
    if ((hasAdjacent || adjacentCount === 2) && neverDecrease) count++;
  }
  console.log(count);
}

const input = `254032-789860`.split("-").map((s) => +s);

solve1(input);
solve2(input);
