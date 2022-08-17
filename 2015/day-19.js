const fs = require('fs');

const input = fs.readFileSync('./day-19-input.txt', 'utf8').trimEnd();

function solve(input) {
  const [replacements, medicine] = input.split('\n\n');
  const molecules = new Set();
  for (const line of replacements.split('\n')) {
    const [left, right] = line.split(' => ');
    const indexes = [...medicine.matchAll(new RegExp(left, 'g'))].map(
      (a) => a.index
    );
    for (const i of indexes) {
      const molecule = medicine.split('');
      molecule.splice(i, left.length, right);
      molecules.add(molecule.join(''));
    }
  }
  console.log(molecules.size);
  console.log(
    medicine.match(/[A-Z]/g).length -
      medicine.match(/(Rn|Ar)/g).length -
      2 * medicine.match(/Y/g).length -
      1
  );
}
solve(input);
