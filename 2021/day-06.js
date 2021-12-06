const fs = require('fs');

const input = fs.readFileSync('./day-06-input.txt', 'utf8').trimEnd();

function solve(input, days) {
  const fishes = input.split(',').map(Number);
  const fishMap = Array(9).fill(0);
  for (const fish of fishes) {
    fishMap[fish] = fishMap[fish] + 1;
  }
  let zeroIdx = 0;
  for (let i = 0; i < days; i++) {
    fishMap[(zeroIdx + 7) % 9] += fishMap[zeroIdx];
    zeroIdx = (zeroIdx + 1) % 9;
  }
  console.log(fishMap.reduce((acc, f) => acc + f, 0));
}
solve(input, 80);
solve(input, 256);
