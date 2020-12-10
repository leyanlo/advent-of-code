function solve1(input) {
  const diffs = { 1: 1, 3: 1 };
  for (let i = 0; i < input.length - 1; i++) {
    diffs[input[i + 1] - input[i]] = (diffs[input[i + 1] - input[i]] || 0) + 1;
  }
  console.log(diffs[1] * diffs[3]);
}

function solve(input) {
  const nextMap = {
    0: [input[0]],
    [input[input.length - 1]]: [input[input.length - 1] + 3],
  };
  const prevMap = {
    [input[0]]: [0],
    [input[input.length - 1] + 3]: [input[input.length - 1]],
  };
  for (let i = 0; i < input.length - 1; i++) {
    const curr = input[i];
    const next = input[i + 1];
    const next2 = input[i + 2];
    const next3 = input[i + 3];
    if (next - curr <= 3) {
      nextMap[curr] = nextMap[curr] || [];
      nextMap[curr].push(next);
      prevMap[next] = prevMap[next] || [];
      prevMap[next].push(curr);
    }
    if (next2 - curr <= 3) {
      nextMap[curr] = nextMap[curr] || [];
      nextMap[curr].push(next2);
      prevMap[next2] = prevMap[next2] || [];
      prevMap[next2].push(curr);
    }
    if (next3 - curr <= 3) {
      nextMap[curr] = nextMap[curr] || [];
      nextMap[curr].push(next3);
      prevMap[next3] = prevMap[next3] || [];
      prevMap[next3].push(curr);
    }
  }
  console.log(nextMap);
  console.log(prevMap);

  const countMap = Object.keys(prevMap).reduce((acc, i) => {
    const nums = prevMap[i];
    nums.forEach((num) => {
      if (num === 0) {
        acc[i] = (acc[i] || 0) + 1;
        return;
      }
      acc[i] = (acc[i] || 0) + acc[num]
    })

    return acc;
  }, {})
  console.log(countMap)
}

const input = `151
94
14
118
25
143
33
23
80
95
87
44
150
39
148
51
138
121
70
69
90
155
144
40
77
8
97
45
152
58
65
63
128
101
31
112
140
86
30
55
104
135
115
16
26
60
96
85
84
48
4
131
54
52
139
76
91
46
15
17
37
156
134
98
83
111
72
34
7
108
149
116
32
110
47
157
75
13
10
145
1
127
41
53
2
3
117
71
109
105
64
27
38
59
24
20
124
9
66
`
  .split('\n')
  .map((s) => +s);

input.sort((a, b) => a - b);

solve(input);
