const fs = require('fs');

var input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
var input = fs.readFileSync('./day-12-input.txt', 'utf8').trimEnd();
// 4964259839627 correct

// function solve(input) {
//   // console.log(input);
//   let sum = 0;
//   for (const line of input.split('\n')) {
//     let [left, right] = line.split(' ');
//     left = left.split('');
//     right = right.split(',').map(Number);
//     // console.log({ left, right });
//
//     const qs = left
//       .map((char, i) => [char, i])
//       .filter(([char]) => char === '?')
//       .map(([, i]) => i);
//     // console.log({ qs });
//
//     let nArrangements = 0;
//     for (let i = 0; i < 2 ** qs.length; i++) {
//       const perm = qs.filter((_, j) => (2 ** j) & i);
//       // console.log('perm', perm);
//       const str = left
//         .map((char, j) =>
//           char === '?' ? (perm.includes(j) ? '#' : '.') : char
//         )
//         .join('');
//       // console.log('str', str);
//       // console.log(
//       //   'str',
//       //   str
//       //     .split(/\.+/g)
//       //     .filter(Boolean)
//       //     .map((s) => s.length)
//       //     .join(),
//       //   right.join()
//       // );
//       nArrangements += +(
//         str
//           .split(/\.+/g)
//           .filter(Boolean)
//           .map((s) => s.length)
//           .join() === right.join()
//       );
//     }
//     console.log('nArrangements', nArrangements);
//     sum += nArrangements
//   }
//   console.log(sum)
// }
// solve(input);

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
    return memoize(+(groupIdx === groups.length));
  }
  if (groupIdx >= groups.length) {
    return memoize(+(springs.indexOf('#', springIdx) === -1));
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

function solve(input) {
  // console.log(input);
  let sum = 0;
  for (const line of input.split('\n')) {
    let [springs, groups] = line.split(' ');
    springs = (springs + '?').repeat(5).slice(0, -1);
    groups = (groups + ',').repeat(5).slice(0, -1);
    springs = springs.split('');
    groups = groups.split(',').map(Number);
    // console.log('springs', springs);
    // console.log('groups', groups);

    const nArrangements = countArrangements(springs, groups);
    console.log('nArrangements', nArrangements);
    sum += nArrangements;
  }
  console.log(sum);
}
solve(input);
