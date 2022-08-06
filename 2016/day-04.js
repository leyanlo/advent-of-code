const fs = require('fs');

const input = fs.readFileSync('./day-04-input.txt', 'utf8').trimEnd();

const A = 'a'.codePointAt(0);

function solve(input) {
  let sum = 0;
  const idMap = {};
  for (const line of input.split('\n')) {
    const split = line.split('-');
    const name = split.slice(0, -1);
    let [id, checksum] = split[split.length - 1].split(/[[\]]/);
    id = +id;
    const chars = name.map((part) => part.split('')).flat();
    const map = chars.reduce((acc, c) => {
      acc[c] = (acc[c] ?? 0) + 1;
      return acc;
    }, {});
    if (
      checksum ===
      Object.entries(map)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 5)
        .map(([char]) => char)
        .join('')
    ) {
      sum += id;
      idMap[
        name
          .map((part) =>
            part
              .split('')
              .map((char) =>
                String.fromCodePoint(((char.codePointAt(0) - A + id) % 26) + A)
              )
              .join('')
          )
          .join(' ')
      ] = id;
    }
  }
  console.log(sum);
  console.log(idMap['northpole object storage']);
}
solve(input);
