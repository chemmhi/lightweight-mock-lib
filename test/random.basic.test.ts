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

    describe('Basic', () => {
        doit('Random.boolean()', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.boolean(10)', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.boolean(10, 90, true)', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.boolean(10, 90)', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.bool()', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.bool(10, 90, true)', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.bool(10, 90)', function (data) {
            expect(typeof data).toBe('boolean')
        })

        doit('Random.natural()', (data) => {
            expect(typeof data).toBe('number');
            expect(data).toBeGreaterThanOrEqual(0);
            expect(data).toBeLessThanOrEqual(9007199254740992);
        });

        doit('Random.natural(1, 3)', (data) => {
            expect(typeof data).toBe('number');
            expect(data).toBeGreaterThanOrEqual(1);
            expect(data).toBeLessThanOrEqual(3);
        });

        doit('Random.natural(1)', (data) => {
            expect(typeof data).toBe('number');
            expect(data).toBeGreaterThanOrEqual(1);
        });

        doit('Random.integer()', (data) => {
            expect(typeof data).toBe('number');
            expect(data).toBeGreaterThanOrEqual(-9007199254740992);
            expect(data).toBeLessThanOrEqual(9007199254740992);
        });

        doit('Random.int()', (data) => {
            expect(typeof data).toBe('number');
            expect(data).toBeGreaterThanOrEqual(-9007199254740992);
            expect(data).toBeLessThanOrEqual(9007199254740992);
        });

        doit('Random.integer(-10, 10)', (data) => {
            expect(typeof data).toBe('number');
            expect(data).toBeGreaterThanOrEqual(-10);
            expect(data).toBeLessThanOrEqual(10);
        });

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


        doit('Random.float()', function (data) {
            validFloat(data, -9007199254740992, 9007199254740992, 0, 17)
        })

        doit('Random.float(0)', (data) => {
            validFloat(data, 0, 9007199254740992, 0, 17);
        });

        doit('Random.float(60, 100)', (data) => {
            validFloat(data, 60, 100, 0, 17);
        });

        doit('Random.float(60, 100, 3)', (data) => {
            validFloat(data, 60, 100, 3, 17);
        });

        doit('Random.float(60, 100, 3, 5)', (data) => {
            validFloat(data, 60, 100, 3, 5);
        });

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
            expect(data.length).toBeGreaterThanOrEqual(3)
            expect(data.length).toBeLessThanOrEqual(7)
        })

        doit('Random.str("aeiou", 3, 7)', (data) => {
            expect(typeof data).toBe('string')
            expect(data.length).toBeGreaterThanOrEqual(3)
            expect(data.length).toBeLessThanOrEqual(7)
        })

        doit('Random.char("abc")', (data) => {
            expect(typeof data).toBe('string')
        })

        doit('Random.string(5)', (data) => {
            expect(typeof data).toBe('string')
            expect(data).toHaveLength(5)
        })

        doit('Random.string("lower", 5)', (data) => {
            expect(typeof data).toBe('string')
            expect(data).toHaveLength(5)
            for (let i = 0; i < data.length; i++) {
                expect(CHARACTER_LOWER).toContain(data[i])
            }
        })

        doit('Random.string(7, 10)', (data) => {
            expect(typeof data).toBe('string')
            expect(data.length).toBeGreaterThanOrEqual(7)
            expect(data.length).toBeLessThanOrEqual(10)
        })

        doit('Random.string("aeiou", 1, 3)', (data) => {
            expect(typeof data).toBe('string')
            expect(data.length).toBeGreaterThanOrEqual(1)
            expect(data.length).toBeLessThanOrEqual(3)
            for (let i = 0; i < data.length; i++) {
                expect('aeiou').toContain(data[i])
            }
        })

        doit('Random.range(10)', (data) => {
            expect(Array.isArray(data)).toBe(true)
            expect(data).toHaveLength(10)
        })

        doit('Random.range(3, 7)', (data) => {
            expect(Array.isArray(data)).toBe(true)
            expect(data).toEqual([3, 4, 5, 6])
        })

        doit('Random.range(1, 10, 2)', (data) => {
            expect(Array.isArray(data)).toBe(true)
            expect(data).toEqual([1, 3, 5, 7, 9])
        })

        doit('Random.range(1, 10, 3)', (data) => {
            expect(Array.isArray(data)).toBe(true)
            expect(data).toEqual([1, 4, 7])
        })

        const RE_DATE = /\d{4}-\d{2}-\d{2}/
        const RE_TIME = /\d{2}:\d{2}:\d{2}/
        const RE_DATETIME = new RegExp(RE_DATE.source + ' ' + RE_TIME.source)

        doit('Random.date()', (data) => {
            expect(RE_DATE.test(data)).toBeTruthy();
        });

        doit('Random.time()', (data) => {
            expect(RE_TIME.test(data)).toBeTruthy();
        });

        doit('Random.datetime()', (data) => {
            expect(RE_DATETIME.test(data)).toBeTruthy();
        });

        doit('Random.datetime("yyyy-MM-dd A HH:mm:ss")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.datetime("yyyy-MM-dd a HH:mm:ss")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.datetime("yy-MM-dd HH:mm:ss")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.datetime("y-MM-dd HH:mm:ss")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.datetime("y-M-d H:m:s")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.datetime("yyyy yy y MM M dd d HH H hh h mm m ss s SS S A a T")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now()', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("year")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("month")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("day")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("hour")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("minute")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("second")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("week")', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.now("yyyy-MM-dd HH:mm:ss SS")', (data) => {
            expect(data).toBeTruthy();
        });

    })
})