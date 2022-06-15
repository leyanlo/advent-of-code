const fs = require('fs');

// var input = `#######
// #.E...#
// #.....#
// #...G.#
// #######`;
// var input = `#########
// #G..G..G#
// #.......#
// #.......#
// #G..E..G#
// #.......#
// #.......#
// #G..G..G#
// #########`;
// var input = `#######
// #E..G.#
// #...#.#
// #.G.#G#
// #######`;
// var input = `#######
// #.G...#
// #...EG#
// #.#.#G#
// #..G#E#
// #.....#
// #######`;
var input = `#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`;
// var input = fs.readFileSync('./day-15-input.txt', 'utf8').trimEnd();
// 204820 too high
// 201932 too high

const dirs = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

function getAdjacentEnemy(unit, enemies) {
  const [i, j] = unit.coords;
  return enemies
    .filter((enemy) => {
      const [i2, j2] = enemy.coords;
      return dirs.filter(([di, dj]) => i2 + di === i && j2 + dj === j).length;
    })
    .sort(({ coords: a }, { coords: b }) => a[0] - b[0] || a[1] - b[1])
    .sort(({ hp: a }, { hp: b }) => a - b)[0];
}

function move(unit, enemies, map) {
  // mark in range
  for (const enemy of enemies) {
    const [i, j] = enemy.coords;
    for (const [di, dj] of dirs) {
      const i2 = i + di;
      const j2 = j + dj;
      if (map[i2]?.[j2] === '.') map[i2][j2] = '?';
    }
  }

  // choose nearest in range
  let chosen;
  let step = 1;
  let queue = [unit.coords];
  outer: while (queue.length) {
    const nextQueue = [];
    for (const [i, j] of queue) {
      for (const [di, dj] of dirs) {
        const i2 = i + di;
        const j2 = j + dj;
        switch (map[i2]?.[j2]) {
          case '?':
            chosen = [i2, j2];
            break outer;
          case '.':
            map[i2][j2] = step;
            nextQueue.push([i2, j2]);
        }
      }
    }
    step++;
    queue = nextQueue.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  }

  if (chosen) {
    while (step > 1) {
      step--;
      const [i, j] = chosen;
      for (const [di, dj] of dirs) {
        const i2 = i + di;
        const j2 = j + dj;
        if (map[i2]?.[j2] === step) {
          chosen = [i2, j2];
          break;
        }
      }
    }

    // move to chosen
    map[unit.coords[0]][unit.coords[1]] = '.';
    unit.coords = chosen;
    map[unit.coords[0]][unit.coords[1]] = unit.type;
  }

  // reset in range
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (typeof map[i][j] === 'number' || map[i][j] === '?') map[i][j] = '.';
    }
  }
}

function solve(input) {
  const map = input.split('\n').map((row) => row.split(''));
  let units = [];

  // initialize units
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const char = map[i][j];
      switch (char) {
        case 'E':
        case 'G':
          units.push({
            coords: [i, j],
            type: char,
            pow: 3,
            hp: 200,
          });
      }
    }
  }

  // game loop
  let nRounds = 0;

  console.log(nRounds);
  console.log(map.map((row) => row.join('')).join('\n'));
  console.log(units);
  console.log();

  while (new Set(units.map((unit) => unit.type)).size === 2) {
    for (const unit of units) {
      // dead unit
      if (unit.hp <= 0) continue;

      const enemies = units.filter(({ type }) => type !== unit.type);

      let adjacentEnemy = getAdjacentEnemy(unit, enemies);

      if (!adjacentEnemy) {
        move(unit, enemies, map);
        adjacentEnemy = getAdjacentEnemy(unit, enemies);
      }
      if (adjacentEnemy) {
        adjacentEnemy.hp -= unit.pow;
      }
    }

    // clean up dead units
    const nextUnits = [];
    for (const unit of units) {
      if (unit.hp > 0) {
        nextUnits.push(unit);
      } else {
        map[unit.coords[0]][unit.coords[1]] = '.';
      }
    }
    units = nextUnits.sort(
      ({ coords: a }, { coords: b }) => a[0] - b[0] || a[1] - b[1]
    );
    nRounds++;

    console.log(nRounds);
    console.log(map.map((row) => row.join('')).join('\n'));
    console.log(units);
    console.log();
  }
  console.log(nRounds * units.reduce((acc, unit) => acc + unit.hp, 0));
}
solve(input);
