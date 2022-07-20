const fs = require('fs');

var input = `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;
var input = fs.readFileSync('./day-24-input.txt', 'utf8').trimEnd();
// 22140 too high

function logArmies(armies) {
  console.log(
    armies
      .map(
        (army, i) =>
          `${['Immune System', 'Infection'][i]}:\n${
            army.length
              ? army
                  .map(
                    (group) =>
                      `Group ${group.number} contains ${group.units} units`
                  )
                  .join('\n')
              : 'No groups remain.'
          }`
      )
      .join('\n'),
    '\n'
  );
}

function getPower({ units, attack }) {
  return units * attack.damage;
}

function getDamage(attacker, defender) {
  return (
    getPower(attacker) *
    !defender.immunities?.includes(attacker.attack.type) *
    (!!defender.weaknesses?.includes(attacker.attack.type) + 1)
  );
}

function solve(input, debug) {
  const armies = input.split('\n\n').map((group, i) => {
    const lines = group.split('\n');
    return lines.slice(1).map((line, j) => ({
      armyName: lines[0].substring(0, lines[0].length - 1),
      number: j + 1,
      units: +line.match(/(\d+) units/)[1],
      hp: +line.match(/(\d+) hit points/)[1],
      attack: {
        damage: +line.match(/attack that does (\d+)/)[1],
        type: line.match(/(\w+) damage/)[1],
      },
      initiative: +line.match(/initiative (\d+)/)[1],
      weaknesses: line.match(/weak to ([\w, ]+)/)?.[1].split(', ') ?? null,
      immunities: line.match(/immune to ([\w, ]+)/)?.[1].split(', ') ?? null,
    }));
  });

  while (armies.every((army) => army.length)) {
    debug && logArmies(armies);

    // target selection
    const targets = new Map();
    for (let i = 1; i >= 0; i--) {
      const attackers = [...armies[i]];
      const defenders = [...armies[(i + 1) % 2]];
      for (const attacker of attackers.sort(
        (a, b) => getPower(b) - getPower(a) || b.initiative - a.initiative
      )) {
        debug &&
          defenders.length &&
          console.log(
            defenders
              .sort((a, b) => a.number - b.number)
              .map(
                (defender) =>
                  `${attacker.armyName} group ${
                    attacker.number
                  } would deal defending group ${defender.number} ${getDamage(
                    attacker,
                    defender
                  )} damage`
              )
              .join('\n')
          );
        defenders.sort(
          (a, b) =>
            getDamage(attacker, b) - getDamage(attacker, a) ||
            getPower(b) - getPower(a) ||
            b.initiative - a.initiative
        );
        if (defenders[0] && getDamage(attacker, defenders[0])) {
          targets.set(attacker, defenders.shift());
        }
      }
    }
    debug && console.log();

    // attack
    for (const attacker of armies
      .flat()
      .sort((a, b) => b.initiative - a.initiative)) {
      const defender = targets.get(attacker);
      if (!defender || attacker.units <= 0) {
        continue;
      }

      const kills = Math.min(
        defender.units,
        ~~(getDamage(attacker, defender) / defender.hp)
      );
      debug &&
        console.log(
          `${attacker.armyName} group ${attacker.number} attacks defending group ${defender.number}, killing ${kills} units`
        );
      defender.units -= kills;
      if (defender.units === 0) {
        console.log('FOOBAR');
      }
    }
    debug && console.log('\n');

    // remove unitless groups
    for (let i = 0; i < armies.length; i++) {
      armies[i] = armies[i].filter((group) => group.units > 0);
    }
  }

  debug && logArmies(armies);

  console.log(
    armies
      .flat()
      .map((group) => group.units)
      .reduce((acc, n) => acc + n)
  );
}
solve(input, true);
