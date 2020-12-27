const inputIdx = 7;

const basePattern = [0, 1, 0, -1];

function solve1(input) {
  let digits = input.split('').map(Number);
  for (let phase = 0; phase < 100; phase++) {
    const nextDigits = [];
    for (let i = 0; i < digits.length; i++) {
      const sum = digits.reduce((sum, digit, j) => {
        const val =
          digit *
          basePattern[Math.floor((j + 1) / (i + 1)) % basePattern.length];
        return sum + val;
      }, 0);
      const sumString = '' + sum;
      nextDigits.push(sumString[sumString.length - 1]);
    }
    digits = nextDigits;
  }
  console.log(digits.slice(0, 8).join(''));
}

function solve2(input) {
  let digits = input.repeat(10000).split('').map(Number);
  const offset = +digits.slice(0, 7).join('');
  digits = digits.slice(offset);
  for (let phase = 0; phase < 100; phase++) {
    const nextDigits = [...digits];
    for (let i = nextDigits.length - 1; i >= 0; i--) {
      nextDigits[i] = ((nextDigits[i + 1] || 0) + nextDigits[i]) % 10;
    }
    digits = nextDigits;
  }
  console.log(digits.slice(0, 8).join(''));
}

const inputs = [];
inputs.push(`12345678`);

inputs.push(`80871224585914546619083218645595`);

inputs.push(`19617804207202209144916044189917`);

inputs.push(`69317163492948606335995924319873`);

inputs.push(`03036732577212944063491565474664`);

inputs.push(`02935109699940807407585447034323`);

inputs.push(`03081770884921959731165446850517`);

inputs.push(
  `59709511599794439805414014219880358445064269099345553494818286560304063399998657801629526113732466767578373307474609375929817361595469200826872565688108197109235040815426214109531925822745223338550232315662686923864318114370485155264844201080947518854684797571383091421294624331652208294087891792537136754322020911070917298783639755047408644387571604201164859259810557018398847239752708232169701196560341721916475238073458804201344527868552819678854931434638430059601039507016639454054034562680193879342212848230089775870308946301489595646123293699890239353150457214490749319019572887046296522891429720825181513685763060659768372996371503017206185697`
);

solve1(inputs[inputIdx]);
solve2(inputs[inputIdx]);
