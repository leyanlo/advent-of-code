const fs = require('fs');

var input = `9 players; last marble is worth 25 points`;
var input = `10 players; last marble is worth 1618 points`;
var input = fs.readFileSync('./day-09-input.txt', 'utf8').trimEnd();
// 3245700548 too low

// insert item into doubly-linked list
function insert(prev, next, item) {
  prev.next = item;
  item.prev = prev;
  item.next = next;
  next.prev = item;
}

function solve(input) {
  const [nPlayers, nMarbles] = input.match(/\d+/g).map(Number);

  let current = {
    value: 0,
  };
  current.next = current;
  current.prev = current;

  const scores = Array(nPlayers).fill(0);
  for (let i = 1; i < nMarbles*100; i++) {
    let next;
    if (i % 23 !== 0) {
      const start = current.next;
      next = {
        value: i,
      };
      insert(start, start.next, next);
    } else {
      const start = current.prev.prev.prev.prev.prev.prev.prev.prev;
      scores[i % nPlayers] += i + start.next.value;
      next = start.next.next;
      insert(start, start.next.next.next, next);
    }
    current = next;
  }
  console.log(Math.max(...scores));
}
solve(input);
