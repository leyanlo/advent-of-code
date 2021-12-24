const fs = require('fs');

var input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;
// var input = fs.readFileSync('./day-23-input.txt', 'utf8').trimEnd();

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const energies = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const hallway = {
  '1,1': 1,
  '1,2': 1,
  '1,4': 1,
  '1,6': 1,
  '1,8': 1,
  '1,10': 1,
  '1,11': 1,
};

const rooms = {
  '2,3': 'A',
  '2,5': 'B',
  '2,7': 'C',
  '2,9': 'D',
  '3,3': 'A',
  '3,5': 'B',
  '3,7': 'C',
  '3,9': 'D',
};

const amphipodToRooms = {
  A: [
    [2, 3],
    [3, 3],
  ],
  B: [
    [2, 5],
    [3, 5],
  ],
  C: [
    [2, 7],
    [3, 7],
  ],
  D: [
    [2, 9],
    [3, 9],
  ],
};

function solve(input) {
  const energy = 0;
  const config = input.split('\n').map((row) => row.split(''));

  const states = [[energy, config]];
  const seenStates = {};
  let minEnergy = Number.POSITIVE_INFINITY;
  step: while (states.length > 0) {
    const [energy, config] = states.shift();
    const configKey = config.map((row) => row.join('')).join('\n');
    if (
      seenStates[configKey] !== undefined &&
      seenStates[configKey] >= energy
    ) {
      continue;
    }
    seenStates[configKey] = energy;

    if (
      Object.entries(rooms).every(([coords, amphipod]) => {
        const [i, j] = coords.split(',');
        return config[i][j] === amphipod;
      })
    ) {
      minEnergy = Math.min(minEnergy, energy);
      continue;
    }
    if (energy > minEnergy) {
      continue;
    }
    const amphipods = [];
    for (let i = 0; i < config.length; i++) {
      for (let j = 0; j < config[i].length; j++) {
        const cell = config[i][j];
        if (/[A-Z]/.test(cell) && rooms[[i, j].join()] !== cell) {
          amphipods.push([cell, i, j]);
        }
      }
    }

    const moves = [];
    for (const [amphipod, i, j] of amphipods) {
      if (
        i === 1 &&
        amphipodToRooms[amphipod].every(([ii, jj]) => config[ii][jj] !== '.')
      ) {
        continue;
      }

      const queue = [[i, j, energy]];
      const visited = {};
      while (queue.length > 0) {
        const [ii, jj, eenergy] = queue.shift();
        if (visited[[ii, jj].join()]) {
          continue;
        }
        visited[[ii, jj].join()] = true;
        if (hallway[[ii, jj].join()]) {
          moves.push([amphipod, i, j, ii, jj, eenergy]);
        }
        if (
          rooms[[ii, jj].join()] === amphipod &&
          (config[ii + 1][jj] === amphipod || config[ii + 1][jj] === '#')
        ) {
          const nextConfig = config.map((row) => row.map((cell) => cell));
          nextConfig[ii][jj] = amphipod;
          nextConfig[i][j] = '.';
          states.push([eenergy, nextConfig]);
          continue step;
        }
        for (const [di, dj] of dirs) {
          if (config[ii + di][jj + dj] === '.') {
            queue.push([ii + di, jj + dj, eenergy + energies[amphipod]]);
          }
        }
      }
    }

    for (const [amphipod, i, j, ii, jj, nextEnergy] of moves) {
      const nextConfig = config.map((row) => row.map((cell) => cell));
      nextConfig[ii][jj] = amphipod;
      nextConfig[i][j] = '.';
      states.push([nextEnergy, nextConfig]);
    }
    states.sort(([e1], [e2]) => e1 - e2);
  }
  console.log(seenStates);
}
solve(input);

const part1 = `
#############
#...........#
###D#B#D#A###
  #C#C#A#B#
  #########
0

#############
#.A.........#
###D#B#D#.###
  #C#C#A#B#
  #########
8

#############
#.A.......B.#
###D#B#D#.###
  #C#C#A#.#
  #########
38

#############
#.A.......B.#
###D#B#.#.###
  #C#C#A#D#
  #########
5038

#############
#.A.......B.#
###.#B#.#D###
  #C#C#A#D#
  #########
13038

#############
#.A.....A.B.#
###.#B#.#D###
  #C#C#.#D#
  #########
13041

#############
#.A.....A.B.#
###.#B#.#D###
  #.#C#C#D#
  #########
13841

#############
#.A.B...A.B.#
###.#.#.#D###
  #.#C#C#D#
  #########
13861

#############
#.A.B...A.B.#
###.#.#C#D###
  #.#.#C#D#
  #########
14361

#############
#.A.....A.B.#
###.#.#C#D###
  #.#B#C#D#
  #########
14391

#############
#.......A.B.#
###.#.#C#D###
  #A#B#C#D#
  #########
14394

#############
#.........B.#
###A#.#C#D###
  #A#B#C#D#
  #########
14400

#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
14460
`;

const part2 = `
#############
#...........#
###D#B#D#A###
  #D#C#B#A#
  #D#B#A#C#
  #C#C#A#B#
  #########
0

#############
#A..........#
###D#B#D#.###
  #D#C#B#A#
  #D#B#A#C#
  #C#C#A#B#
  ######### 
9

#############
#AA.........#
###D#B#D#.###
  #D#C#B#.#
  #D#B#A#C#
  #C#C#A#B#
  ######### 
18

#############
#AA........C#
###D#B#D#.###
  #D#C#B#.#
  #D#B#A#.#
  #C#C#A#B#
  ######### 
518

#############
#AA.......BC#
###D#B#D#.###
  #D#C#B#.#
  #D#B#A#.#
  #C#C#A#.#
  ######### 
568

#############
#AA.......BC#
###D#B#.#.###
  #D#C#B#.#
  #D#B#A#.#
  #C#C#A#D#
  ######### 
7568

#############
#AA.......BC#
###.#B#.#.###
  #D#C#B#.#
  #D#B#A#D#
  #C#C#A#D#
  ######### 
17568

#############
#AA.......BC#
###.#B#.#.###
  #.#C#B#D#
  #D#B#A#D#
  #C#C#A#D#
  ######### 
27568

#############
#AA.......BC#
###.#B#.#D###
  #.#C#B#D#
  #.#B#A#D#
  #C#C#A#D#
  ######### 
37568

#############
#AA.....C.BC#
###.#B#.#D###
  #.#C#B#D#
  #.#B#A#D#
  #.#C#A#D#
  ######### 
38468

#############
#A......C.BC#
###.#B#.#D###
  #.#C#B#D#
  #.#B#A#D#
  #A#C#A#D#
  ######### 
38473

#############
#.......C.BC#
###.#B#.#D###
  #.#C#B#D#
  #A#B#A#D#
  #A#C#A#D#
  ######### 
38478

#############
#.B.....C.BC#
###.#B#.#D###
  #.#C#.#D#
  #A#B#A#D#
  #A#C#A#D#
  ######### 
38548

#############
#.B.....C.BC#
###A#B#.#D###
  #A#C#.#D#
  #A#B#.#D#
  #A#C#.#D#
  ######### 
38566

#############
#.B.......BC#
###A#B#.#D###
  #A#C#.#D#
  #A#B#.#D#
  #A#C#C#D#
  ######### 
39066

#############
#.B.....B.BC#
###A#.#.#D###
  #A#C#.#D#
  #A#B#.#D#
  #A#C#C#D#
  ######### 
39106

#############
#.B.....B.BC#
###A#.#.#D###
  #A#.#.#D#
  #A#B#C#D#
  #A#C#C#D#
  ######### 
39806

#############
#.B.B...B.BC#
###A#.#.#D###
  #A#.#.#D#
  #A#.#C#D#
  #A#C#C#D#
  ######### 
39846

#############
#.B.B...B.BC#
###A#.#.#D###
  #A#.#C#D#
  #A#.#C#D#
  #A#.#C#D#
  ######### 
40646

#############
#..........C#
###A#B#.#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  ######### 
40866

#############
#..........C#
###A#B#C#D###
  #A#B#C#D#
  #A#B#C#D#
  #A#B#C#D#
  ######### 
41366
`;
