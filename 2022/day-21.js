const fs = require('fs');

const input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd();

function solve1(input) {
  const map = {};
  let lines = input.split('\n');
  while (map.root === undefined) {
    for (const line of lines) {
      const [monkey, job] = line.split(': ');
      if (/\d+/.test(job)) {
        map[monkey] = +job;
        continue;
      }

      const [m1, op, m2] = job.split(' ');
      if (map[m1] === undefined || map[m2] === undefined) {
        continue;
      }

      map[monkey] = [m1, m2]
        .map((m) => map[m])
        .reduce((acc, n) =>
          op === '+'
            ? acc + n
            : op === '-'
            ? acc - n
            : op === '*'
            ? acc * n
            : acc / n
        );
    }
    lines = lines.filter((line) => map[line.slice(0, 4)] === undefined);
  }
  console.log(map.root);
}
solve1(input);

function solve2(input) {
  // guess 0 or 1 and see how far both are off
  const diffs = [0, 1].map((guess) => {
    const map = {};
    let lines = input
      .split('\n')
      .map((line) =>
        line.startsWith('root')
          ? line.replace('+', '-')
          : line.startsWith('humn')
          ? line.replace(/\d+/, guess)
          : line
      );
    while (map.root === undefined) {
      for (const line of lines) {
        const [monkey, job] = line.split(': ');
        if (/\d+/.test(job)) {
          map[monkey] = +job;
          continue;
        }

        const [m1, op, m2] = job.split(' ');
        if (map[m1] === undefined || map[m2] === undefined) {
          continue;
        }

        map[monkey] = [m1, m2]
          .map((m) => map[m])
          .reduce((acc, n) =>
            op === '+'
              ? acc + n
              : op === '-'
              ? acc - n
              : op === '*'
              ? acc * n
              : acc / n
          );
      }
      lines = lines.filter((line) => map[line.slice(0, 4)] === undefined);
    }
    return map.root;
  });
  console.log(diffs[0] / (diffs[0] - diffs[1]));
}
solve2(input);
