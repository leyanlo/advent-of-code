const fs = require('fs');

const input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function countArrangements(
  springs,
  groups,
  springIdx = 0,
  groupIdx = 0,
  memo = {}
) {
  function memoize(result) {
    memo[springIdx] ??= {};
    memo[springIdx][groupIdx] = result;
    return result;
  }

  if (memo[springIdx]?.[groupIdx] !== undefined) {
    return memo[springIdx][groupIdx];
  }

  if (springIdx >= springs.length) {
    return +(groupIdx === groups.length);
  }
  if (groupIdx === groups.length) {
    return +(springs.indexOf('#', springIdx) === -1);
  }

  let result = 0;
  if (springs[springIdx].match(/[.?]/)) {
    result += countArrangements(springs, groups, springIdx + 1, groupIdx, memo);
  }

  if (
    springs[springIdx].match(/[#?]/) &&
    // possible to fit group in remaining springs
    groups[groupIdx] <= springs.length - springIdx &&
    !springs.substring(springIdx, springIdx + groups[groupIdx]).match(/\./) &&
    springs[springIdx + groups[groupIdx]] !== '#'
  ) {
    result += countArrangements(
      springs,
      groups,
      springIdx + groups[groupIdx] + 1,
      groupIdx + 1,
      memo
    );
  }
  return memoize(result);
}

function solve(input, nCopies) {
  let sum = 0;
  for (const line of input.split('\n')) {
    let [springs, groups] = line.split(' ');
    springs = Array(nCopies).fill(springs).join('?');
    groups = Array(nCopies).fill(groups.split(',')).flat().map(Number);

    const nArrangements = countArrangements(springs, groups);
    sum += nArrangements;
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 5);
