# lightweight-mock-lib

一个轻量级生成各类随机数据的 mock 库。

## 使用

### Random

```ts
import { Random } from 'lightweight-mock-lib'

// 生成一个布尔值，true 的概率为 50%
console.log(Random.boolean(0.5)) // true

// 生成一个长度在 [0, 5) 之间的数组
console.log(Random.array(5)) // [0, 1, 2, 3, 4]

// 生成一个长度在 [3, 8) 之间的数组
console.log(Random.array(3, 8)) // [3, 4, 5, 6, 7]

// 生成一个长度在 [1, 10) 之间，步长为 2 的数组
console.log(Random.array(1, 10, 2)) // [1, 3, 5, 7, 9]

// 生成一个 -10~10 范围内的整数
console.log(Random.integer(-10, 10)) // 8

// 生成一个 0~100 范围内的自然数
console.log(Random.natural(0, 100)) // 54

// 生成一个 0~1 范围内保留 2 位小数的小数
console.log(Random.float(0, 1, 2, 2)) // 0.42

// 生成一个长度在 [5, 10] 之间的字符串，字符串池为 'abcdefghijklmnopqrstuvwxyz'
console.log(Random.string('abcdefghijklmnopqrstuvwxyz', 5, 10)) // 'fgac'

// 生成一个长度为 1 的字符串，字符串池为 'abcdefghijklmnopqrstuvwxyz'
console.log(Random.character('abcdefghijklmnopqrstuvwxyz')) // 'c'

// 生成一个日期字符串，格式为 'yyyy-MM-dd'
console.log(Random.date('yyyy-MM-dd')) // '2011-03-21'

// 生成一个时间字符串，格式为 'HH:mm:ss'
console.log(Random.time('HH:mm:ss')) // '10:03:21'

// 生成一个日期时间字符串，格式为 'yyyy-MM-dd HH:mm:ss'
console.log(Random.datetime('yyyy-MM-dd HH:mm:ss')) // '1973-04-12 11:02:31'

// 生成一个长度在 [3, 6] 之间的单词
console.log(Random.word(3, 6)) // 'abc'

// 生成一个 ip
console.log(Random.ip()) // '13.42.12.43'

// 生成一个 email
console.log(Random.email()) // 'x.qdips@wivrxii.bw'
```

### Mock

```ts
import Mock from 'lightweight-mock-lib'

console.log(
  Mock.mock({
    'name|1': ['张三', '李四', '王五'],
    'age|1-100': 1,
    email: '@email',
    ip: '@ip',
    'hobby|1-3': '@word',
    birthday: '@date',
    datetime: '@datetime',
    isStudent: '@boolean(0.7)',
    'friends|3-5': [
      {
        name: '@word(3,5)',
        age: '@natural()',
        "intimacy|1-10": "★"
      },
    ],
  })
)


// 输出结果
`
{
  name: '李四',
  age: 54,
  email: 'sde.esfd@wivrxii.sc',
  ip: '172.16.31.10',
  hobby: 'egdc',
  birthday: '1973-04-12',
  datetime: '2001-03-15 11:02:31',
  isStudent: true,
  friends: [
    {
      name: 'csae',
      age: 6,
      intimacy: '★'
    },
    {
      name: 'uib',
      age: 18,
      intimacy: '★★★★★★'
    },
    {
      name: 'ghi',
      age: 75,
      intimacy: '★★★'
    }
  ]
}
`

```

## API

### Random

- Random.boolean(percent?: number)：Boolean;

  生成一个布尔值，percent 代表生成 true 的概率

- Random.array(stop: number): Array<number>;

  生成一个数组，长度在[0, stop]之间

- Random.array(start: number, stop: number): Array<number>;

  生成一个数组，长度在[start, stop]之间

- Random.array(start: number, stop: number, step: number): Array<number>;

  生成一个数组，长度在[start, stop]之间，step 代表步长

- Random.integer(min?: number, max?: number): number;

  生成一个 min~max 范围内的整数

- Random.natural(min?: number, max?: number): number;

  生成一个 min~max 范围内的自然数

- Random.float(min?: number, max?: number, dmin?: number, dmax?: number): number;

  生成一个 min~max 范围内的小数，dmin， dmax 代表保留的小数位数

- Random.string(pool?: StringPool, min?: number, max?: number): string;

  生成一个字符串，pool 代表字符串池，min，max 代表字符串长度范围

- Random.character(pool?: StringPool): string;

  生成一个字符串，pool 代表字符串池

- Random.date(format?: string): string;

  生成一个日期字符串，format 代表日期格式

- Random.time(format?: string): string;

  生成一个时间字符串，format 代表时间格式

- Random.datetime(format?: string): string;

  生成一个日期时间字符串，format 代表日期时间格式

- Random.word(min?: number, max?: number): string;

  生成一个 min~max 字符的单词

- Random.ip(): string;

  生成一个 ip

- Random.email(): string;

  生成一个 email


### Mock

- Mock.mock(template: CustomTemplateType): CustomTemplateType;

  根据模板生成数据
