const inputIdx = 1;
const debug = false;
const part1 = true;
const part2 = true;

function solve1(input) {
  const decks = input
    .split('\n\n')
    .map((player) => player.split('\n').slice(1).map(Number));

  let round = 0;
  while (decks.every((deck) => deck.length)) {
    round++;
    debug && console.log({ round, decks });

    const tops = decks.map((deck) => deck.shift());

    const winner = +(tops[1] > tops[0]);
    tops.sort((a, b) => b - a);
    decks[winner].push(...tops);
  }

  const score = decks.reduce((score, deck) => {
    return (
      score +
      deck.reduce((score, card, i) => {
        return score + card * (deck.length - i);
      }, 0)
    );
  }, 0);
  console.log({ score });
}

let nGames = 0;

function getFinalDecks(decks) {
  const memo = {};
  let round = 0;
  const game = ++nGames;
  while (decks.every((deck) => deck.length)) {
    round++;
    debug && console.log({ round, game, decks });
    const memoKey = JSON.stringify(decks);
    if (memo[memoKey]) {
      // force player 1 win
      return [[1], []];
    }

    const tops = decks.map((deck) => deck.shift());

    const winner = getRoundWinner(tops, decks);
    memo[memoKey] = [...decks.map((deck) => [...deck])];
    decks[winner].push(tops[winner], tops[+!winner]);
  }
  return decks;
}

function getRoundWinner(tops, decks) {
  if (decks[0].length >= tops[0] && decks[1].length >= tops[1]) {
    return getFinalDecks(
      decks.map((deck, i) => deck.slice(0, tops[i]))
    ).findIndex((deck) => !!deck.length);
  } else {
    return +(tops[1] > tops[0]);
  }
}

function solve2(input) {
  let decks = input
    .split('\n\n')
    .map((player) => player.split('\n').slice(1).map(Number));

  decks = getFinalDecks(decks);

  const score = decks.reduce((score, deck) => {
    return (
      score +
      deck.reduce((score, card, i) => {
        return score + card * (deck.length - i);
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
