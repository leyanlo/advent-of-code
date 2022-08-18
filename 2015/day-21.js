require = require('esm')(module);
const $C = require('js-combinatorics');
const fs = require('fs');

const input = fs.readFileSync('./day-21-input.txt', 'utf8').trimEnd(),
  hp = 100;

const weapons = [
  { name: 'Dagger', cost: 8, damage: 4, armor: 0 },
  { name: 'Shortsword', cost: 10, damage: 5, armor: 0 },
  { name: 'Warhammer', cost: 25, damage: 6, armor: 0 },
  { name: 'Longsword', cost: 40, damage: 7, armor: 0 },
  { name: 'Greataxe', cost: 74, damage: 8, armor: 0 },
];
const armors = [
  { name: 'Leather', cost: 13, damage: 0, armor: 1 },
  { name: 'Chainmail', cost: 31, damage: 0, armor: 2 },
  { name: 'Splintmail', cost: 53, damage: 0, armor: 3 },
  { name: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
  { name: 'Platemail', cost: 102, damage: 0, armor: 5 },
];
const rings = [
  { name: 'Damage +1', cost: 25, damage: 1, armor: 0 },
  { name: 'Damage +2', cost: 50, damage: 2, armor: 0 },
  { name: 'Damage +3', cost: 100, damage: 3, armor: 0 },
  { name: 'Defense +1', cost: 20, damage: 0, armor: 1 },
  { name: 'Defense +2', cost: 40, damage: 0, armor: 2 },
  { name: 'Defense +3', cost: 80, damage: 0, armor: 3 },
];

function process(input) {
  const [hp, damage, armor] = input.match(/\d+/g).map(Number);
  return { hp, damage, armor };
}

function cost(config) {
  return config.map((item) => item.cost).reduce((acc, n) => acc + n);
}

function equip(config) {
  return {
    damage: config.map((item) => item.damage).reduce((acc, n) => acc + n),
    armor: config.map((item) => item.armor).reduce((acc, n) => acc + n),
  };
}

function solve(input) {
  const boss = process(input);

  const weaponCombos = weapons.map((w) => [w]);
  const armorCombos = [[], ...armors.map((a) => [a])];
  const ringCombos = [
    [],
    ...rings.map((r) => [r]),
    ...new $C.Combination(rings, 2),
  ];
  const configs = weaponCombos
    .flatMap((w) =>
      armorCombos.flatMap((a) => ringCombos.map((r) => [...w, ...a, ...r]))
    )
    .sort((a, b) => cost(a) - cost(b));

  outer: for (const config of configs) {
    const players = [{ hp, ...equip(config) }, { ...boss }];
    while (true) {
      for (let i = 0; i < players.length; i++) {
        const p1 = players[i];
        const p2 = players[(i + 1) % 2];
        p2.hp -= Math.max(1, p1.damage - p2.armor);
        if (p2.hp <= 0) {
          if (i === 0) {
            console.log(cost(config));
            break outer;
          }
          continue outer;
        }
      }
    }
  }

  outer: for (const config of configs.reverse()) {
    const players = [{ hp, ...equip(config) }, { ...boss }];
    while (true) {
      for (let i = 0; i < players.length; i++) {
        const p1 = players[i];
        const p2 = players[(i + 1) % 2];
        p2.hp -= Math.max(1, p1.damage - p2.armor);
        if (p2.hp <= 0) {
          if (i === 1) {
            console.log(cost(config));
            break outer;
          }
          continue outer;
        }
      }
    }
  }
}
solve(input);
