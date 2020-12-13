function solve1(input) {
  const diffMap = {};
  for (let i = 0; i < input.length - 1; i++) {
    const diff = input[i + 1] - input[i];
    diffMap[diff] = (diffMap[diff] || 0) + 1;
  }
  console.log(diffMap[1] * diffMap[3]);
}

function solve2(input) {
  const waysMap = {
    0: 1,
  };
  for (let i = 0; i < input.length; i++) {
    const curr = input[i];
    for (let j = 0; j < 3; j++) {
      const next = input[i + 1 + j];
      if (next - curr <= 3) {
        waysMap[next] = (waysMap[next] || 0) + waysMap[curr];
      }
    }
  }
  console.log(waysMap[input[input.length - 1]]);
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
66`
  .split('\n')
  .map((s) => +s);

input.sort((a, b) => a - b);
input.push(input[input.length - 1] + 3);
input.unshift(0);

solve1(input);
solve2(input);
