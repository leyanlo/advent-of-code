const fs = require('fs');

var input = `D2FE28`;
var input = `38006F45291200`;
var input = `EE00D40C823060`;
var input = `8A004A801A8002F478`; // 16?
var input = `620080001611562C8802118E34`; // 12?
// var input = `C0015000016115A2E0802F182340`;// 23?
// var input = `A0016C880162017C3686B18A3D4780`;// 31?
var input = fs.readFileSync('./day-16-input.txt', 'utf8').trimEnd();

function getValue(bits) {
  let i = 0;
  const values = [];
  while (bits[i++] === '1') {
    values.push(bits.slice(i, (i += 4)));
  }
  values.push(bits.slice(i, (i += 4)));
  return [parseInt(values.join(''), 2), i];
}

function parsePacket(bits, packetVersions) {
  let i = 0;
  const packetVersion = parseInt(bits.slice(i, (i += 3)), 2);
  console.log({ packetVersion });
  packetVersions.push(packetVersion);

  const packetTypeId = parseInt(bits.slice(i, (i += 3)), 2);
  console.log({ packetTypeId });

  const versions = [];
  if (packetTypeId === 4) {
    const [version, offset] = getValue(bits.slice(i));
    versions.push(version);
    i += offset;
  } else {
    const lengthTypeId = parseInt(bits[i++], 2);
    console.log({ lengthTypeId });
    if (lengthTypeId === 0) {
      const lengthOfBits = parseInt(bits.slice(i, (i += 15)), 2);
      console.log({ lengthOfBits });

      let totalOffset = 0;
      while (totalOffset < lengthOfBits) {
        const [version, offset] = parsePacket(
          bits.slice(i + totalOffset, i + lengthOfBits),
          packetVersions
        );
        console.log({ version, offset });
        versions.push(version);
        totalOffset += offset;
      }
      i += lengthOfBits;
    } else {
      const nSubPackets = parseInt(bits.slice(i, (i += 11)), 2);
      console.log({ nSubPackets });

      let totalOffset = 0;
      for (let j = 0; j < nSubPackets; j++) {
        const [version, offset] = parsePacket(
          bits.slice(i + totalOffset),
          packetVersions
        );
        console.log({ version, offset: totalOffset });
        versions.push(version);
        totalOffset += offset;
      }
      i += totalOffset;
    }
  }
  console.log({ versions });
  return [versions.reduce((acc, v) => acc + v, 0), i];
}

function solve(input) {
  const nibbles = [];
  for (const char of input) {
    nibbles.push(parseInt(char, 16).toString(2).padStart(4, '0'));
  }
  const bits = nibbles.join('');
  console.log({ bits });
  const packetVersions = [];
  const [versionSum] = parsePacket(bits, packetVersions);
  console.log(packetVersions.reduce((acc, v) => acc + v));
}
solve(input);
