// @ts-nocheck
import Mock from '../src/index';
const Random = Mock.Random;

describe('Random', () => {
  const stringify = (json) => {
    return JSON.stringify(json)
  }

  const doit = (expression, validator) => {
    let data = eval(expression)
    let title = stringify(expression) + ' => ' + stringify(data);

    it(title, () => validator(data))
  }

  // doit('Random.boolean()', function (data) {
  //   expect(typeof data).toBe('boolean')
  // })

  // doit('Random.natural()', () => {
  //   const data = Random.natural();
  //   expect(typeof data).toBe('number');
  //   expect(data).toBeGreaterThanOrEqual(0);
  //   expect(data).toBeLessThanOrEqual(9007199254740992);
  // });

  // doit('Random.natural(1, 3)', () => {
  //   const data = Random.natural(1, 3);
  //   expect(typeof data).toBe('number');
  //   expect(data).toBeGreaterThanOrEqual(1);
  //   expect(data).toBeLessThanOrEqual(3);
  // });

  // doit('Random.natural(1)', () => {
  //   const data = Random.natural(1);
  //   expect(typeof data).toBe('number');
  //   expect(data).toBeGreaterThanOrEqual(1);
  // });

  // doit('Random.integer()', () => {
  //   const data = Random.integer();
  //   expect(typeof data).toBe('number');
  //   expect(data).toBeGreaterThanOrEqual(-9007199254740992);
  //   expect(data).toBeLessThanOrEqual(9007199254740992);
  // });

  // doit('Random.integer(-10, 10)', () => {
  //   const data = Random.integer(-10, 10);
  //   expect(typeof data).toBe('number');
  //   expect(data).toBeGreaterThanOrEqual(-10);
  //   expect(data).toBeLessThanOrEqual(10);
  // });


  // 1 整数部分 2 小数部分
  const RE_FLOAT = /(\-?\d+)\.?(\d+)?/;

  const validFloat = (float, min, max, dmin, dmax) => {
    RE_FLOAT.lastIndex = 0
    let parts = RE_FLOAT.exec(float + '')

    expect(typeof +parts[1]).toBe('number')
    expect(+parts[1]).toBeLessThanOrEqual(max)
    expect(+parts[1]).toBeGreaterThanOrEqual(min);

    if (parts[2] != undefined) {
      expect(parts[2].length).toBeLessThanOrEqual(dmax)
      expect(parts[2].length).toBeGreaterThanOrEqual(dmin)
    }
  }

  // doit('Random.float()', function (data) {
  //   validFloat(data, -9007199254740992, 9007199254740992, 0, 17)
  // })

  // doit('Random.float(0)', (data) => {
  //   validFloat(data, 0, 9007199254740992, 0, 17);
  // });

  // doit('Random.float(60, 100)', (data) => {
  //   validFloat(data, 60, 100, 0, 17);
  // });

  // doit('Random.float(60, 100, 3)', (data) => {
  //   validFloat(data, 60, 100, 3, 17);
  // });

  // doit('Random.float(60, 100, 3, 5)', (data) => {
  //   validFloat(data, 60, 100, 3, 5);
  // });

  const CHARACTER_LOWER = 'abcdefghijklmnopqrstuvwxyz'
  const CHARACTER_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const CHARACTER_NUMBER = '0123456789'
  const CHARACTER_SYMBOL = '!@#$%^&*()[]'

  doit('Random.character()', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(1)
    expect(
      CHARACTER_LOWER +
      CHARACTER_UPPER +
      CHARACTER_NUMBER +
      CHARACTER_SYMBOL
    ).toContain(data)
  })

  doit('Random.character("lower")', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(1)
    expect(CHARACTER_LOWER).toContain(data)
  })

  doit('Random.character("upper")', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(1)
    expect(CHARACTER_UPPER).toContain(data)
  })

  doit('Random.character("number")', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(1)
    expect(CHARACTER_NUMBER).toContain(data)
  })

  doit('Random.character("symbol")', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(1)
    expect(CHARACTER_SYMBOL).toContain(data)
  })

  doit('Random.character("aeiou")', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(1)
    expect('aeiou').toContain(data)
  })

  doit('Random.string()', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(expect.any(Number))
    expect(data).toHaveLength(expect.toBeWithin(3, 7))
  })

  doit('Random.string(5)', (data) => {
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(5)
  })

  doit('Random.string("lower", 5)', () => {
    const data = Random.string('lower', 5)
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(5)
    for (let i = 0; i < data.length; i++) {
      expect(CHARACTER_LOWER).toContain(data[i])
    }
  })

  doit('Random.string(7, 10)', () => {
    const data = Random.string(7, 10)
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(expect.any(Number))
    expect(data).toHaveLength(expect.toBeWithin(7, 10))
  })

  doit('Random.string("aeiou", 1, 3)', () => {
    const data = Random.string('aeiou', 1, 3)
    expect(typeof data).toBe('string')
    expect(data).toHaveLength(expect.any(Number))
    expect(data).toHaveLength(expect.toBeWithin(1, 3))
    for (let i = 0; i < data.length; i++) {
      expect('aeiou').toContain(data[i])
    }
  })

  doit('Random.range(10)', () => {
    const data = Random.range(10)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(10)
  })

  doit('Random.range(3, 7)', () => {
    const data = Random.range(3, 7)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual([3, 4, 5, 6])
  })

  doit('Random.range(1, 10, 2)', () => {
    const data = Random.range(1, 10, 2)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual([1, 3, 5, 7, 9])
  })

  doit('Random.range(1, 10, 3)', () => {
    const data = Random.range(1, 10, 3)
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual([1, 4, 7])
  })

})