const fs = require('fs');

var input = `p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`;
var input = fs.readFileSync('./day-20-input.txt', 'utf8').trimEnd();

// // Manhattan distance
// function abs(v) {
//   return v.reduce((acc, x) => acc + Math.abs(x), 0);
// }
//
// function solve(input) {
//   const particles = input.split('\n').map((line, id) => {
//     const [px, py, pz, vx, vy, vz, ax, ay, az] = line
//       .match(/[\-\d]+/g)
//       .map(Number);
//     return { p: [px, py, pz], v: [vx, vy, vz], a: [ax, ay, az], id };
//   });
//   console.log(
//     particles.sort((a, b) => abs(a.a) - abs(b.a) || abs(a.v) - abs(b.v))[0].id
//   );
// }
// solve(input);

function quadratic(a, b, c) {
  return [1, -1].map(
    (sign) => (-b + sign * Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a)
  );
}

function validTime(t) {
  return t >= 0 && t === ~~t;
}

function getCollision(p1, p2) {
  const timesMap = [0, 1, 2]
    .map((i) =>
      p1.a[i] === p2.a[i]
        ? p1.v[i] === p2.v[i]
          ? p1.p[i] === p2.p[i]
            ? // always
              null
            : // never
              []
          : // linear
            [-(p2.p[i] - p1.p[i]) / (p2.v[i] - p1.v[i])].filter(validTime)
        : // quadratic
          quadratic(
            (p2.a[i] - p1.a[i]) / 2,
            p2.v[i] + p2.a[i] / 2 - p1.v[i] - p1.a[i] / 2,
            p2.p[i] - p1.p[i]
          ).filter(validTime)
    )
    .filter(Boolean);
  return (
    timesMap
      .reduce((acc, times) => acc.filter((t) => times.includes(t)))
      .sort((a, b) => a - b)[0] ?? null
  );
}

function solve(input) {
  const particles = input.split('\n').map((line, id) => {
    const [px, py, pz, vx, vy, vz, ax, ay, az] = line
      .match(/[\-\d]+/g)
      .map(Number);
    return { p: [px, py, pz], v: [vx, vy, vz], a: [ax, ay, az], id };
  });

  const collisions = [];
  for (let i = 0; i < particles.length - 1; i++) {
    const p1 = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const t = getCollision(p1, p2);
      if (t !== null) {
        collisions[t] = collisions[t] ?? [];
        collisions[t].push([p1.id, p2.id]);
      }
    }
  }

  const collided = new Set();
  for (const t in collisions) {
    const idsToAdd = [];
    for (const ids of collisions[t]) {
      if (ids.every((id) => !collided.has(id))) {
        idsToAdd.push(...ids);
      }
    }
    for (const id of idsToAdd) {
      collided.add(id);
    }
  }
  console.log(particles.length - collided.size);
}
solve(input);
