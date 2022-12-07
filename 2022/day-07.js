const fs = require('fs');

var input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;
var input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function cleanTree(tree) {
  for (const key in tree) {
    if (key === '_parent') {
      delete tree[key];
    } else if (typeof tree[key] === 'object') {
      cleanTree(tree[key]);
    }
  }
}

function calcSizes(tree) {
  tree._size = 0;
  for (const key in tree) {
    if (key.startsWith('_')) {
    } else if (typeof tree[key] === 'object') {
      calcSizes(tree[key]);
    } else {
      tree._size += tree[key];
    }
  }
  if (tree._parent) {
    tree._parent._size += tree._size;
  }
}

function findAll(tree) {
  let sum = 0;
  if (tree._size <= 100000) {
    sum += tree._size;
  }
  for (const key in tree) {
    if (key.startsWith('_')) {
    } else if (typeof tree[key] === 'object') {
      sum += findAll(tree[key]);
    } else {
    }
  }
  return sum;
}

function findEnough(tree, toDelete, currBest = tree._size) {
  if (tree._size >= toDelete && tree._size < currBest) {
    currBest = tree._size;
  }
  for (const key in tree) {
    if (key.startsWith('_')) {
    } else if (typeof tree[key] === 'object') {
      currBest = findEnough(tree[key], toDelete, currBest);
    } else {
    }
  }
  return currBest;
}

// function solve(input) {
//   const tree = {};
//   let currTree = tree;
//   const lines = input.split('\n');
//   for (let i = 1; i < lines.length; i++) {
//     const line = lines[i];
//     const [, cmd, dir] = line.split(' ');
//     if (cmd === 'ls') {
//       while (i < lines.length - 1) {
//         i++;
//         const parts = lines[i].split(' ');
//         if (parts[0] === '$') {
//           i--;
//           break;
//         } else if (parts[0] === 'dir') {
//           currTree[parts[1]] = {
//             _parent: currTree,
//           };
//         } else {
//           currTree[parts[1]] = parseInt(parts[0], 10);
//         }
//       }
//     } else {
//       // cmd === 'cd'
//       if (dir === '..') {
//         currTree = currTree._parent;
//       } else {
//         currTree = currTree[dir];
//       }
//     }
//   }
//   // cleanTree(tree);
//   // console.log(JSON.stringify(tree));
//   calcSizes(tree);
//   // cleanTree(tree);
//   // console.log(JSON.stringify(tree));
//   console.log(findAll(tree));
// }
// solve(input);
function solve(input) {
  const tree = {};
  let currTree = tree;
  const lines = input.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const [, cmd, dir] = line.split(' ');
    if (cmd === 'ls') {
      while (i < lines.length - 1) {
        i++;
        const parts = lines[i].split(' ');
        if (parts[0] === '$') {
          i--;
          break;
        } else if (parts[0] === 'dir') {
          currTree[parts[1]] = {
            _parent: currTree,
          };
        } else {
          currTree[parts[1]] = parseInt(parts[0], 10);
        }
      }
    } else {
      // cmd === 'cd'
      if (dir === '..') {
        currTree = currTree._parent;
      } else {
        currTree = currTree[dir];
      }
    }
  }
  // cleanTree(tree);
  // console.log(JSON.stringify(tree));
  calcSizes(tree);
  // cleanTree(tree);
  // console.log(JSON.stringify(tree));
  // console.log(findAll(tree));
  const toDelete = tree._size - 40000000;
  console.log(findEnough(tree, toDelete));
}
solve(input);
