const fs = require('fs');

// var input = `/->-\\
// |   |  /----\\
// | /-+--+-\\  |
// | | |  | v  |
// \\-+-/  \\-+--/
//   \\------/`;
var input = `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`;
var input = fs.readFileSync('./day-13-input.txt', 'utf8').trimEnd();

const dirs = ['^', '>', 'v', '<'];

const turns = [-1, 0, 1];

const charToTrack = {
  '^': '|',
  '>': '-',
  v: '|',
  '<': '-',
};

const dirToDeltas = {
  '^': [-1, 0],
  '>': [0, 1],
  v: [1, 0],
  '<': [0, -1],
};

const turnDir = {
  '^': { '/': '>', '\\': '<' },
  '>': { '/': '^', '\\': 'v' },
  v: { '/': '<', '\\': '>' },
  '<': { '/': 'v', '\\': '^' },
};

function coordsToKey(r, c) {
  return `${c},${r}`;
}

function keyToCoords(key) {
  return key.split(',').reverse().map(Number);
}

function updateCart(cart, track) {
  switch (track) {
    case '/':
    case '\\':
      cart.dir = turnDir[cart.dir][track];
      break;
    case '+':
      cart.dir =
        dirs[
          (dirs.indexOf(cart.dir) + turns[cart.turnIdx] + dirs.length) %
            dirs.length
        ];
      cart.turnIdx = (cart.turnIdx + 1) % turns.length;
  }
}

function solve(input, part) {
  // console.log(input);
  const tracks = input.split('\n').map((row) => row.split(''));
  let carts = {};
  for (let r = 0; r < tracks.length; r++) {
    for (let c = 0; c < tracks[r].length; c++) {
      const char = tracks[r][c];
      switch (char) {
        case '^':
        case 'v':
        case '<':
        case '>':
          carts[coordsToKey(r, c)] = { dir: char, turnIdx: 0 };
          tracks[r][c] = charToTrack[char];
      }
    }
  }
  while (true) {
    // console.log(carts);
    // console.log(
    //   tracks
    //     .map((row, r) =>
    //       row.map((char, c) => carts[coordsToKey(r, c)]?.dir ?? char).join('')
    //     )
    //     .join('\n')
    // );
    for (const [key, cart] of Object.entries(carts).sort(([aKey], [bKey]) => {
      const [a, b] = [aKey, bKey].map(keyToCoords);
      return a[0] - b[0] || a[1] - b[1];
    })) {
      if (!carts[key]) continue;
      delete carts[key];
      const [r, c] = keyToCoords(key);
      const [dr, dc] = dirToDeltas[cart.dir];
      const [r2, c2] = [r + dr, c + dc];
      const nextKey = coordsToKey(r2, c2);
      if (carts[nextKey]) {
        if (part === 1) {
          console.log(nextKey);
          return;
        }

        delete carts[nextKey];
        continue;
      }
      updateCart(cart, tracks[r2][c2]);
      carts[nextKey] = cart;
    }
    const keys = Object.keys(carts);
    if (keys.length === 1) {
      console.log(keys[0]);
      return;
    }
  }
}
solve(input, 1);
solve(input, 2);
