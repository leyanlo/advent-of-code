const inputIdx = 1;
const debug = false;
const part1 = true;
const part2 = true;

function solve1(input) {
  input = input.split('\n\n');
  const decks = input.map((player) => player.split('\n').slice(1).map(Number));
  debug && console.log({ decks });

  while (decks.every((deck) => deck.length)) {
    const tops = decks.map((deck) => deck.shift());
    debug && console.log({ tops, decks });

    const winner = +(tops[1] > tops[0]);
    tops.sort((a, b) => b - a);
    decks[winner].push(...tops);
    debug && console.log({ decks });
  }

  const score = decks.reduce((score, deck) => {
    return (
      score +
      deck.reduce((s, card, i) => {
        return s + card * (deck.length - i);
      }, 0)
    );
  }, 0);
  console.log({ score });
}

const memo = {};

function getFinalDecks(decks, round, game) {
  let winner;
  while (decks.every((deck) => deck.length)) {
    debug && console.log({ round, game, decks });
    const memoKey = JSON.stringify(decks);
    if (memo[memoKey]) {
      decks = [[1], []];
      break;
    }

    const tops = decks.map((deck) => deck.shift());

    winner = getRoundWinner(tops, decks, round, game);
    memo[memoKey] = [...decks.map((deck) => [...deck])];
    decks[winner].push(tops[winner], tops[+!winner]);
    round++;
  }
  debug && console.log('Player', winner + 1, 'wins game', game);
  return decks;
}

function getRoundWinner(tops, decks, round, game) {
  let winner;
  if (decks[0].length >= tops[0] && decks[1].length >= tops[1]) {
    winner = getFinalDecks(
      decks.map((deck, i) => deck.slice(0, tops[i])),
      1,
      game + 1
    ).findIndex((deck) => !!deck.length);
  } else {
    winner = +(tops[1] > tops[0]);
  }

  return winner;
}

function solve2(input) {
  input = input.split('\n\n');
  let decks = input.map((player) => player.split('\n').slice(1).map(Number));

  decks = getFinalDecks(decks, 1, 1);

  const score = decks.reduce((score, deck) => {
    return (
      score +
      deck.reduce((s, card, i) => {
        return s + card * (deck.length - i);
      }, 0)
    );
  }, 0);
  console.log({ score });
}

const inputs = [];
inputs.push(`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`);

inputs.push(`Player 1:
21
50
9
45
16
47
27
38
29
48
10
42
32
31
41
11
8
33
25
30
12
40
7
23
46

Player 2:
22
20
44
2
26
17
34
37
43
5
15
18
36
19
24
35
3
13
14
1
6
39
49
4
28`);

part1 && solve1(inputs[inputIdx]);
part2 && solve2(inputs[inputIdx]);
