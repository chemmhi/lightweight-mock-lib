import Util from '../common/util';

export default {
  // 把字符串的第一个字母转换为大写。
  capitalize: function (word: string): string {
    return (word + '').charAt(0).toUpperCase() + (word + '').substr(1);
  },

  // 把字符串转换为大写。
  upper: function (str: string): string {
    return (str + '').toUpperCase();
  },

  // 把字符串转换为小写。
  lower: function (str: string): string {
    return (str + '').toLowerCase();
  },

  // 从数组中随机选取一个元素，并返回。
  pick: function <T>(arr: T[], min = 1, max = 1): T | T[] {
    if (!Util.isArray(arr)) {
      arr = [].slice.call(arguments)
      min = 1
      max = 1
    } else {
      // pick( [ item1, item2 ... ] )
      if (min === undefined) min = 1

      // pick( [ item1, item2 ... ], count )
      if (max === undefined) max = min
    }
    if (min === 1 && max === 1) {

      // @ts-ignore
      return arr[this.natural(0, arr.length - 1)] as T;
    }
    return this.shuffle(arr, min, max);
  },
  // @ts-ignore
  shuffle: function <T>(arr: T[], min?: number, max?: number): T[] {
    arr = arr || []
    let old = arr.slice(0),
      result = [],
      index = 0,
      length = old.length;
    for (let i = 0; i < length; i++) {
      // @ts-ignore
      index = this.natural(0, old.length - 1)
      result.push(old[index])
      old.splice(index, 1)
    }
    switch (arguments.length) {
      case 0:
      case 1:
        return result as T[];
      // @ts-ignore
      case 2:
        max = min
      case 3:
        // @ts-ignore
        min = parseInt(min, 10)
        // @ts-ignore
        max = parseInt(max, 10)
        // @ts-ignore
        return result.slice(0, this.natural(min, max));
    }
  }
};
