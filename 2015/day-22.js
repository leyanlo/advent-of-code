const fs = require('fs');

const input = fs.readFileSync('./day-22-input.txt', 'utf8').trimEnd(),
  player = {
    hp: 50,
    mana: 500,
  };

const costs = {
  missile: 53,
  drain: 73,
  shield: 113,
  poison: 173,
  recharge: 229,
};

function getCost(spells) {
  return spells.map((spell) => costs[spell]).reduce((acc, n) => acc + n);
}

function parseInput(input) {
  const [hp, damage] = input.match(/\d+/g).map(Number);
  return { hp, damage };
}

function solve(input, part) {
  const boss = parseInput(input);
  let states = Object.keys(costs).map((spell) => ({
    players: [
      { ...player, ...(part === 2 ? { hp: player.hp - 1 } : {}) },
      { ...boss },
    ],
    effectTimers: { shield: 0, poison: 0, recharge: 0 },
    spells: [spell],
  }));
  let minCost = null;
  while (states.length) {
    const {
      players: [p1, p2],
      effectTimers,
      spells,
    } = states.shift();
    const nextSpell = spells[spells.length - 1];
    const cost = getCost(spells);
    p1.mana -= costs[nextSpell];
    switch (nextSpell) {
      case 'missile':
        p2.hp -= 4;
        break;
      case 'drain':
        p2.hp -= 2;
        p1.hp += 2;
        break;
      case 'shield':
        effectTimers.shield = 7;
        break;
      case 'poison':
        effectTimers.poison = 7;
        break;
      case 'recharge':
        effectTimers.recharge = 6;
        break;
    }
    for (const p of [p2, p1]) {
      if (part === 2 && p === p1) {
        p1.hp--;
        if (p1.hp <= 0) {
          break;
        }
      }
      for (const spell of Object.keys(effectTimers)) {
        effectTimers[spell] = Math.max(0, effectTimers[spell] - 1);
      }
      p1.shield = (effectTimers.shield > 0) * 7;
      if (effectTimers.poison > 0) {
        p2.hp -= 3;
      }
      if (effectTimers.recharge > 0) {
        p1.mana += 101;
      }
      if (p2.hp <= 0) {
        minCost = cost;
        states = states.filter((state) => getCost(state.spells) < minCost);
        break;
      }
      if (p === p2) {
        p1.hp -= p2.damage - (p1.shield ?? 0);
        if (p1.hp <= 0) {
          break;
        }
      } else {
        states.push(
          ...Object.keys(costs)
            .map((spell) => ({
              players: [{ ...p1 }, { ...p2 }],
              effectTimers: { ...effectTimers },
              spells: [...spells, spell],
            }))
            .filter((state) => {
              const nextSpell = state.spells[state.spells.length - 1];
              return (
                (!effectTimers[nextSpell] || effectTimers[nextSpell] <= 1) &&
                costs[nextSpell] <= p1.mana &&
                (!minCost || getCost(state.spells) < minCost)
              );
            })
        );
      }
    }
  }
  console.log(minCost);
}
solve(input, 1);
solve(input, 2);
