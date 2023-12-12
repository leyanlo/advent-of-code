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
  if (groupIdx >= groups.length) {
    return +(springs.indexOf('#', springIdx) === -1);
  }

  if (springs[springIdx] === '.') {
    // move to next non-operational spring
    const nextSpringIdx = springs.findIndex(
      (s, i) => i >= springIdx && s !== '.'
    );
    return memoize(
      countArrangements(
        springs,
        groups,
        nextSpringIdx === -1 ? springs.length : nextSpringIdx,
        groupIdx,
        memo
      )
    );
  }

  if (springs[springIdx] === '#') {
    if (
      // remaining springs smaller than current group
      springs.length - springIdx < groups[groupIdx] ||
      // impossible to fit current group in current index
      springs
        .slice(springIdx, springIdx + groups[groupIdx])
        .some((s) => s === '.') ||
      springs[springIdx + groups[groupIdx]] === '#'
    ) {
      return memoize(0);
    }

    // move to next group
    return memoize(
      countArrangements(
        springs,
        groups,
        springIdx + groups[groupIdx] + 1,
        groupIdx + 1,
        memo
      )
    );
  }

  if (springs[springIdx] === '?') {
    // result for '.'
    const result = countArrangements(
      springs,
      groups,
      springIdx + 1,
      groupIdx,
      memo
    );

    if (
      // remaining springs smaller than current group
      springs.length - springIdx < groups[groupIdx] ||
      // impossible to fit current group in current index
      springs
        .slice(springIdx, springIdx + groups[groupIdx])
        .some((s) => s === '.') ||
      springs[springIdx + groups[groupIdx]] === '#'
    ) {
      return memoize(result);
    }

    // result for '.' or '#'
    return memoize(
      result +
        countArrangements(
          springs,
          groups,
          springIdx + groups[groupIdx] + 1,
          groupIdx + 1,
          memo
        )
    );
  }
}

function solve(input, nCopies) {
  let sum = 0;
  for (const line of input.split('\n')) {
    let [springs, groups] = line.split(' ');
    springs = Array(nCopies).fill(springs).join('?').split('');
    groups = Array(nCopies).fill(groups).join(',').split(',').map(Number);

    const nArrangements = countArrangements(springs, groups);
    sum += nArrangements;
  }
  console.log(sum);
}
solve(input, 1);
solve(input, 5);
