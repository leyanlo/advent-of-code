const fs = require('fs');

var input = `depth: 510
target: 10,10`;
var input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd();
// 1070 is too high

const TYPE = {
  rocky: 0,
  wet: 1,
  narrow: 2,
};

// tool values are the disallowed type, e.g. climbing tool is disallowed for narrow type
const TOOL = {
  neither: 0,
  torch: 1,
  climbing: 2,
};

const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const padding = 10;

function solve(input) {
  let [depth, target] = input.split('\n');
  depth = +depth.match(/\d+/g)[0];
  const [targetX, targetY] = target.match(/\d+/g).map(Number);

  function getErosion(geoIdx) {
    return (geoIdx + depth) % 20183;
  }

  const erosions = [];
  // TODO: test higher bounds
  for (let y = 0; y <= targetY + padding; y++) {
    erosions[y] = [getErosion(y * 48271)];
  }
  // TODO: test higher bounds
  for (let x = 1; x <= targetX + padding; x++) {
    erosions[0][x] = getErosion(x * 16807);
  }
  for (let y = 1; y <= targetY + padding; y++) {
    for (let x = 1; x <= targetX + padding; x++) {
      erosions[y][x] = getErosion(
        x === targetX && y === targetY
          ? 0
          : erosions[y][x - 1] * erosions[y - 1][x]
      );
    }
  }

  const types = erosions.map((row) => row.map((erosion) => erosion % 3));

  console.log(
    types
      .slice(0, targetY + 1)
      .flatMap((row) => row.slice(0, targetX + 1))
      .reduce((acc, type) => acc + type)
  );

  const queue = [{ coords: [0, 0], tool: TOOL.torch, time: 0 }];
  const possibilities = types.map((row) => row.map(() => []));
  while (
    !possibilities[targetY][targetX].length ||
    queue.filter(
      ({ time }) =>
        time <=
        Math.min(...possibilities[targetY][targetX].map(({ time }) => time))
    ).length
  ) {
    const {
      coords: [x, y],
      tool,
      time,
    } = queue.shift();
    if (
      possibilities[y][x].filter(
        ({ tool: prevTool, time: prevTime }) =>
          tool === prevTool && time >= prevTime
      ).length
    ) {
      // skip if worse than before
      continue;
    }
    possibilities[y][x].push(
      x === targetX && y === targetY
        ? { tool: TOOL.torch, time: time + (tool !== TOOL.torch) * 7 }
        : { tool, time }
    );
    for (const [dx, dy] of DIRS) {
      const type = types[y + dy]?.[x + dx];
      if (typeof type !== 'number') {
        continue;
      }
      const nextTime = time + 1 + (tool === type) * 7;
      const nextTools =
        tool === type ? [1, 2].map((dt) => (tool + dt) % 3) : [tool];
      queue.push(
        ...nextTools.map((nextTool) => ({
          coords: [x + dx, y + dy],
          tool: nextTool,
          time: nextTime,
        }))
      );
    }

    queue.sort(({ time: a }, { time: b }) => a - b);
  }
  console.log(
    Math.min(...possibilities[targetY][targetX].map(({ time }) => time))
  );
  // console.log(
  //   possibilities
  //     .map((row) =>
  //       row
  //         .slice(0, targetX + 1)
  //         .map((cell) =>
  //           cell
  //             .map((p) => Object.values(p).join())
  //             .join('; ')
  //             .padEnd(13, ' ')
  //         )
  //         .join('')
  //     )
  //     .join('\n')
  // );
}
solve(input);
