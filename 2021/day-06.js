const fs = require('fs');

var input = `3,4,3,1,2`;
var input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve1(input) {
  let fishes = input.split(',').map(Number);
  for (let day = 0; day < 80; day++) {
    const numNewFishes = fishes.filter((f) => f === 0).length;
    fishes = fishes.map((f) => (f === 0 ? 6 : f - 1));
    fishes.push(...Array(numNewFishes).fill(8));
  }
  console.log(fishes.length)
}
solve1(input);

function solve2(input) {
  const fishes = input.split(',').map(Number);
  let fishMap = Array(9).fill(0);
  for (const fish of fishes) {
    fishMap[fish] = fishMap[fish] + 1;
  }
  for (let i = 0; i < 256; i++) {
    const numNewFishes = fishMap[0];
    const nextFishMap = Array(9).fill(0);
    nextFishMap[8] += fishMap[0];
    nextFishMap[6] += fishMap[0];
    for (let j = 1; j <= 8; j++) {
      nextFishMap[j - 1] += fishMap[j];
    }
    fishMap = nextFishMap;
  }
  console.log(fishMap.reduce((acc, f) => acc + f, 0));
}
solve2(input);
