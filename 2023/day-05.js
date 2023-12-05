const fs = require('fs');

var input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
var input = fs.readFileSync('./day-05-input.txt', 'utf8').trimEnd();

// function solve(input) {
//   let [seeds, ...maps] = input.split('\n\n');
//   seeds = seeds.match(/\d+/g).map(Number);
//   console.log(seeds, maps);
//   for (let map of maps) {
//     map = map
//       .split('\n')
//       .slice(1)
//       .map((line) => line.match(/\d+/g).map(Number));
//     console.log(map);
//     for (let i = 0; i < seeds.length; i++) {
//       const seed = seeds[i];
//       for (const [dest, source, len] of map) {
//         if (seed >= source && seed < source + len) {
//           seeds[i] = seeds[i] - source + dest;
//           break;
//         }
//       }
//     }
//   }
//   console.log(Math.min(...seeds))
// }
// solve(input);
function solve(input) {
  let [seeds, ...maps] = input.split('\n\n');
  seeds = seeds.match(/\d+/g).map(Number);
  const nextSeeds = [];
  for (let i = 0; i < seeds.length; i += 2) {
    nextSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }
  seeds = nextSeeds;
  console.log(seeds, maps);
  for (let map of maps) {
    console.log(map.split('\n')[0]); // light to temp should have 77 to 45
    map = map
      .split('\n')
      .slice(1)
      .map((line) => line.match(/\d+/g).map(Number));
    console.log('seeds:', seeds);
    console.log('map:', map);

    const nextNextSeeds = [];
    for (const [dest, source, len] of map) {
      const nextSeeds = [];
      while (seeds.length) {
        const [start, end] = seeds.shift();
        if (start >= source && start < source + len) {
          if (end < source + len) {
            nextNextSeeds.push([start - source + dest, end - source + dest]);
          } else {
            nextNextSeeds.push([start - source + dest, len - 1 + dest]);
            nextSeeds.push([source + len, end]);
          }
        } else if (end >= source && end < source + len) {
          nextNextSeeds.push([dest, end - source + dest]);
          nextSeeds.push([start, source - 1]);
        } else {
          nextSeeds.push([start, end]);
        }
      }
      seeds = nextSeeds;
    }
    seeds.push(...nextNextSeeds);
  }
  console.log('seeds:', seeds);
  console.log(Math.min(...seeds.flat()));
}
solve(input);
