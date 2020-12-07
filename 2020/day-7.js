function inputToMap(input) {
  return input.reduce((map, line) => {
    const [left, right] = line.split(' contain ');
    const bag = left.split(' ').slice(0, -1).join(' ');
    if (right === 'no other bags.') {
      map[bag] = {};
    } else {
      map[bag] = right.split(', ').reduce((innerMap, rule) => {
        const split = rule.split(' ');
        const innerBag = split.slice(1, -1).join(' ');
        innerMap[innerBag] = +split[0];
        return innerMap;
      }, {});
    }
    return map;
  }, {});
}

function hasBag(map, outerBag, innerBag) {
  if (map[outerBag][innerBag]) {
    return true;
  }

  return Object.keys(map[outerBag]).reduce((acc, key) => {
    return acc || hasBag(map, key, innerBag);
  }, false);
}

function numBags(map, bag) {
  return Object.keys(map[bag]).reduce((acc, key) => {
    return acc + map[bag][key] * (1 + numBags(map, key));
  }, 0);
}

function solve1(input) {
  const map = inputToMap(input);

  const count = Object.keys(map).reduce((count, key) => {
    return count + hasBag(map, key, 'shiny gold');
  }, 0);
  console.log(count);
}

function solve2(input) {
  const map = inputToMap(input);

  console.log(numBags(map, 'shiny gold'));
}

const input = `striped orange bags contain 1 vibrant green bag, 5 plaid yellow bags, 1 drab magenta bag.
dark fuchsia bags contain 3 wavy indigo bags, 4 striped lime bags.
clear maroon bags contain 2 clear gold bags, 5 bright salmon bags, 5 wavy tomato bags.
faded tan bags contain 4 dim brown bags.
wavy olive bags contain 3 faded gray bags, 2 posh brown bags, 3 striped cyan bags.
light plum bags contain 4 vibrant plum bags.
vibrant cyan bags contain 4 dotted gold bags, 4 bright indigo bags, 4 wavy lime bags, 3 clear plum bags.
vibrant beige bags contain 1 wavy silver bag, 4 shiny indigo bags, 2 wavy aqua bags, 1 mirrored cyan bag.
light tomato bags contain 5 muted green bags, 2 striped tomato bags, 4 faded aqua bags, 2 muted salmon bags.
drab white bags contain 5 faded beige bags, 1 light purple bag, 1 striped white bag, 4 muted cyan bags.
faded purple bags contain 5 posh lime bags.
striped violet bags contain 1 dim bronze bag, 2 faded plum bags.
pale teal bags contain 2 shiny salmon bags, 2 light tomato bags, 5 dim coral bags.
dull lime bags contain 3 bright tomato bags, 3 dim magenta bags, 3 bright cyan bags, 2 dark teal bags.
dim salmon bags contain 3 dark chartreuse bags.
faded teal bags contain 2 shiny coral bags, 4 dark turquoise bags, 3 wavy black bags.
dark green bags contain 5 vibrant green bags, 4 clear blue bags.
dim black bags contain 2 vibrant bronze bags.
light yellow bags contain 2 faded salmon bags, 4 muted aqua bags.
drab brown bags contain 3 clear green bags, 2 pale aqua bags.
dotted tomato bags contain 3 vibrant purple bags, 3 vibrant tomato bags, 3 clear lime bags, 5 dim gold bags.
faded orange bags contain 1 pale brown bag.
light black bags contain 1 striped silver bag, 3 dim brown bags, 2 bright cyan bags, 3 striped lime bags.
plaid turquoise bags contain 5 muted fuchsia bags, 1 dull violet bag.
light lime bags contain 1 clear lime bag, 5 wavy blue bags.
plaid blue bags contain 2 dotted blue bags, 5 light brown bags, 5 posh teal bags.
vibrant maroon bags contain 2 bright lavender bags.
light orange bags contain 1 wavy magenta bag, 3 clear orange bags, 4 striped silver bags.
bright beige bags contain 2 plaid red bags, 1 dull aqua bag, 3 bright fuchsia bags.
striped crimson bags contain 3 faded maroon bags, 3 dull chartreuse bags, 4 mirrored red bags, 4 clear orange bags.
posh silver bags contain 3 pale plum bags, 4 light salmon bags, 5 light purple bags.
dull white bags contain 2 dark white bags.
bright lime bags contain 4 clear indigo bags, 2 vibrant green bags.
bright crimson bags contain 3 light lime bags.
dull lavender bags contain 3 vibrant magenta bags.
pale purple bags contain no other bags.
vibrant coral bags contain 3 bright cyan bags, 2 bright tomato bags.
posh salmon bags contain 4 vibrant magenta bags, 3 dull aqua bags.
dull black bags contain 4 dotted black bags.
shiny salmon bags contain 2 faded plum bags, 5 clear lavender bags, 1 light crimson bag, 2 light gray bags.
vibrant red bags contain 3 dim bronze bags, 1 striped indigo bag, 1 vibrant silver bag.
plaid beige bags contain 1 posh purple bag, 5 pale bronze bags, 1 dotted white bag.
striped bronze bags contain 1 wavy salmon bag.
shiny lavender bags contain 2 shiny salmon bags, 2 bright salmon bags, 4 posh fuchsia bags.
plaid chartreuse bags contain 2 vibrant bronze bags, 1 dull chartreuse bag, 3 wavy tomato bags.
bright chartreuse bags contain no other bags.
wavy white bags contain 2 dim blue bags, 5 faded silver bags, 5 shiny silver bags, 2 shiny beige bags.
drab beige bags contain 5 wavy tomato bags.
mirrored teal bags contain 5 muted lavender bags, 4 dull chartreuse bags.
dotted bronze bags contain 1 clear magenta bag, 2 muted silver bags, 5 muted cyan bags.
dim red bags contain 5 shiny fuchsia bags, 3 dotted white bags.
shiny crimson bags contain 2 dull white bags, 2 vibrant maroon bags.
wavy plum bags contain 5 light crimson bags, 4 clear green bags.
faded olive bags contain 5 posh cyan bags.
mirrored gold bags contain 5 striped gold bags.
dim cyan bags contain 5 shiny green bags, 5 wavy blue bags, 3 mirrored lime bags, 4 dark plum bags.
vibrant orange bags contain 2 mirrored lime bags, 1 bright chartreuse bag, 3 pale crimson bags, 4 muted beige bags.
pale beige bags contain 5 dull olive bags.
posh lavender bags contain 1 faded red bag, 2 wavy maroon bags.
plaid teal bags contain 3 dull black bags, 5 muted tan bags.
wavy red bags contain 1 posh salmon bag, 1 light black bag, 2 drab olive bags, 4 drab beige bags.
drab maroon bags contain 5 bright yellow bags.
clear tan bags contain 1 light yellow bag, 2 mirrored indigo bags, 2 dotted olive bags, 3 dim magenta bags.
striped turquoise bags contain 1 posh cyan bag, 1 clear crimson bag.
posh turquoise bags contain 3 bright bronze bags, 5 bright orange bags.
dark turquoise bags contain 3 posh yellow bags, 4 dull red bags, 5 plaid silver bags, 3 bright tomato bags.
posh green bags contain 2 wavy bronze bags.
muted green bags contain 2 bright fuchsia bags, 2 muted gold bags, 3 light orange bags.
drab salmon bags contain 3 light black bags.
dotted coral bags contain 4 pale chartreuse bags.
dark yellow bags contain 5 faded red bags, 5 pale brown bags.
muted teal bags contain 1 clear gold bag, 5 striped tomato bags, 2 dark teal bags.
bright silver bags contain 2 bright gray bags.
drab chartreuse bags contain 5 pale teal bags.
muted plum bags contain 3 posh white bags, 1 bright red bag, 5 striped gold bags.
dark bronze bags contain 2 bright cyan bags, 1 dim beige bag, 1 pale bronze bag, 3 light gray bags.
dim fuchsia bags contain 3 dark black bags, 3 mirrored chartreuse bags, 3 faded gray bags.
faded brown bags contain 3 wavy white bags, 1 dull violet bag.
bright green bags contain 4 vibrant fuchsia bags, 2 shiny white bags, 3 mirrored blue bags, 4 posh aqua bags.
dotted turquoise bags contain 1 shiny beige bag, 3 wavy blue bags.
wavy chartreuse bags contain 5 dark plum bags.
shiny orange bags contain 4 clear orange bags, 4 dark coral bags, 2 bright teal bags, 5 dotted brown bags.
shiny gray bags contain 3 dull olive bags, 3 muted aqua bags.
clear blue bags contain 5 bright salmon bags, 2 shiny gold bags.
vibrant olive bags contain 5 bright salmon bags, 1 muted green bag, 4 wavy olive bags.
muted gold bags contain 3 striped plum bags, 4 dull violet bags, 1 shiny green bag.
plaid aqua bags contain 4 shiny purple bags, 1 wavy lime bag, 3 striped violet bags, 4 clear magenta bags.
dim bronze bags contain no other bags.
vibrant turquoise bags contain 5 wavy plum bags.
light teal bags contain 4 clear plum bags, 2 drab crimson bags.
light coral bags contain 1 drab violet bag, 3 light yellow bags, 2 faded maroon bags.
bright cyan bags contain 5 dim crimson bags, 3 striped plum bags, 2 muted gold bags.
wavy purple bags contain 4 vibrant tomato bags, 4 dull bronze bags, 1 dim coral bag.
dull tan bags contain 5 muted fuchsia bags.
bright white bags contain 5 pale blue bags.
clear plum bags contain 2 muted lavender bags, 1 faded aqua bag, 1 faded plum bag, 3 dull indigo bags.
vibrant tomato bags contain 1 posh purple bag, 5 mirrored lime bags, 3 vibrant turquoise bags, 4 clear maroon bags.
muted tan bags contain 2 dim magenta bags, 4 dotted gray bags, 4 plaid orange bags, 2 pale green bags.
dark brown bags contain 5 striped plum bags, 2 mirrored tomato bags, 4 faded plum bags, 3 light yellow bags.
striped yellow bags contain 5 muted indigo bags, 4 bright black bags, 3 clear lime bags, 1 striped white bag.
posh black bags contain 2 mirrored tomato bags, 4 posh gray bags.
wavy black bags contain 5 pale orange bags, 3 posh violet bags, 2 dotted white bags, 2 faded red bags.
muted indigo bags contain 2 bright fuchsia bags, 4 muted lavender bags.
bright coral bags contain 1 posh chartreuse bag, 2 shiny gold bags.
posh tomato bags contain 4 light violet bags, 1 mirrored olive bag.
posh cyan bags contain 2 mirrored chartreuse bags, 4 dotted black bags, 5 vibrant gray bags.
pale silver bags contain 1 light fuchsia bag, 4 dark red bags.
plaid indigo bags contain 4 plaid red bags, 3 striped cyan bags, 1 muted silver bag, 2 wavy magenta bags.
dotted indigo bags contain 1 mirrored magenta bag, 4 plaid gold bags, 3 dark coral bags, 2 vibrant silver bags.
light chartreuse bags contain 5 shiny blue bags, 5 drab coral bags, 4 drab turquoise bags.
pale tomato bags contain 3 wavy violet bags, 3 dotted tan bags, 4 drab brown bags.
muted chartreuse bags contain 3 dim silver bags, 1 dim chartreuse bag, 3 striped green bags, 3 dim magenta bags.
dull aqua bags contain 3 pale crimson bags, 2 drab aqua bags, 5 drab magenta bags, 3 clear gold bags.
dark lime bags contain 3 light tan bags.
dark orange bags contain 4 drab orange bags.
faded black bags contain 4 dotted chartreuse bags, 4 wavy silver bags, 5 plaid olive bags, 2 pale blue bags.
dull purple bags contain 1 clear gold bag, 5 wavy lavender bags.
dotted gold bags contain 3 pale purple bags, 1 dark olive bag, 5 wavy beige bags, 2 mirrored aqua bags.
pale bronze bags contain 2 shiny tomato bags, 5 vibrant turquoise bags.
bright aqua bags contain 1 pale teal bag, 4 faded coral bags, 2 clear olive bags.
faded beige bags contain 5 wavy yellow bags, 3 pale lavender bags, 1 vibrant coral bag.
drab turquoise bags contain 1 shiny tomato bag, 3 clear lavender bags, 2 drab orange bags.
light maroon bags contain 1 posh bronze bag, 3 dotted silver bags, 1 plaid silver bag, 1 muted teal bag.
posh maroon bags contain 1 mirrored maroon bag, 1 posh black bag, 3 faded salmon bags, 4 posh gray bags.
bright red bags contain 2 vibrant salmon bags.
vibrant purple bags contain 2 faded violet bags.
vibrant crimson bags contain 3 plaid yellow bags, 3 dotted yellow bags, 2 pale tan bags.
dim green bags contain 3 faded plum bags, 4 posh turquoise bags, 4 muted aqua bags.
striped gray bags contain 1 striped fuchsia bag.
light salmon bags contain 5 dim coral bags, 5 posh brown bags, 3 shiny green bags, 4 striped beige bags.
bright violet bags contain 5 dim maroon bags, 5 dark tan bags, 3 drab purple bags, 2 muted cyan bags.
dotted chartreuse bags contain 2 posh lime bags.
drab silver bags contain 1 dim coral bag, 3 pale chartreuse bags, 1 light salmon bag.
mirrored lime bags contain 4 light orange bags, 1 clear orange bag, 3 wavy plum bags.
muted violet bags contain 5 faded silver bags, 4 posh red bags, 2 drab aqua bags.
dull salmon bags contain 2 dull maroon bags, 3 mirrored red bags.
posh aqua bags contain 5 dim turquoise bags, 5 drab green bags, 2 striped red bags.
muted white bags contain 3 light yellow bags, 3 pale yellow bags, 2 dull olive bags.
wavy coral bags contain 3 wavy lime bags, 5 faded purple bags, 5 posh gray bags, 4 dark tomato bags.
dark silver bags contain 1 dull chartreuse bag, 2 dull violet bags.
dotted plum bags contain 1 mirrored violet bag, 3 dim crimson bags, 1 mirrored fuchsia bag, 1 light tan bag.
mirrored purple bags contain 2 muted lime bags, 4 mirrored teal bags, 2 light tomato bags.
drab yellow bags contain 4 drab violet bags, 3 striped orange bags.
striped teal bags contain 3 muted cyan bags, 1 light fuchsia bag.
drab red bags contain 2 faded coral bags, 1 bright crimson bag.
pale orange bags contain 4 dull chartreuse bags, 4 clear orange bags.
posh gold bags contain 2 faded gray bags, 5 striped indigo bags.
light crimson bags contain no other bags.
muted red bags contain 5 dim gray bags.
clear cyan bags contain 5 faded salmon bags, 4 light brown bags, 3 muted purple bags, 5 striped beige bags.
plaid cyan bags contain 2 clear yellow bags, 4 shiny gray bags, 5 pale green bags, 1 posh aqua bag.
clear brown bags contain 4 faded lime bags, 2 dull bronze bags, 2 clear bronze bags.
light tan bags contain 3 light bronze bags, 4 drab orange bags.
dim indigo bags contain 4 shiny fuchsia bags.
muted black bags contain 4 pale fuchsia bags, 3 bright maroon bags, 3 striped lavender bags.
faded gray bags contain 3 wavy plum bags, 1 wavy magenta bag, 1 clear lavender bag.
mirrored magenta bags contain 4 clear blue bags.
dark aqua bags contain 1 vibrant blue bag, 3 pale aqua bags.
dim lavender bags contain 1 clear magenta bag, 3 drab blue bags.
bright gray bags contain 1 dull olive bag, 1 plaid lime bag, 5 clear blue bags.
posh teal bags contain 4 pale yellow bags.
pale plum bags contain 2 bright fuchsia bags, 3 dotted white bags, 5 pale crimson bags.
mirrored bronze bags contain 1 faded yellow bag.
dull plum bags contain 4 shiny coral bags, 3 posh turquoise bags, 2 muted teal bags.
plaid silver bags contain 4 vibrant black bags, 4 dull olive bags.
dull violet bags contain 1 vibrant magenta bag, 3 faded salmon bags, 1 mirrored aqua bag, 4 light crimson bags.
dim yellow bags contain 5 clear coral bags, 2 striped white bags, 5 clear maroon bags.
drab orange bags contain 4 dull white bags, 1 plaid magenta bag, 2 dull lavender bags, 4 dim cyan bags.
wavy maroon bags contain 3 dull violet bags, 1 pale brown bag, 5 vibrant magenta bags, 5 mirrored aqua bags.
wavy turquoise bags contain 5 wavy crimson bags, 1 posh plum bag, 4 faded turquoise bags, 5 striped cyan bags.
clear yellow bags contain 2 faded purple bags, 2 plaid lime bags, 4 clear violet bags, 4 drab magenta bags.
muted crimson bags contain 1 vibrant orange bag.
drab violet bags contain 2 pale lavender bags, 2 light yellow bags.
dull cyan bags contain 5 dim coral bags, 1 posh orange bag, 3 striped beige bags.
shiny fuchsia bags contain 5 bright lime bags, 5 muted aqua bags, 5 dark teal bags, 5 faded indigo bags.
pale chartreuse bags contain 4 dark plum bags, 5 clear gold bags, 2 wavy blue bags, 3 dim coral bags.
dim orange bags contain 1 vibrant coral bag, 1 clear gold bag.
shiny tan bags contain 4 plaid tan bags.
dull bronze bags contain 5 dotted lavender bags, 2 wavy plum bags.
muted bronze bags contain 3 striped white bags.
wavy magenta bags contain 3 posh lime bags, 3 wavy plum bags, 5 bright chartreuse bags.
muted cyan bags contain 1 pale yellow bag, 5 wavy maroon bags, 5 shiny gold bags.
shiny beige bags contain 5 posh chartreuse bags, 3 muted indigo bags, 3 wavy plum bags.
vibrant brown bags contain 2 shiny green bags, 2 pale purple bags, 3 posh gray bags.
dim blue bags contain 4 clear silver bags, 4 muted blue bags, 2 clear lavender bags.
posh chartreuse bags contain 2 wavy magenta bags.
dim magenta bags contain 3 faded coral bags.
plaid coral bags contain 2 drab gray bags, 4 dark orange bags, 2 dim cyan bags.
dim coral bags contain 1 shiny salmon bag, 3 wavy plum bags, 1 light yellow bag, 4 light purple bags.
clear violet bags contain 5 plaid olive bags, 5 mirrored violet bags, 3 muted lavender bags, 2 clear indigo bags.
striped coral bags contain 3 dim fuchsia bags, 5 vibrant yellow bags, 4 vibrant plum bags, 1 mirrored turquoise bag.
striped gold bags contain 5 vibrant blue bags, 4 pale blue bags, 1 drab beige bag, 3 dotted olive bags.
dark beige bags contain 1 wavy gray bag.
plaid red bags contain 2 faded gray bags, 5 muted olive bags, 3 dark silver bags.
dark purple bags contain 4 clear maroon bags, 3 dark green bags.
dull yellow bags contain 3 vibrant white bags, 5 dull indigo bags, 4 dotted teal bags.
faded magenta bags contain 2 dark violet bags, 4 light indigo bags.
pale green bags contain 4 striped fuchsia bags.
faded blue bags contain 5 pale chartreuse bags, 5 plaid indigo bags, 5 posh fuchsia bags.
dim brown bags contain 4 dim magenta bags.
pale turquoise bags contain 3 bright salmon bags, 3 wavy yellow bags.
dark coral bags contain 2 faded beige bags, 3 posh gold bags, 2 muted cyan bags, 3 dim lime bags.
striped tan bags contain 3 vibrant bronze bags.
drab gold bags contain 1 faded cyan bag.
dotted green bags contain 1 dim green bag, 4 wavy red bags.
mirrored salmon bags contain 1 posh gray bag.
mirrored olive bags contain 1 dotted gold bag, 2 vibrant red bags.
shiny blue bags contain 2 clear yellow bags.
dotted white bags contain 1 wavy blue bag, 2 striped beige bags, 3 vibrant black bags, 5 striped fuchsia bags.
dotted silver bags contain 4 dull violet bags, 3 clear magenta bags.
muted lime bags contain 5 bright fuchsia bags, 4 dim violet bags.
dim white bags contain 4 wavy plum bags, 4 clear coral bags, 5 faded lime bags.
striped blue bags contain 2 striped violet bags, 5 clear lime bags, 4 muted tan bags.
dotted fuchsia bags contain 3 pale blue bags, 5 wavy blue bags, 2 faded maroon bags.
dark white bags contain 4 posh fuchsia bags, 5 dim cyan bags.
pale violet bags contain 5 plaid fuchsia bags.
muted aqua bags contain 3 mirrored tomato bags, 2 dim bronze bags, 1 pale purple bag, 5 mirrored aqua bags.
wavy lime bags contain 1 vibrant green bag, 3 striped tomato bags, 5 dotted beige bags, 5 dark plum bags.
dark salmon bags contain 3 faded plum bags, 3 pale blue bags, 1 mirrored red bag, 3 striped gold bags.
dotted salmon bags contain 5 pale crimson bags, 3 dark white bags, 2 mirrored beige bags, 2 shiny salmon bags.
vibrant white bags contain 4 dark brown bags, 1 faded plum bag, 1 plaid red bag, 1 dotted lime bag.
muted brown bags contain 3 plaid violet bags.
striped red bags contain 4 plaid bronze bags, 5 bright orange bags.
vibrant teal bags contain 4 dull olive bags, 1 shiny aqua bag, 2 muted olive bags.
drab green bags contain 2 muted olive bags.
light blue bags contain 1 muted cyan bag, 4 pale teal bags, 5 dotted white bags, 3 posh gray bags.
light gold bags contain 4 wavy black bags, 5 wavy gray bags, 4 pale teal bags, 4 pale violet bags.
posh violet bags contain 5 shiny magenta bags, 4 dark white bags, 4 posh lime bags, 4 plaid silver bags.
striped silver bags contain 3 pale crimson bags, 4 posh lime bags, 3 dim bronze bags.
dull tomato bags contain 4 plaid lime bags, 3 striped lavender bags, 4 clear turquoise bags, 3 dull lime bags.
dull blue bags contain 2 muted tan bags, 4 posh brown bags, 2 vibrant beige bags.
light magenta bags contain 5 drab salmon bags, 1 bright red bag.
dotted teal bags contain 2 pale yellow bags, 3 posh red bags, 2 drab aqua bags, 1 muted indigo bag.
light beige bags contain 1 drab fuchsia bag.
muted fuchsia bags contain 2 shiny cyan bags, 4 bright chartreuse bags, 2 striped indigo bags.
muted gray bags contain 2 vibrant brown bags, 5 clear violet bags.
bright maroon bags contain 4 dark indigo bags, 5 plaid olive bags.
wavy tomato bags contain 3 vibrant gray bags.
dim purple bags contain 3 dull lime bags.
mirrored blue bags contain 3 pale aqua bags.
drab crimson bags contain 2 muted brown bags, 1 faded fuchsia bag.
muted turquoise bags contain 1 dull olive bag, 5 dull silver bags, 1 vibrant gray bag, 4 plaid violet bags.
posh lime bags contain 1 pale purple bag, 1 vibrant black bag, 3 clear green bags.
light lavender bags contain 5 vibrant lime bags, 1 light coral bag.
striped maroon bags contain 3 wavy yellow bags, 3 faded silver bags, 5 dim olive bags, 3 muted tan bags.
shiny olive bags contain 2 bright olive bags.
mirrored fuchsia bags contain 3 dim gray bags.
drab blue bags contain 2 light salmon bags, 3 muted olive bags, 1 dark black bag.
drab magenta bags contain 4 light yellow bags, 2 muted aqua bags, 5 vibrant magenta bags, 4 vibrant silver bags.
light cyan bags contain 1 dull chartreuse bag, 1 dim bronze bag.
plaid lime bags contain 1 muted white bag, 2 striped fuchsia bags, 5 vibrant gray bags.
wavy tan bags contain 4 dotted beige bags, 4 striped cyan bags, 4 light salmon bags, 2 shiny gray bags.
faded yellow bags contain 1 bright teal bag, 1 striped salmon bag, 4 striped plum bags, 5 drab orange bags.
shiny silver bags contain 2 vibrant green bags.
mirrored aqua bags contain 4 vibrant black bags, 2 faded coral bags, 1 bright tomato bag, 1 pale purple bag.
dark tomato bags contain 4 drab beige bags, 5 bright gray bags, 5 shiny teal bags, 1 pale blue bag.
pale coral bags contain 5 striped orange bags, 4 muted red bags.
mirrored coral bags contain 4 plaid olive bags, 1 faded indigo bag.
shiny violet bags contain 5 bright tomato bags.
posh beige bags contain 2 dim brown bags.
dull crimson bags contain 3 mirrored chartreuse bags, 1 shiny teal bag, 3 shiny cyan bags.
drab lavender bags contain 1 shiny tomato bag, 5 posh cyan bags.
clear lavender bags contain 1 bright fuchsia bag, 1 pale crimson bag.
wavy fuchsia bags contain 5 wavy tomato bags, 5 wavy bronze bags, 5 mirrored tomato bags.
faded turquoise bags contain 3 muted crimson bags, 3 pale crimson bags, 4 drab gray bags, 1 dull white bag.
pale blue bags contain 1 shiny gold bag, 5 dull silver bags, 5 posh lime bags.
dim beige bags contain 1 vibrant red bag.
bright tomato bags contain 2 dull olive bags, 1 dim crimson bag, 5 faded salmon bags.
pale gold bags contain 2 dark blue bags.
muted tomato bags contain 5 mirrored blue bags, 1 dull crimson bag, 4 mirrored cyan bags, 4 wavy blue bags.
wavy beige bags contain 2 wavy lime bags, 3 dotted salmon bags.
dotted violet bags contain 5 bright orange bags, 5 posh olive bags, 3 dark violet bags.
vibrant black bags contain 4 bright chartreuse bags.
light olive bags contain 1 dotted yellow bag, 5 shiny coral bags, 1 drab green bag, 2 vibrant lime bags.
plaid crimson bags contain 3 shiny fuchsia bags.
mirrored yellow bags contain 1 shiny red bag, 2 muted lime bags.
pale tan bags contain 2 pale crimson bags, 4 pale green bags.
pale yellow bags contain 1 clear maroon bag, 5 wavy silver bags, 4 faded purple bags, 4 faded plum bags.
mirrored silver bags contain 5 pale lavender bags, 5 clear orange bags, 4 faded lime bags.
drab tomato bags contain 2 dull lavender bags.
drab bronze bags contain 5 shiny indigo bags, 3 pale purple bags.
muted salmon bags contain 2 clear green bags, 4 faded coral bags, 1 faded salmon bag.
posh brown bags contain 2 vibrant magenta bags, 1 muted salmon bag.
striped magenta bags contain 2 shiny white bags.
drab teal bags contain 1 vibrant red bag, 5 striped violet bags, 1 muted olive bag.
mirrored red bags contain 4 bright chartreuse bags.
muted magenta bags contain 4 dotted blue bags, 2 light bronze bags.
clear orange bags contain 4 striped cyan bags.
dotted maroon bags contain 1 plaid olive bag.
mirrored white bags contain 1 shiny tomato bag, 1 plaid lime bag.
mirrored tomato bags contain 5 pale brown bags, 4 clear green bags, 4 mirrored chartreuse bags.
bright magenta bags contain 3 bright salmon bags, 4 posh fuchsia bags, 3 dotted tan bags.
plaid salmon bags contain 2 bright white bags, 5 mirrored lime bags.
pale black bags contain 2 faded tomato bags, 3 dotted brown bags, 2 faded turquoise bags.
posh gray bags contain 2 mirrored chartreuse bags.
muted beige bags contain 3 posh lime bags, 5 wavy plum bags, 2 light crimson bags, 2 pale purple bags.
pale red bags contain 3 pale beige bags, 2 vibrant yellow bags.
bright indigo bags contain 5 mirrored violet bags, 4 mirrored tomato bags, 3 clear lavender bags, 1 muted gold bag.
shiny teal bags contain no other bags.
drab plum bags contain 5 mirrored chartreuse bags, 1 light brown bag.
clear tomato bags contain 4 faded coral bags.
light aqua bags contain 5 bright fuchsia bags, 4 posh red bags, 2 light gray bags, 2 bright tomato bags.
shiny tomato bags contain 5 muted turquoise bags.
dull olive bags contain no other bags.
dim chartreuse bags contain 4 posh aqua bags.
bright turquoise bags contain 4 pale olive bags.
pale aqua bags contain 3 muted aqua bags, 5 shiny plum bags, 3 striped indigo bags, 5 pale blue bags.
shiny indigo bags contain 1 posh tan bag, 3 dotted teal bags.
faded salmon bags contain no other bags.
dark magenta bags contain 2 striped plum bags, 1 dull brown bag, 2 wavy tan bags, 2 faded olive bags.
vibrant silver bags contain 5 wavy tomato bags, 3 dull chartreuse bags, 3 posh lime bags, 2 dull violet bags.
wavy violet bags contain 1 dim crimson bag, 5 drab white bags, 2 drab purple bags.
dull green bags contain 1 posh red bag, 5 shiny teal bags.
posh tan bags contain 4 pale yellow bags, 1 dim beige bag, 1 shiny tomato bag.
shiny purple bags contain 4 shiny lavender bags, 2 plaid violet bags, 2 drab beige bags, 2 pale blue bags.
plaid lavender bags contain 3 faded purple bags, 1 wavy purple bag.
dotted lime bags contain 5 muted white bags, 2 posh olive bags, 2 pale crimson bags, 5 dark plum bags.
shiny brown bags contain 3 pale tan bags, 5 shiny green bags, 4 vibrant brown bags.
clear gold bags contain 4 striped plum bags, 1 bright fuchsia bag, 3 faded salmon bags.
drab cyan bags contain 2 muted purple bags, 2 dull aqua bags, 3 shiny gray bags.
dark violet bags contain 1 plaid salmon bag, 3 vibrant salmon bags.
shiny aqua bags contain 3 mirrored tomato bags.
dotted blue bags contain 3 clear white bags, 4 dull chartreuse bags, 2 light cyan bags.
dull beige bags contain 2 vibrant red bags, 5 muted olive bags.
wavy blue bags contain 2 dark brown bags.
wavy aqua bags contain 4 wavy teal bags, 5 muted maroon bags, 3 faded gray bags, 5 plaid blue bags.
dull brown bags contain 5 posh olive bags, 2 striped violet bags, 4 mirrored lime bags.
striped salmon bags contain 4 faded coral bags, 5 vibrant blue bags, 4 shiny magenta bags, 3 plaid red bags.
mirrored maroon bags contain 1 mirrored lime bag, 2 wavy salmon bags, 2 wavy cyan bags.
clear magenta bags contain 1 vibrant black bag, 3 vibrant coral bags.
clear salmon bags contain 5 bright plum bags, 5 light beige bags, 2 plaid aqua bags.
bright yellow bags contain 5 striped green bags, 3 muted violet bags.
dim crimson bags contain 4 dull olive bags, 1 faded coral bag, 3 clear green bags, 4 pale purple bags.
light violet bags contain 2 shiny indigo bags, 1 clear maroon bag, 2 dull blue bags.
drab coral bags contain 2 posh blue bags, 1 dim lime bag, 3 shiny turquoise bags, 3 faded fuchsia bags.
plaid bronze bags contain 2 vibrant teal bags.
dull magenta bags contain 4 dull tan bags, 4 plaid yellow bags, 2 dim turquoise bags.
plaid tan bags contain 1 mirrored maroon bag, 5 muted maroon bags.
shiny maroon bags contain 1 shiny coral bag, 5 dotted tomato bags.
faded bronze bags contain 5 bright purple bags, 4 vibrant tomato bags.
pale magenta bags contain 3 vibrant green bags, 3 dotted olive bags.
dark blue bags contain 3 dull gray bags.
dim teal bags contain 1 dotted plum bag, 3 faded olive bags, 4 dotted orange bags.
faded crimson bags contain 3 vibrant violet bags, 4 wavy plum bags, 1 wavy coral bag, 1 vibrant lime bag.
dotted black bags contain 2 striped purple bags.
mirrored indigo bags contain 4 wavy cyan bags, 3 dull gold bags, 1 dull lime bag.
muted lavender bags contain 5 striped silver bags, 2 posh brown bags.
mirrored lavender bags contain 1 pale lime bag, 2 drab olive bags, 1 wavy green bag.
drab lime bags contain 2 faded plum bags, 3 muted purple bags, 1 faded teal bag, 2 vibrant plum bags.
bright blue bags contain 3 drab aqua bags, 4 striped tomato bags.
drab purple bags contain 2 faded purple bags, 4 shiny turquoise bags, 5 dark black bags, 1 pale plum bag.
mirrored chartreuse bags contain 4 clear green bags.
wavy gold bags contain 1 plaid olive bag, 5 drab teal bags, 5 dotted salmon bags, 2 dull tan bags.
shiny green bags contain 1 dim crimson bag, 1 dotted olive bag.
plaid tomato bags contain 1 clear gold bag.
striped chartreuse bags contain 5 muted lavender bags, 5 plaid white bags.
vibrant violet bags contain 1 shiny cyan bag, 5 drab magenta bags, 5 drab olive bags.
vibrant gray bags contain 2 vibrant black bags, 5 pale purple bags.
striped plum bags contain 1 mirrored chartreuse bag.
mirrored brown bags contain 5 light plum bags, 2 dark blue bags, 5 shiny aqua bags, 3 vibrant turquoise bags.
posh crimson bags contain 4 striped orange bags, 3 wavy salmon bags, 4 dull cyan bags.
plaid purple bags contain 1 dotted beige bag, 4 shiny teal bags, 4 wavy magenta bags, 5 pale chartreuse bags.
clear purple bags contain 1 faded purple bag.
plaid brown bags contain 5 light brown bags, 5 drab fuchsia bags, 1 clear bronze bag, 2 dark black bags.
dim violet bags contain 2 bright lavender bags, 4 muted indigo bags, 1 bright white bag.
plaid fuchsia bags contain 3 muted olive bags, 2 clear olive bags.
posh white bags contain 3 dull aqua bags, 2 striped silver bags.
dotted gray bags contain 2 vibrant orange bags, 3 muted salmon bags.
clear silver bags contain 1 faded indigo bag, 1 dim violet bag.
dull fuchsia bags contain 1 vibrant turquoise bag.
shiny lime bags contain 2 wavy teal bags, 1 clear blue bag.
bright gold bags contain 2 dotted gray bags, 3 dark yellow bags, 3 light yellow bags, 4 faded maroon bags.
dark teal bags contain 5 light crimson bags, 5 clear orange bags, 4 vibrant magenta bags.
drab black bags contain 3 clear green bags.
light silver bags contain 2 clear black bags.
striped cyan bags contain 4 clear lavender bags, 1 faded salmon bag, 4 faded plum bags, 3 shiny teal bags.
plaid yellow bags contain 5 shiny teal bags.
mirrored turquoise bags contain 1 dull chartreuse bag.
shiny yellow bags contain 5 dotted crimson bags.
vibrant yellow bags contain 2 striped beige bags, 5 dark white bags.
faded violet bags contain 4 drab tan bags.
plaid orange bags contain 2 dim crimson bags, 1 faded cyan bag, 4 mirrored cyan bags, 1 bright indigo bag.
muted coral bags contain 2 faded lime bags, 1 plaid blue bag, 5 posh white bags.
faded lime bags contain 5 wavy lavender bags, 5 muted green bags, 3 shiny beige bags, 4 wavy lime bags.
pale crimson bags contain 3 mirrored chartreuse bags.
dull teal bags contain 4 clear blue bags, 2 mirrored red bags, 4 posh turquoise bags, 2 drab black bags.
clear teal bags contain 4 clear brown bags, 4 mirrored fuchsia bags.
drab fuchsia bags contain 2 mirrored black bags, 5 plaid silver bags, 4 drab tan bags.
dotted purple bags contain 5 faded red bags, 5 dull bronze bags.
mirrored cyan bags contain 4 clear green bags, 5 muted cyan bags, 3 dull violet bags, 5 vibrant yellow bags.
pale white bags contain 1 vibrant green bag, 2 wavy magenta bags, 5 dotted olive bags, 5 drab magenta bags.
faded red bags contain 5 posh turquoise bags, 3 dotted gold bags, 5 light salmon bags, 5 faded bronze bags.
posh plum bags contain 1 shiny brown bag, 2 vibrant silver bags, 1 bright beige bag, 1 clear maroon bag.
dotted tan bags contain 2 pale bronze bags, 3 drab tan bags.
dark cyan bags contain 5 wavy fuchsia bags, 3 posh beige bags.
clear gray bags contain 2 muted silver bags, 4 drab violet bags.
faded aqua bags contain 5 vibrant green bags, 3 dim crimson bags.
vibrant indigo bags contain 1 drab violet bag, 3 dull gray bags, 4 wavy lavender bags, 2 shiny fuchsia bags.
posh red bags contain 1 clear magenta bag, 2 pale bronze bags.
clear turquoise bags contain 1 plaid magenta bag, 4 dotted tan bags.
mirrored plum bags contain 3 plaid purple bags, 3 dull bronze bags, 3 pale olive bags.
bright salmon bags contain 2 mirrored chartreuse bags, 3 pale brown bags, 5 faded plum bags, 1 striped cyan bag.
clear black bags contain 4 mirrored fuchsia bags, 5 dim bronze bags, 2 drab violet bags.
striped indigo bags contain 1 vibrant black bag, 1 striped fuchsia bag, 4 shiny gray bags, 5 clear orange bags.
wavy teal bags contain 4 striped lime bags.
striped white bags contain 4 wavy lime bags, 3 clear magenta bags, 3 dull lavender bags.
clear fuchsia bags contain 2 faded brown bags, 3 shiny coral bags, 1 vibrant blue bag, 1 posh silver bag.
muted blue bags contain 3 pale fuchsia bags, 5 posh fuchsia bags, 2 dim magenta bags, 1 wavy lavender bag.
pale brown bags contain no other bags.
posh fuchsia bags contain 2 dim crimson bags, 5 dull chartreuse bags, 4 dim bronze bags, 5 vibrant orange bags.
wavy salmon bags contain 4 vibrant black bags.
clear aqua bags contain 2 clear tan bags, 3 dim gray bags, 1 bright lavender bag.
light green bags contain 5 dim tan bags, 3 shiny chartreuse bags, 4 bright crimson bags.
wavy yellow bags contain 4 pale brown bags.
dull indigo bags contain 3 plaid lime bags, 5 wavy silver bags, 4 vibrant coral bags, 3 mirrored tomato bags.
dim plum bags contain 4 dotted magenta bags, 5 dim crimson bags, 3 wavy blue bags, 4 mirrored black bags.
dull gold bags contain 5 bright lavender bags, 2 vibrant magenta bags, 4 dull lavender bags.
plaid plum bags contain 2 muted cyan bags, 3 shiny purple bags, 2 drab olive bags.
pale lavender bags contain 1 vibrant magenta bag, 3 mirrored violet bags, 1 vibrant green bag, 2 faded purple bags.
drab indigo bags contain 1 vibrant lavender bag, 4 drab aqua bags.
dotted olive bags contain 3 faded plum bags, 5 wavy plum bags, 1 pale brown bag.
dotted beige bags contain 5 bright tomato bags, 4 pale purple bags, 4 dim crimson bags, 4 dull gold bags.
clear coral bags contain 1 dark teal bag, 2 bright purple bags, 4 clear blue bags, 4 pale orange bags.
light bronze bags contain 4 muted cyan bags, 2 posh brown bags.
dull red bags contain 2 vibrant red bags, 1 muted gold bag, 2 clear coral bags.
mirrored black bags contain 2 dull olive bags.
shiny cyan bags contain 1 mirrored aqua bag, 3 bright tomato bags, 5 striped indigo bags.
light purple bags contain 3 bright salmon bags, 5 vibrant black bags, 2 clear orange bags, 4 plaid olive bags.
dark lavender bags contain 3 dark turquoise bags, 2 dotted black bags.
vibrant bronze bags contain 3 wavy olive bags.
vibrant salmon bags contain 3 dull olive bags, 4 bright silver bags, 3 muted green bags.
pale lime bags contain 1 wavy yellow bag, 4 dark tomato bags, 5 faded aqua bags, 4 muted beige bags.
plaid gray bags contain 2 wavy yellow bags, 5 drab turquoise bags, 3 dim gray bags.
mirrored green bags contain 5 dull cyan bags.
dim tan bags contain 5 dotted teal bags, 2 clear yellow bags, 1 posh maroon bag.
pale indigo bags contain 5 striped indigo bags, 5 clear indigo bags, 1 drab tan bag.
mirrored violet bags contain 2 muted salmon bags, 3 dull violet bags.
pale salmon bags contain 1 mirrored cyan bag, 4 pale gray bags, 3 mirrored fuchsia bags, 1 striped beige bag.
plaid olive bags contain 3 dark brown bags.
clear white bags contain 4 plaid violet bags, 4 dull lavender bags.
posh yellow bags contain 5 light gray bags, 3 clear green bags, 3 mirrored cyan bags, 2 plaid yellow bags.
bright purple bags contain 1 mirrored cyan bag, 4 dim magenta bags, 2 dotted olive bags, 1 posh tan bag.
dark gray bags contain 3 dim turquoise bags, 3 mirrored tomato bags.
shiny chartreuse bags contain 1 dark brown bag, 2 mirrored magenta bags, 1 bright silver bag, 5 shiny gray bags.
dull silver bags contain 3 dull chartreuse bags, 2 dull violet bags, 4 muted aqua bags.
clear lime bags contain 4 dull silver bags.
faded lavender bags contain 1 pale tan bag, 2 clear turquoise bags, 3 muted green bags, 1 muted lime bag.
light white bags contain 1 mirrored gold bag, 1 dotted gold bag, 3 pale beige bags.
posh olive bags contain 3 mirrored aqua bags, 2 shiny cyan bags.
striped olive bags contain 1 vibrant tomato bag, 3 dotted salmon bags, 3 plaid purple bags, 2 dim brown bags.
vibrant gold bags contain 4 light plum bags.
faded gold bags contain 5 shiny green bags, 4 drab orange bags, 5 faded beige bags, 5 dark blue bags.
faded silver bags contain 4 drab blue bags.
drab gray bags contain 1 pale gray bag.
posh indigo bags contain 1 vibrant teal bag, 1 vibrant aqua bag.
mirrored crimson bags contain 5 mirrored turquoise bags, 4 mirrored aqua bags, 3 wavy olive bags, 1 dark teal bag.
dark olive bags contain 4 dim violet bags, 2 dotted silver bags, 2 dull crimson bags, 1 striped fuchsia bag.
bright tan bags contain 5 shiny violet bags, 5 light gray bags.
pale olive bags contain 3 faded black bags, 1 dim aqua bag.
drab tan bags contain 2 faded plum bags, 2 posh fuchsia bags, 2 wavy blue bags, 5 dotted lavender bags.
striped purple bags contain 4 posh gray bags, 1 shiny plum bag, 1 mirrored crimson bag, 2 plaid orange bags.
dotted magenta bags contain 4 dull cyan bags, 1 bright cyan bag.
faded white bags contain 2 dark tomato bags, 2 muted silver bags.
pale cyan bags contain 3 light tan bags, 3 dotted brown bags, 3 vibrant aqua bags, 3 drab gray bags.
vibrant tan bags contain 5 striped gold bags, 5 dull gray bags, 2 bright turquoise bags, 3 muted blue bags.
dark crimson bags contain 4 vibrant magenta bags, 2 striped aqua bags, 1 muted tan bag, 3 vibrant green bags.
dotted red bags contain 1 dull green bag, 3 pale green bags, 5 pale tomato bags, 2 light coral bags.
dim gold bags contain 3 dark black bags, 5 dotted lavender bags, 2 faded gray bags, 5 dim beige bags.
faded chartreuse bags contain 1 clear aqua bag, 2 mirrored black bags, 1 striped coral bag.
dark gold bags contain 1 drab coral bag, 3 dark teal bags.
light fuchsia bags contain 4 faded salmon bags, 4 shiny gray bags.
posh blue bags contain 2 mirrored tomato bags, 1 drab blue bag, 4 drab tomato bags, 5 dotted lavender bags.
plaid green bags contain 5 light cyan bags, 3 dim turquoise bags, 1 drab teal bag.
faded tomato bags contain 4 muted blue bags, 1 striped lime bag.
clear olive bags contain 2 dull silver bags, 2 vibrant yellow bags, 1 pale purple bag, 2 wavy lavender bags.
shiny gold bags contain 2 muted aqua bags, 3 bright salmon bags, 4 striped violet bags, 2 posh brown bags.
clear beige bags contain 5 faded plum bags, 3 dull lavender bags.
pale fuchsia bags contain 2 wavy lavender bags, 2 striped indigo bags, 2 posh gold bags.
wavy silver bags contain 4 wavy plum bags, 1 shiny salmon bag.
dotted yellow bags contain 3 striped plum bags, 5 wavy coral bags.
dotted crimson bags contain 1 dotted silver bag.
muted olive bags contain 5 mirrored tomato bags.
vibrant blue bags contain 1 clear blue bag, 2 mirrored lime bags, 2 dull aqua bags.
shiny white bags contain 3 pale purple bags.
clear chartreuse bags contain 4 dotted lavender bags, 3 mirrored cyan bags.
faded green bags contain 4 plaid lime bags, 4 vibrant olive bags, 3 dark green bags, 4 shiny lime bags.
plaid violet bags contain 1 striped silver bag, 2 bright chartreuse bags.
clear green bags contain no other bags.
vibrant plum bags contain 5 clear green bags, 2 shiny teal bags.
bright olive bags contain 5 light plum bags, 4 drab beige bags.
striped beige bags contain 5 wavy silver bags, 1 shiny teal bag, 3 light gray bags.
faded plum bags contain 3 clear green bags, 5 mirrored chartreuse bags, 1 dim bronze bag, 1 faded coral bag.
mirrored tan bags contain 3 bright indigo bags, 1 light yellow bag, 2 muted aqua bags, 2 muted beige bags.
bright black bags contain 5 pale blue bags, 4 bright coral bags, 2 wavy plum bags, 2 posh lime bags.
striped aqua bags contain 5 muted lavender bags, 1 pale blue bag, 5 vibrant gray bags.
dull chartreuse bags contain 1 vibrant black bag, 4 faded salmon bags.
wavy gray bags contain 3 dull gray bags, 3 light blue bags, 4 pale teal bags.
dim tomato bags contain 3 mirrored chartreuse bags.
bright orange bags contain 2 dull indigo bags, 5 plaid violet bags, 2 light crimson bags, 2 wavy salmon bags.
wavy crimson bags contain 3 dotted maroon bags, 1 vibrant lime bag, 2 pale indigo bags, 1 striped aqua bag.
dim lime bags contain 5 mirrored magenta bags, 2 plaid beige bags.
posh magenta bags contain 5 dull violet bags, 3 wavy gray bags.
vibrant lavender bags contain 4 muted violet bags, 3 clear crimson bags.
mirrored gray bags contain 5 light crimson bags, 5 dull cyan bags.
dark indigo bags contain 3 dark turquoise bags, 5 mirrored turquoise bags.
muted silver bags contain 2 dim coral bags, 1 dotted olive bag.
shiny black bags contain 1 muted salmon bag, 2 faded silver bags.
faded indigo bags contain 4 vibrant gray bags, 1 wavy salmon bag, 3 bright indigo bags.
dim aqua bags contain 1 drab aqua bag, 4 dotted beige bags, 4 faded coral bags.
bright plum bags contain 4 drab olive bags, 5 dim crimson bags, 1 vibrant green bag.
light indigo bags contain 5 mirrored chartreuse bags.
posh purple bags contain 4 plaid magenta bags, 3 pale purple bags.
wavy bronze bags contain 4 muted aqua bags.
pale gray bags contain 5 clear orange bags, 1 bright lavender bag, 4 muted salmon bags.
clear bronze bags contain 4 light black bags, 2 drab aqua bags.
wavy green bags contain 1 muted lavender bag, 1 light yellow bag, 1 wavy olive bag.
bright brown bags contain 1 dotted black bag, 1 plaid magenta bag, 4 posh olive bags.
vibrant green bags contain 5 bright cyan bags, 3 mirrored lime bags, 5 mirrored tan bags.
dull orange bags contain 2 posh chartreuse bags.
dotted lavender bags contain 5 vibrant gray bags, 4 plaid silver bags.
dim maroon bags contain 2 pale chartreuse bags, 4 striped beige bags, 2 shiny gold bags.
shiny turquoise bags contain 2 light orange bags.
striped brown bags contain 5 muted brown bags, 4 dotted bronze bags, 5 striped plum bags, 5 striped green bags.
plaid magenta bags contain 5 faded salmon bags, 5 dark black bags, 5 muted indigo bags, 4 pale blue bags.
faded cyan bags contain 5 muted lavender bags, 1 bright fuchsia bag, 1 mirrored tomato bag.
muted yellow bags contain 1 drab salmon bag, 5 mirrored cyan bags, 5 drab coral bags.
bright teal bags contain 4 dotted lime bags, 2 plaid magenta bags, 3 mirrored tomato bags, 5 striped cyan bags.
wavy indigo bags contain 3 dotted silver bags, 4 clear brown bags, 3 posh gray bags, 1 dull red bag.
striped tomato bags contain 1 dotted olive bag.
dim olive bags contain 1 dotted indigo bag, 2 dotted lime bags, 2 muted silver bags.
plaid black bags contain 3 dim green bags, 1 posh bronze bag, 2 wavy orange bags, 1 muted gold bag.
dark red bags contain 1 dotted beige bag, 5 dotted olive bags, 1 drab turquoise bag, 1 light tan bag.
light red bags contain 1 muted lavender bag, 1 muted teal bag, 5 bright white bags, 4 dotted fuchsia bags.
posh coral bags contain 5 posh silver bags, 1 vibrant olive bag.
wavy lavender bags contain 3 bright indigo bags, 4 dim bronze bags.
striped lavender bags contain 1 striped tomato bag.
wavy cyan bags contain 2 shiny salmon bags, 4 drab aqua bags, 4 faded coral bags, 1 dotted olive bag.
light brown bags contain 2 faded gray bags, 5 dark brown bags.
dark black bags contain 2 posh brown bags.
dark tan bags contain 1 striped cyan bag, 3 plaid salmon bags.
muted maroon bags contain 4 bright bronze bags, 3 dotted lavender bags, 4 pale fuchsia bags, 1 vibrant red bag.
faded fuchsia bags contain 5 light purple bags, 3 dim gray bags.
shiny bronze bags contain 3 mirrored magenta bags, 3 light aqua bags, 3 drab plum bags, 1 vibrant salmon bag.
light gray bags contain 1 striped fuchsia bag, 1 shiny gold bag, 3 clear gold bags, 3 bright fuchsia bags.
dim turquoise bags contain 5 dull aqua bags.
faded coral bags contain no other bags.
dark maroon bags contain 1 dark turquoise bag, 4 light fuchsia bags, 5 shiny plum bags.
striped black bags contain 2 faded tomato bags, 1 vibrant turquoise bag, 4 muted bronze bags.
plaid gold bags contain 4 wavy aqua bags, 4 vibrant white bags.
dim gray bags contain 5 wavy silver bags.
wavy brown bags contain 3 bright bronze bags, 2 dotted gray bags.
bright fuchsia bags contain 2 mirrored aqua bags, 4 shiny green bags, 5 vibrant black bags, 1 bright tomato bag.
dark chartreuse bags contain 5 shiny white bags, 4 dotted salmon bags, 5 shiny purple bags, 5 faded red bags.
dark plum bags contain 2 clear gold bags, 2 pale gray bags.
dull maroon bags contain 2 mirrored chartreuse bags, 1 clear orange bag, 4 mirrored black bags, 5 clear violet bags.
plaid maroon bags contain 3 bright purple bags, 3 bright red bags, 3 faded purple bags.
dull coral bags contain 5 drab gray bags, 2 dotted chartreuse bags.
shiny coral bags contain 3 vibrant black bags, 4 bright chartreuse bags, 3 faded indigo bags.
clear crimson bags contain 1 drab tomato bag, 4 mirrored white bags, 2 dim violet bags.
drab aqua bags contain 2 dull chartreuse bags, 1 pale crimson bag, 4 posh lime bags.
vibrant aqua bags contain 1 wavy cyan bag.
striped fuchsia bags contain 5 bright tomato bags, 2 wavy plum bags, 2 faded plum bags, 4 clear green bags.
shiny plum bags contain 2 posh red bags, 3 faded plum bags, 2 striped beige bags, 1 mirrored turquoise bag.
muted purple bags contain 5 bright white bags, 4 dotted chartreuse bags, 1 drab black bag.
posh bronze bags contain 3 muted cyan bags, 4 faded coral bags, 3 wavy plum bags.
light turquoise bags contain 4 mirrored silver bags, 2 bright gray bags, 5 mirrored maroon bags.
vibrant fuchsia bags contain 5 faded tomato bags, 1 posh fuchsia bag, 3 posh maroon bags, 1 plaid salmon bag.
muted orange bags contain 1 striped gray bag, 2 dull bronze bags, 1 dull silver bag.
dotted cyan bags contain 4 clear olive bags.
dull gray bags contain 5 mirrored maroon bags, 4 dim coral bags, 2 muted olive bags.
clear red bags contain 3 dark fuchsia bags, 4 mirrored fuchsia bags.
clear indigo bags contain 4 muted salmon bags.
striped green bags contain 4 dull maroon bags.
vibrant chartreuse bags contain 1 muted aqua bag, 5 clear lime bags.
mirrored beige bags contain 3 dark teal bags.
vibrant lime bags contain 4 plaid fuchsia bags.
dotted brown bags contain 3 bright gray bags, 5 wavy yellow bags, 1 muted maroon bag.
striped lime bags contain 3 muted lavender bags.
vibrant magenta bags contain 4 faded coral bags, 1 dim bronze bag.
drab olive bags contain 3 shiny indigo bags, 1 dim lime bag.
dotted orange bags contain 5 muted white bags, 3 striped gray bags.
bright lavender bags contain 4 faded purple bags, 1 bright chartreuse bag.
pale maroon bags contain 5 vibrant gray bags, 4 shiny red bags, 3 drab aqua bags, 4 wavy tan bags.
dotted aqua bags contain 1 mirrored lime bag.
wavy orange bags contain 3 dull green bags, 4 light lavender bags.
faded maroon bags contain 3 vibrant gray bags, 2 muted lavender bags.
dim silver bags contain 2 dotted chartreuse bags, 4 clear violet bags, 2 clear red bags.
dull turquoise bags contain 5 faded olive bags, 3 drab magenta bags.
shiny red bags contain 4 clear tan bags, 2 dull red bags, 5 dark tomato bags.
posh orange bags contain 4 muted lavender bags, 5 dim violet bags, 5 striped aqua bags.
plaid white bags contain 5 mirrored cyan bags, 2 light brown bags, 3 muted tan bags.
shiny magenta bags contain 3 faded coral bags, 5 posh gray bags.
bright bronze bags contain 4 wavy blue bags, 2 clear violet bags.
mirrored orange bags contain 2 dim green bags, 2 striped red bags, 4 drab plum bags, 1 pale teal bag.`.split(
  '\n'
);

solve1(input);
solve2(input);
