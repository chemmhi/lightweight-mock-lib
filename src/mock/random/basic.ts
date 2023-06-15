/*
    ## Basics
*/

export interface Pools {
  lower: string;
  upper: string;
  number: string;
  symbol: string;
  alpha: string;
  undefined: string;
}

export interface Basics {
  boolean: (min?: number, max?: number, cur?: boolean) => boolean;
  bool: (min?: number, max?: number, cur?: boolean) => boolean;
  natural: (min?: number, max?: number) => number;
  integer: (min?: number, max?: number) => number;
  int: (min?: number, max?: number) => number;
  float: (min?: number, max?: number, dmin?: number, dmax?: number) => number;
  character: (pool?: keyof Pools) => string;
  char: (pool?: keyof Pools) => string;
  string: (pool?: keyof Pools, min?: number, max?: number) => string;
  str: (pool?: keyof Pools | number, min?: number, max?: number) => string;
  range: (start: number, stop?: number, step?: number) => number[];
}

const basics: Basics = {
  // 返回一个随机的布尔值。
  boolean(min?: number, max?: number, cur = false): boolean {
    if (cur !== undefined) {
      min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min + '', 10) : 1;
      max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max + '', 10) : 1;
      return Math.random() > 1.0 / (min + max) * min ? !cur : cur;
    }

    return Math.random() >= 0.5;
  },
  bool(min?: number, max?: number, cur = false): boolean {
    return this.boolean(min, max, cur);
  },
  // 返回一个随机的自然数（大于等于 0 的整数）。
  natural: function (min?: number, max?: number) {
    // @ts-ignore
    min = typeof min !== 'undefined' ? parseInt(min, 10) : 0
    // @ts-ignore
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992 // 2^53
    return Math.round(Math.random() * (max - min)) + min
  },
  // 返回一个随机的整数。
  integer(min?: number, max?: number): number {
    min = typeof min !== 'undefined' ? parseInt(min + '', 10) : -9007199254740992;
    max = typeof max !== 'undefined' ? parseInt(max + '', 10) : 9007199254740992; // 2^53
    return Math.round(Math.random() * (max - min)) + min;
  },
  int(min?: number, max?: number): number {
    return this.integer(min, max);
  },
  // 返回一个随机的浮点数。
  float(min?: number, max?: number, dmin?: number, dmax?: number): number {
    dmin = dmin === undefined ? 0 : dmin;
    dmin = Math.max(Math.min(dmin, 17), 0);
    dmax = dmax === undefined ? 17 : dmax;
    dmax = Math.max(Math.min(dmax, 17), 0);
    let ret = this.integer(min, max) + '.';
    for (let i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {

      ret += (
        // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
        // @ts-ignore
        (i < dcount - 1) ? this.character('number') : this.character('123456789')
      );
    }
    return parseFloat(ret);
  },
  // 返回一个随机字符。
  character(pool?: keyof Pools): string {
    const pools = {
      lower: 'abcdefghijklmnopqrstuvwxyz',
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      number: '0123456789',
      symbol: '!@#$%^&*()[]',
      alpha: '',
      undefined: '',
    };
    pools.alpha = pools.lower + pools.upper
    pools['undefined'] = pools.lower + pools.upper + pools.number + pools.symbol
    // @ts-ignore
    pool = pools[('' + pool).toLowerCase()] || pool

    // @ts-ignore
    return pool?.charAt?.(this.natural(0, pool.length - 1))
  },
  char(pool: keyof Pools = 'undefined'): string {
    return this.character(pool);
  },
  // 返回一个随机字符串。
  string(pool?: keyof Pools, min?: number, max?: number): string {
    let len: number;
    switch (arguments.length) {
      case 0: // ()
        len = this.natural(3, 7);
        break;
      case 1: // ( length )
        len = typeof pool === 'number' ? pool : 0;

        // @ts-ignore
        pool = undefined;
        break;
      case 2:
        // ( pool, length )
        if (typeof arguments[0] === 'string') {
          len = min as number;
        } else {
          // ( min, max )
          // @ts-ignore
          len = this.natural(pool, min)
          pool = undefined
        }
        break;
      case 3:
        len = this.natural(min, max)
        break
    }

    let text = '';
    // @ts-ignore
    for (let i = 0; i < len; i++) {

      // @ts-ignore
      text += this.character(pool);
    }

    return text;
  },
  str(pool: keyof Pools | number = 7, min?: number, max?: number): string {

    // @ts-ignore
    return this.string(pool, min, max);
  },
  // 返回一个整型数组。
  range(start: number, stop?: number, step = 1): number[] {
    // range( stop )
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    // range( start, stop )
    start = +start;
    stop = +(stop as number);
    step = +step;

    const len = Math.max(Math.ceil((stop - start) / step), 0);
    const range = new Array(len);

    for (let idx = 0; idx < len; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }
};

export default basics;