const fs = require('fs');

const input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();

const toDir = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

function solve(input, part) {
  const knots = [...Array(part === 2 ? 10 : 2)].map(() => [0, 0]);
  const visited = { 0: { 0: 1 } };

  for (const line of input.split('\n')) {
    let [char, n] = line.split(' ');
    const dir = toDir[char];
    n = +n;

    for (let i = 0; i < n; i++) {
      let head = knots[0];
      let tail;
      head[0] += dir[0];
      head[1] += dir[1];

      for (let j = 1; j < knots.length; j++) {
        tail = knots[j];
        const dist = head.map((_, i) => head[i] - tail[i]);
        if (dist.some((x) => Math.abs(x) > 1)) {
          const dir2 = dist.map(Math.sign);
          tail[0] += dir2[0];
          tail[1] += dir2[1];
        }
        head = tail;
      }
      visited[tail[0]] = visited[tail[0]] ?? {};
      visited[tail[0]][tail[1]] = 1;
    }
  }
  console.log(
    Object.values(visited)
      .map((row) => Object.values(row))
      .flat()
      .reduce((acc, n) => acc + n)
  );
}
solve(input, 1);
solve(input, 2);
