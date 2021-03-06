const inputIdx = 3;
const debug = false;
const part1 = true;
const part2 = true;

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function getMinSteps(input, part) {
  const maze = input.split('\n').map((row) => row.split(''));
  debug && console.log(maze.map((row) => row.join('')).join('\n'));

  const lettersToCoords = {};
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === '.') {
        for (let [di, dj] of dirs) {
          if (maze[i + di] && /[A-Z]/.test(maze[i + di][j + dj])) {
            const letters = [maze[i + di][j + dj], maze[i + 2 * di][j + 2 * dj]]
              .sort()
              .join('');
            lettersToCoords[letters] = lettersToCoords[letters] || [];
            lettersToCoords[letters].push([i, j]);
          }
        }
      }
    }
  }
  debug && console.log(lettersToCoords);

  const portals = Object.keys(lettersToCoords).reduce((portals, letters) => {
    const coords = lettersToCoords[letters];
    if (coords.length === 2) {
      portals[coords[0].join()] = coords[1];
      portals[coords[1].join()] = coords[0];
    }
    return portals;
  }, {});
  debug && console.log(portals);

  const [aai, aaj] = lettersToCoords['AA'][0];
  const [zzi, zzj] = lettersToCoords['ZZ'][0];
  const queue = dirs.reduce((queue, [di, dj]) => {
    queue.push({
      steps: 1,
      coords: [aai + di, aaj + dj],
      level: 0,
    });
    return queue;
  }, []);
  const seen = {
    [[aai, aaj].join()]: {
      0: 0,
    },
  };
  while (queue.length) {
    const {
      steps,
      coords: [i, j],
      level,
    } = queue.shift();
    if (
      maze[i][j] !== '.' ||
      (seen[[i, j].join()] && seen[[i, j].join()][level] <= steps)
    ) {
      // not a passage or has seen this before more efficiently
      continue;
    }

    if (i === zzi && j === zzj && (part === 1 || level === 0)) {
      // found exit
      return steps;
    }

    seen[[i, j].join()] = seen[[i, j].join()] || {};
    seen[[i, j].join()][level] = steps;

    const portal = portals[[i, j].join()];
    if (portal) {
      const isEdge =
        i === 2 || i === maze.length - 3 || j === 2 || j === maze[i].length - 3;
      if (isEdge && !level) {
        // skip for level 1 edge or has seen portal before
      } else {
        queue.push({
          steps: steps + 1,
          coords: portal,
          level: isEdge ? level - 1 : level + 1,
        });
      }
    }

    queue.push(
      ...dirs.reduce((acc, [di, dj]) => {
        acc.push({
          steps: steps + 1,
          coords: [i + di, j + dj],
          level,
        });
        return acc;
      }, [])
    );
  }
}

function solve1(input) {
  console.log(getMinSteps(input, 1));
}

function solve2(input) {
  console.log(getMinSteps(input, 2));
}

const inputs = [];
inputs.push(`         A           
         A           
  #######.#########  
  #######.........#  
  #######.#######.#  
  #######.#######.#  
  #######.#######.#  
  #####  B    ###.#  
BC...##  C    ###.#  
  ##.##       ###.#  
  ##...DE  F  ###.#  
  #####    G  ###.#  
  #########.#####.#  
DE..#######...###.#  
  #.#########.###.#  
FG..#########.....#  
  ###########.#####  
             Z       
             Z       `);

inputs.push(`                   A               
                   A               
  #################.#############  
  #.#...#...................#.#.#  
  #.#.#.###.###.###.#########.#.#  
  #.#.#.......#...#.....#.#.#...#  
  #.#########.###.#####.#.#.###.#  
  #.............#.#.....#.......#  
  ###.###########.###.#####.#.#.#  
  #.....#        A   C    #.#.#.#  
  #######        S   P    #####.#  
  #.#...#                 #......VT
  #.#.#.#                 #.#####  
  #...#.#               YN....#.#  
  #.###.#                 #####.#  
DI....#.#                 #.....#  
  #####.#                 #.###.#  
ZZ......#               QG....#..AS
  ###.###                 #######  
JO..#.#.#                 #.....#  
  #.#.#.#                 ###.#.#  
  #...#..DI             BU....#..LF
  #####.#                 #.#####  
YN......#               VT..#....QG
  #.###.#                 #.###.#  
  #.#...#                 #.....#  
  ###.###    J L     J    #.#.###  
  #.....#    O F     P    #.#...#  
  #.###.#####.#.#####.#####.###.#  
  #...#.#.#...#.....#.....#.#...#  
  #.#####.###.###.#.#.#########.#  
  #...#.#.....#...#.#.#.#.....#.#  
  #.###.#####.###.###.#.#.#######  
  #.#.........#...#.............#  
  #########.###.###.#############  
           B   J   C               
           U   P   P               `);

inputs.push(`             Z L X W       C                 
             Z P Q B       K                 
  ###########.#.#.#.#######.###############  
  #...#.......#.#.......#.#.......#.#.#...#  
  ###.#.#.#.#.#.#.#.###.#.#.#######.#.#.###  
  #.#...#.#.#...#.#.#...#...#...#.#.......#  
  #.###.#######.###.###.#.###.###.#.#######  
  #...#.......#.#...#...#.............#...#  
  #.#########.#######.#.#######.#######.###  
  #...#.#    F       R I       Z    #.#.#.#  
  #.###.#    D       E C       H    #.#.#.#  
  #.#...#                           #...#.#  
  #.###.#                           #.###.#  
  #.#....OA                       WB..#.#..ZH
  #.###.#                           #.#.#.#  
CJ......#                           #.....#  
  #######                           #######  
  #.#....CK                         #......IC
  #.###.#                           #.###.#  
  #.....#                           #...#.#  
  ###.###                           #.#.#.#  
XF....#.#                         RF..#.#.#  
  #####.#                           #######  
  #......CJ                       NM..#...#  
  ###.#.#                           #.###.#  
RE....#.#                           #......RF
  ###.###        X   X       L      #.#.#.#  
  #.....#        F   Q       P      #.#.#.#  
  ###.###########.###.#######.#########.###  
  #.....#...#.....#.......#...#.....#.#...#  
  #####.#.###.#######.#######.###.###.#.#.#  
  #.......#.......#.#.#.#.#...#...#...#.#.#  
  #####.###.#####.#.#.#.#.###.###.#.###.###  
  #.......#.....#.#...#...............#...#  
  #############.#.#.###.###################  
               A O F   N                     
               A A D   M                     `);

inputs.push(`                                 T Z     P       J     A       Y           U                             
                                 D Z     C       R     I       Q           D                             
  ###############################.#.#####.#######.#####.#######.###########.###########################  
  #.#.......#...#.................#...#.#.....#.....#.......#.#.......#.....#.....#...................#  
  #.###.#######.###########.#.#.#.###.#.#####.###.#.#.#######.#####.###.#####.#####.#######.###.#.###.#  
  #...#.#...#...#.#.#.......#.#.#.....#.#.......#.#.#.#.....#.......#...................#.#...#.#.#.#.#  
  ###.#.#.#####.#.#.#.#.#.#.###.#######.#.#.#.###.###.#.###.#.#.#.#########.###.#########.#####.###.###  
  #.......#.#.....#.#.#.#.#...#.......#...#.#...#...#.....#.#.#.#.#.......#...#.........#.....#.#.#...#  
  ###.#####.#####.#.#####.#########.###.###.#####.#########.#.#####.#.###.#.###.###.#.###.#######.#.###  
  #...#.....#.#.#...#...#.#.....#.#...#.#...#.....#.....#...#.....#.#...#...#.#...#.#...#...#.....#...#  
  ###.#.###.#.#.###.#.###.###.#.#.###.#.###.#.#.###.#.#.#.#.#.###.#####.#####.#####.#####.###.#######.#  
  #...#.#.#...#.........#.#.#.#.....#.#...#.#.#...#.#.#...#.#.#.#.#...........#.#.....#...#...#...#.#.#  
  ###.###.#.#########.#####.###.###.#.#.#.#######.###.#.#.###.#.#####.#.###.###.#######.#.#.#####.#.#.#  
  #.....#...#.#...#...#.....#.#.#.....#.#.#...#...#...#.#.#.........#.#...#...#.#...#.#.#.....#.#.....#  
  ###.#####.#.###.###.#####.#.#.###.#.###.#.#.#.#####.#####.#######.###.###.###.###.#.###.###.#.###.###  
  #.#.#.#.....#.#.#...........#...#.#...#...#.#.....#.....#.....#...#.#.#.....#.........#...#.#.#.....#  
  #.#.#.###.###.#.#.#########.#.###.#####.#####.#.#####.###.#######.#.#####.###.#########.#####.#####.#  
  #.......#.#.........#.#.#.....#.#.#.#.#...#.#.#...#.#.#.#.#.#...#...#.#.....................#.#.#.#.#  
  ###.###.#.#####.#####.#.#####.#.###.#.#.###.###.###.#.#.###.#.###.###.###.#######.#####.#.###.#.#.#.#  
  #.#...#.#.#.#...#...#...#.#...#.......#...#.#.#...#.....#...#...........#.....#.#...#.#.#.#.........#  
  #.#####.#.#.#####.###.###.###.###.###.#.###.#.###.#.#######.#.#####.#####.#####.#.###.#######.###.###  
  #.#.#.#.........#.#.....#.......#.#.........#.#...#.....#.#...#...#.#.#.........#.#.#.#.....#.#...#.#  
  #.#.#.#.#########.#####.#####.###.#.#.#.#.###.#.#####.#.#.###.#.#.###.#.###.###.###.#.#.###.#.###.#.#  
  #.....#.......#...#.....#.#.....#.#.#.#.#...#.....#...#.....#...#...#.....#.#...#.#.....#...#...#.#.#  
  ###.#####.#######.#####.#.###.#######.#######.#########.###.#.###.#####.#########.###.#####.#####.#.#  
  #...#.#...#.#...#...#.....#.......#.......#.......#.....#...#.#.....#.....#.......#...#.#.#.#.......#  
  #.#.#.###.#.###.#.#####.#####.#########.#######.#######.#########.#####.#####.#######.#.#.#######.###  
  #.#.#.#.......#...#.....#    Y         M       R       H         J     H    #...#.#...#.......#...#.#  
  #.###.#####.###.###.#####    Q         F       C       G         R     Z    ###.#.###.###.#######.#.#  
  #...............#.......#                                                   #.#.......#.....#.......#  
  ###.#.#####.###.#.#.#.###                                                   #.#.#######.#####.#.#.###  
  #...#.#.#...#.....#.#...#                                                 DD....#.#.....#...#.#.#....HG
  ###.###.#####.###.#####.#                                                   ###.#.###.###.#########.#  
DD..#.....#.#.#.#.#...#....CC                                                 #.....#...#.#.#...#.#.#.#  
  #.#.#.###.#.###.#.#######                                                   #.#######.#.#.#.#.#.#.#.#  
  #...#.#.....#...#.#.....#                                                   #.#.#.#.....#...#.#.....#  
  ###########.###.#####.###                                                   #.###.#.#.#####.#######.#  
  #.......#.........#.....#                                                   #.......#...............#  
  #.#####.#.#####.###.###.#                                                   #########################  
  #.#.#.....#...#.#.....#..QE                                               PN........................#  
  ###.###.###.###.#.#######                                                   ###.#.#.###.#.#.#.#.###.#  
  #.....#.#...#...........#                                                   #.#.#.#...#.#.#.#.#...#.#  
  #.#.#.#.###.#####.#.#.###                                                   #.#.###.###.#.#####.###.#  
ER..#.#...#.#.#...#.#.#...#                                                   #.#...#.#...#.#.......#..HZ
  #########.#.###.#########                                                   #.###.#.###.#########.#.#  
  #.....................#..PC                                               FA..#.#.#.#.....#.#.#...#.#  
  #.#####.#.###.#.#.###.#.#                                                   #.#.###########.#.#####.#  
KW....#...#.#...#.#.#...#.#                                                   #.#.#.#.....#.#.......#.#  
  #.###.#####.###.#####.#.#                                                   #.#.#.###.###.#.#########  
  #.#.....#...#.#...#...#.#                                                   #.......#.......#.....#.#  
  #.#.#.#####.#.#.###.#.#.#                                                   #####.#######.#.#.#.###.#  
  #.#.#.#...#.#...#...#...#                                                   #.#...........#...#......ZU
  #######.#####.###########                                                   #.#######.###########.###  
  #...#.#.#.#.....#.......#                                                   #...#.....#...#.....#...#  
  #.###.#.#.###.#.#####.#.#                                                   #.###.###.###.#.###.#####  
XZ....#.#.#.#.#.#.#.#...#.#                                                   #...#.#.#.#.....#.......#  
  #.###.#.#.#.#####.###.#.#                                                   #.#####.#######.###.###.#  
  #...#...#.#.#.#.#.#...#..KW                                               XI..................#...#..CC
  ###.#.#.#.#.#.#.#.###.###                                                   ###################.#.#.#  
  #.....#.................#                                                   #.........#.......#.#.#.#  
  ###.#.#.###.#####.#######                                                   #.#####.#.#.###.#.#######  
RC..#.#.#...#.#.#.....#.#..JC                                               TD..#.....#...#.#.#...#...#  
  #.###########.#######.#.#                                                   #.###.#.#.###.#.#####.###  
  #...#.#.#.........#...#.#                                                   #.#...#.#.#.#...#........PN
  #.###.#.###.###.#.#.#.#.#                                                   #########.#.#.###.#####.#  
  #...........#...#...#...#                                                   #.#.....#.#.#.........#.#  
  #########################                                                   #.#####.###.#############  
  #...............#.......#                                                   #.#.........#.......#....VD
  ###.#.#########.#.###.###                                                   #.###.#.###.#.#.#.#.###.#  
  #.#.#.#...#.........#.#..UD                                               TS....#.#...#...#.#.#.....#  
  #.#.###.#######.#.###.#.#                                                   #.#.#.###.#.###.###.###.#  
  #...#.....#.#...#.#...#.#                                                 AI..#.#...#.#.#.#.#.....#.#  
  #.#####.###.#########.#.#                                                   ###.#.#######.#####.###.#  
FA..#...#.....#...#.#.#...#                                                   #.#.....#...#...#...#....GB
  ###.###.#####.###.#.#####                                                   #.#######.#####.#########  
  #...#.....#..............ZU                                               WA....#...........#.......#  
  #.#.###.#.#.#####.###.#.#                                                   ###.#.#####.###.#.###.###  
  #.#.#...#.#.#.#...#...#.#                                                   #.....#.#.....#.#.#.....#  
  #.#.#.#.#.#.###.#####.###                                                   #.#.###.#######.#.###.#.#  
  #.#.#.#.#.#...#.#.....#.#                                                   #.#.....#.......#...#.#..JC
  #.#.#.###.###.#######.#.#                                                   #.#.###.#.#.###.###.###.#  
TS..#.....#...........#...#                                                   #.#.#.#.#.#...#.....#...#  
  #.#.#######.#.#.#.#######      E         V     X     K             E G      #####.#########.#.#.#.#.#  
  #.#.#.......#.#.#.#.....#      E         D     Z     J             R B      #.#.#.....#.....#.#.#.#.#  
  #.#######.#####.#######.#######.#########.#####.#####.#############.#.#######.#.#.###.###.#####.#####  
  #.#.#.........#...#...#.....#.....#...#.....#...#...#.........#.#...#...............#.#...#.......#.#  
  #.#.#####.###.#####.#####.#####.#.###.#####.#.###.#.#####.#.###.#.#######.#.#.###.###.###.###.#.###.#  
  #.#.........#...#.#.............#.#.....#...#.#...#.#...#.#.#...#...#.....#.#.#...#.#.#...#...#...#.#  
  #.#.###.#.###.###.#####.###.#.#.#####.###.###.#.###.#.#.###.#.#.###.###.#.#.#.#.#.#.###.###.#.###.#.#  
  #.#...#.#.#.....#.......#.#.#.#...#.#...#...#.#.#...#.#.....#.#.....#...#.#.#.#.#.....#.#...#...#...#  
  ###.###.###.###.#########.###.###.#.#.#####.#.#.#.###.#####.#.#.#####.#####.###.#######.#.#######.#.#  
  #.#...#.#...#.....#.............#.#.........#...#...#.#.....#.#.#...#.#.#.#...#...#.#.#.#...#.....#.#  
  #.#####.#######.#############.#.#######.#####.#.###.#.#####.#.###.#.#.#.#.###.#####.#.###########.#.#  
  #.#.....#.............#.#.....#...#.......#.#.#.#.#.#.....#.#.....#.#.....#.#.#.........#.#.#.....#.#  
  #.#.###.###.#.#.#.#####.###.#.###########.#.#####.#.#.#.#########.#.#####.#.###.#########.#.#.#.###.#  
  #...#...#...#.#.#.#.....#...#.......#.......#.#.....#.#.#.#...#...#.#.#.#.................#.#.#.#.#.#  
  ###.###.###.###.#######.#####.#.#########.###.#.#.#.#.###.#.###.###.#.#.#.#.#.#########.###.#####.#.#  
  #.....#.#...#.#.#.............#...#.#.......#.#.#.#.#.......#.#.#.#.#.....#.#...#.#.............#...#  
  #.#.###.#.###.#########.#####.#####.#.#####.#.#.###.###.###.#.###.#.#####.#####.#.#####.#######.#.#.#  
  #.#.#...#...#...#.#.#.#.#.#.#.#...#...#.#.....#.#.....#.#...#...#.......#.#.#.#...#...........#.#.#.#  
  #.#.#.#.#.#####.#.#.#.###.#.#.#.#.#.#.#.#.#######.#.#.###.#.#.#####.#####.#.#.#########.#.#########.#  
  #.#.#.#.#...#.................#.#.#.#.#...#.#...#.#.#.#...#.#...#...#.#.#.#...........#.#.....#.....#  
  ###.###.###########.#########.#.###.#####.#.###.###.#####.#####.###.#.#.#.#.#.###.#.#.###.###.#####.#  
  #.#.#.#.#.........#...#.........#...#...#.....#...#...#...#.#.......#.......#...#.#.#.#.....#.#.....#  
  #.###.#.###.###.#.#####.#.#.###.#####.#####.###.###.#####.#.###.#######.###.#####.#######.###.#####.#  
  #.......#...#.#.#.#...#.#.#.#.....#...........#.....#.....#.....#...#.#...#.....#...#.......#.#.....#  
  #####.###.#.#.###.###.#######.#######.#####.#####.###.###.###.#####.#.###.#.###.#.#.###.#.#######.#.#  
  #.....#...#.#.......................#.....#...#.....#.#.....#.....#.......#.#...#.#...#.#.#.......#.#  
  #################################.#.#####.#########.###.#######.#####.###############################  
                                   X A     K         W   E       M     Q                                 
                                   I A     J         A   E       F     E                                 `);

part1 && solve1(inputs[inputIdx]);
part2 && solve2(inputs[inputIdx]);
