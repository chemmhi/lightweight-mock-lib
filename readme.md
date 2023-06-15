# lightweight-mock-lib

一个轻量级生成各类随机数据的 mock 库。

## API

### 函数名称

`Random`

### 函数说明

`Random` 是一个用于生成随机数据的函数库。

### 函数列表

生成地区、地址类随机数据

#### `Random.region()`

生成一个随机的省市区地址。


#### `Random.province()`

生成一个随机的省份地址。

#### `Random.city()`

生成一个随机的城市地址。

参数：

- `deep`：可选，是否生成深度地址，默认为 `false`。


#### `Random.county()`

生成一个随机的县区地址。

参数：

- `deep`：可选，是否生成深度地址，默认为 `false`。


#### `Random.zip()`

生成一个随机的邮政编码。

```ts

import Mock from '../src/index';
const Random = Mock.Random;

console.log(Random.region()); // 湖南省 娄底市 双峰县
console.log(Random.province()); // 河南省
console.log(Random.city()); // 河南省 郑州市
console.log(Random.county()); // 河南省 郑州市 新郑市
console.log(Random.county(true)); // 河南省 郑州市 金水区 金水街道
console.log(Random.zip()); // 123456

```

### 函数列表

#### `Random.boolean()`

生成一个随机的布尔值。

#### `Random.natural()`

生成一个随机的自然数。

参数：

- `min`：可选，生成的最小值，默认为 `0`。
- `max`：可选，生成的最大值，默认为 `9007199254740992`。

#### `Random.natural(min, max)`

生成一个指定范围内的随机自然数。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。

#### `Random.integer()`

生成一个随机的整数。

参数：

- `min`：可选，生成的最小值，默认为 `-9007199254740992`。
- `max`：可选，生成的最大值，默认为 `9007199254740992`。

#### `Random.integer(min, max)`

生成一个指定范围内的随机整数。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。

#### `Random.float()`

生成一个随机的浮点数。

参数：

- `min`：可选，生成的最小值，默认为 `-9007199254740992`。
- `max`：可选，生成的最大值，默认为 `9007199254740992`。
- `dmin`：可选，生成的小数部分最小位数，默认为 `0`。
- `dmax`：可选，生成的小数部分最大位数，默认为 `17`。

#### `Random.float(min, max)`

生成一个指定范围内的随机浮点数。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。

#### `Random.float(min, max, dmin)`

生成一个指定范围内、指定小数部分最小位数的随机浮点数。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。
- `dmin`：生成的小数部分最小位数。

#### `Random.float(min, max, dmin, dmax)`

生成一个指定范围内、指定小数部分最小位数和最大位数的随机浮点数。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。
- `dmin`：生成的小数部分最小位数。
- `dmax`：生成的小数部分最大位数。

#### `Random.character()`

生成一个随机的字符。

#### `Random.character(pool)`

从指定字符池中生成一个随机字符。

参数：

- `pool`：可选，字符池，默认为包含小写字母、大写字母、数字和符号的字符池。

#### `Random.character("lower")`

从小写字母字符池中生成一个随机字符。

#### `Random.character("upper")`

从大写字母字符池中生成一个随机字符。

#### `Random.character("number")`

从数字字符池中生成一个随机字符。

#### `Random.character("symbol")`

从符号字符池中生成一个随机字符。

#### `Random.character(pool)`

从指定字符池中生成一个随机字符。

参数：

- `pool`：指定的字符池。

#### `Random.string()`

生成一个随机的字符串。

参数：

- `min`：可选，生成的最小长度，默认为 `3`。
- `max`：可选，生成的最大长度，默认为 `7`。
- `pool`：可选，字符池，默认为包含小写字母、大写字母、数字和符号的字符池。

#### `Random.string(length)`

生成一个指定长度的随机字符串。

参数：

- `length`：生成的字符串长度。

#### `Random.string(pool, length)`

从指定字符池中生成一个指定长度的随机字符串。

参数：

- `pool`：指定的字符池。
- `length`：生成的字符串长度。

#### `Random.string(min, max)`

生成一个指定长度范围的随机字符串。

参数：

- `min`：生成的最小长度。
- `max`：生成的最大长度。

#### `Random.string(pool, min, max)`

从指定字符池中生成一个指定长度范围的随机字符串。

参数：

- `pool`：指定的字符池。
- `min`：生成的最小长度。
- `max`：生成的最大长度。

#### `Random.range(count)`

生成一个指定长度的随机数组。

参数：

- `count`：生成的数组长度。

#### `Random.range(min, max)`

生成一个指定范围的随机数组。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。

#### `Random.range(min, max, step)`

生成一个指定范围和步长的随机数组。

参数：

- `min`：生成的最小值。
- `max`：生成的最大值。
- `step`：生成的步长。


### 函数列表
时间，日期类

#### `Random.date()`

生成一个随机的日期字符串，格式为 `yyyy-MM-dd`。


#### `Random.time()`

生成一个随机的时间字符串，格式为 `HH:mm:ss`。


#### `Random.datetime()`

生成一个随机的日期时间字符串，格式为 `yyyy-MM-dd HH:mm:ss`。


#### `Random.datetime(format)`

生成一个指定格式的随机日期时间字符串。

参数：

- `format`：日期时间格式字符串，支持的占位符有 `yyyy、yy、y、MM、M、dd、d、HH、H、hh、h、mm、m、ss、s、SS、S、A、a、T`。

#### `Random.now()`

获取当前时间的字符串表示，格式为 `yyyy-MM-dd HH:mm:ss`。


#### `Random.now(unit)`

获取当前时间的指定单位的值。

参数：

- `unit`：时间单位，可选值为 `year、month、day、hour、minute、second、week`。


### 函数列表


#### `Random.capitalize()`

将字符串的第一个字符转换为大写字母。

参数：

- `str`：可选，要转换的字符串，默认为 `undefined`。

#### `Random.capitalize(str)`

将指定字符串的第一个字符转换为大写字母。

参数：

- `str`：要转换的字符串。

#### `Random.upper()`

将字符串转换为大写字母。

参数：

- `str`：可选，要转换的字符串，默认为 `undefined`。

#### `Random.upper(str)`

将指定字符串转换为大写字母。

参数：

- `str`：要转换的字符串。

#### `Random.lower()`

将字符串转换为小写字母。

参数：

- `str`：可选，要转换的字符串，默认为 `undefined`。

#### `Random.lower(str)`

将指定字符串转换为小写字母。

参数：

- `str`：要转换的字符串。

#### `Random.pick()`

从数组中随机选取一个元素。

参数：

- `arr`：可选，要选取的数组，默认为 `undefined`。
- `count`：可选，要选取的元素个数，默认为 `1`。

#### `Random.pick(arr)`

从指定数组中随机选取一个元素。

参数：

- `arr`：要选取的数组。

#### `Random.pick(arr, count)`

从指定数组中随机选取指定个数的元素。

参数：

- `arr`：要选取的数组。
- `count`：要选取的元素个数。

#### `Random.shuffle()`

将数组随机排序。

参数：

- `arr`：可选，要排序的数组，默认为 `undefined`。
- `count`：可选，要选取的元素个数，默认为 `1`。

#### `Random.shuffle(arr)`

将指定数组随机排序。

参数：

- `arr`：要排序的数组。

#### `Random.shuffle(arr, count)`

将指定数组中的元素随机排序，并选取指定个数的元素。

参数：

- `arr`：要排序的数组。
- `count`：要选取的元素个数。

## 使用举例

### 随机选取元素

```javascript


// 从数组中随机选取一个元素
const pickOne = Random.pick(["a", "e", "i", "o", "u"]);
console.log(pickOne); // 输出一个随机选取的元素

// 从指定数组中随机选取指定个数的元素
const pickMultiple = Random.pick(["a", "e", "i", "o", "u"], 3);
console.log(pickMultiple); // 输出一个包含 3 个随机选取的元素的数组

```

### 随机排序
```javascript

// 将数组随机排序
const shuffleArray = Random.shuffle(["a", "e", "i", "o", "u"]);
console.log(shuffleArray); // 输出一个随机排序后的数组

// 将指定数组中的元素随机排序，并选取指定个数的元素
const shuffleAndPick = Random.shuffle(["a", "e", "i", "o", "u"], 3);
console.log(shuffleAndPick); // 输出一个包含 3 个随机选取的元素的数组


```
### 函数列表

#### `Random.guid()`

生成一个随机的 GUID 字符串。

#### `Random.id()`

生成一个随机的 18 位 ID 字符串。

## 使用举例

### 生成随机 GUID

```javascript


// 生成一个随机的 GUID 字符串
const guid = Random.guid();
console.log(guid); // 输出一个随机的 GUID 字符串
```

### 生成随机ID
```javascript


// 生成一个随机的 18 位 ID 字符串
const id = Random.id();
console.log(id); // 输出一个随机的 18 位 ID 字符串

```

### 函数列表

#### `Random.first()`

生成一个随机的英文名字的首字母。

#### `Random.last()`

生成一个随机的英文姓氏。

#### `Random.name()`

生成一个随机的英文姓名。

参数：

- `middle`：可选，是否生成中间名，默认为 `false`。

#### `Random.cfirst()`

生成一个随机的中文名字的首字。

#### `Random.clast()`

生成一个随机的中文姓氏。

#### `Random.cname()`

生成一个随机的中文姓名。

## 使用举例

### 生成随机英文名字

```javascript


// 生成一个随机的英文名字的首字母
const first = Random.first();
console.log(first); // 输出一个随机的英文名字的首字母

// 生成一个随机的英文姓氏
const last = Random.last();
console.log(last); // 输出一个随机的英文姓氏

// 生成一个随机的英文姓名
const name = Random.name();
console.log(name); // 输出一个随机的英文姓名

// 生成一个随机的英文姓名，包含中间名
const fullName = Random.name(true);
console.log(fullName); // 输出一个随机的英文姓名，包含中间名
```

### 生成随机中文名字

```javascript


// 生成一个随机的中文名字的首字
const cfirst = Random.cfirst();
console.log(cfirst); // 输出一个随机的中文名字的首字

// 生成一个随机的中文姓氏
const clast = Random.clast();
console.log(clast); // 输出一个随机的中文姓氏

// 生成一个随机的中文姓名
const cname = Random.cname();
console.log(cname); // 输出一个随机的中文姓名

```


#### `Random.paragraph()`

生成一个随机的段落。

参数：

- `min`：可选，段落中句子的最小数量，默认为 `3`。
- `max`：可选，段落中句子的最大数量，默认为 `7`。

#### `Random.paragraph(min)`

生成一个包含指定数量句子的随机段落。

参数：

- `min`：段落中句子的数量。

#### `Random.paragraph(min, max)`

生成一个包含指定数量句子的随机段落。

参数：

- `min`：段落中句子的最小数量。
- `max`：段落中句子的最大数量。

#### `Random.sentence()`

生成一个随机的英文句子。

参数：

- `min`：可选，句子中单词的最小数量，默认为 `12`。
- `max`：可选，句子中单词的最大数量，默认为 `18`。

#### `Random.sentence(min)`

生成一个包含指定数量单词的随机英文句子。

参数：

- `min`：句子中单词的数量。

#### `Random.sentence(min, max)`

生成一个包含指定数量单词的随机英文句子。

参数：

- `min`：句子中单词的最小数量。
- `max`：句子中单词的最大数量。

#### `Random.word()`

生成一个随机的英文单词。

参数：

- `min`：可选，单词的最小长度，默认为 `3`。
- `max`：可选，单词的最大长度，默认为 `10`。

#### `Random.word(min)`

生成一个指定长度的随机英文单词。

参数：

- `min`：单词的长度。

#### `Random.word(min, max)`

生成一个指定长度范围的随机英文单词。

参数：

- `min`：单词的最小长度。
- `max`：单词的最大长度。

#### `Random.title()`

生成一个随机的英文标题。

参数：

- `min`：可选，标题中单词的最小数量，默认为 `3`。
- `max`：可选，标题中单词的最大数量，默认为 `7`。

#### `Random.title(min)`

生成一个包含指定数量单词的随机英文标题。

参数：

- `min`：标题中单词的数量。

#### `Random.title(min, max)`

生成一个包含指定数量单词的随机英文标题。

参数：

- `min`：标题中单词的最小数量。
- `max`：标题中单词的最大数量。

## 使用举例

### 生成随机段落

```javascript


// 生成一个随机的段落
const paragraph = Random.paragraph();
console.log(paragraph); // 输出一个随机的段落

// 生成一个包含指定数量句子的随机段落
const paragraphWithCount = Random.paragraph(2);
console.log(paragraphWithCount); // 输出一个包含 2 个句子的随机段落

// 生成一个包含指定数量句子的随机段落
const paragraphWithRange = Random.paragraph(1, 3);
console.log(paragraphWithRange); // 输出一个包含 1 到 3 个句子的随机段落
```

### 生成随机英文句子

```javascript


// 生成一个随机的英文句子
const sentence = Random.sentence();
console.log(sentence); // 输出一个随机的英文句子

// 生成一个包含指定数量单词的随机英文句子
const sentenceWithCount = Random.sentence(4);
console.log(sentenceWithCount); // 输出一个包含 4 个单词的随机英文句子

// 生成一个包含指定数量单词的随机英文句子
const sentenceWithRange = Random.sentence(3, 5);
console
```

### 函数列表

#### `Random.url()`

生成一个随机的 URL。

#### `Random.domain()`

生成一个随机的域名。

参数：

- `tld`：可选，顶级域名，默认为随机生成。

#### `Random.domain(tld)`

生成一个随机的域名，包含指定的顶级域名。

参数：

- `tld`：顶级域名。

#### `Random.tld()`

生成一个随机的顶级域名。

#### `Random.email()`

生成一个随机的邮箱地址。

参数：

- `domain`：可选，邮箱的域名，默认为随机生成。

#### `Random.email(domain)`

生成一个随机的邮箱地址，包含指定的域名。

参数：

- `domain`：邮箱的域名。

#### `Random.ip()`

生成一个随机的 IP 地址。

## 使用举例

### 生成随机 URL

```javascript

// 生成一个随机的 URL
const url = Random.url();
console.log(url); // 输出一个随机的 URL
```

### 生成随机域名

```javascript

// 生成一个随机的域名
const domain = Random.domain();
console.log(domain); // 输出一个随机的域名

// 生成一个随机的域名，包含指定的顶级域名
const domainWithTld = Random.domain('com');
console.log(domainWithTld); // 输出一个随机的域名，包含 .com 顶级域名

```

### 生成随机邮箱地址

```javascript


// 生成一个随机的邮箱地址
const email = Random.email();
console.log(email); // 输出一个随机的邮箱地址

// 生成一个随机的邮箱地址，包含指定的域名
const emailWithDomain = Random.email('nuysoft.com');
console.log(emailWithDomain); // 输出一个随机的邮箱地址，包含 nuysoft.com 域名

```

### 生成随机 IP 地址

```javascript

// 生成一个随机的 IP 地址
const ip = Random.ip();
console.log(ip); // 输出一个随机的 IP 地址

```