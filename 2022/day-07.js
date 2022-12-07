const fs = require('fs');

const input = fs.readFileSync('./day-07-input.txt', 'utf8').trimEnd();

function calcSizes(tree) {
  tree._size = 0;
  for (const key in tree) {
    tree._size +=
      key[0] === '_'
        ? 0
        : typeof tree[key] === 'object'
        ? calcSizes(tree[key])
        : tree[key];
  }
  return tree._size;
}

function sumAll(tree, maxSize = 100000) {
  let sum = 0;
  if (tree._size <= maxSize) {
    sum += tree._size;
  }
  for (const key in tree) {
    if (key[0] !== '_' && typeof tree[key] === 'object') {
      sum += sumAll(tree[key]);
    }
  }
  return sum;
}

function findSmallest(
  tree,
  minDelete = tree._size - 40000000,
  smallest = tree._size
) {
  if (tree._size >= minDelete && tree._size < smallest) {
    smallest = tree._size;
  }
  for (const key in tree) {
    if (key[0] !== '_' && typeof tree[key] === 'object') {
      smallest = findSmallest(tree[key], minDelete, smallest);
    }
  }
  return smallest;
}

function solve(input) {
  const tree = {};
  let currTree = tree;
  const lines = input.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const [, cmd, dir] = line.split(' ');
    if (cmd === 'ls') {
      for (i++; i < lines.length; i++) {
        const parts = lines[i].split(' ');
        if (parts[0] === '$') {
          i--;
          break;
        } else if (parts[0] === 'dir') {
          currTree[parts[1]] = {
            _parent: currTree,
          };
        } else {
          currTree[parts[1]] = +parts[0];
        }
      }
    } else {
      currTree = dir === '..' ? currTree._parent : currTree[dir];
    }
  }
  calcSizes(tree);
  console.log(sumAll(tree));
  console.log(findSmallest(tree));
}
solve(input);
