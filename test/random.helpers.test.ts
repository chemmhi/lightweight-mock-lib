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

    describe('Helpers', () => {
        doit('Random.capitalize()', (data) => {
            expect(data).toEqual('Undefined');
        });
        doit('Random.capitalize("hello")', (data) => {
            expect(data).toEqual('Hello');
        });

        doit('Random.upper()', (data) => {
            expect(data).toEqual('UNDEFINED');
        });
        doit('Random.upper("hello")', (data) => {
            expect(data).toEqual('HELLO');
        });

        doit('Random.lower()', (data) => {
            expect(data).toEqual('undefined');
        });
        doit('Random.lower("HELLO")', (data) => {
            expect(data).toEqual('hello');
        });

        doit('Random.pick()', (data) => {
            expect(data).toBeUndefined();
        });
        doit('Random.pick("a", "e", "i", "o", "u")', (data) => {
            expect(["a", "e", "i", "o", "u"]).toContain(data);
        });
        doit('Random.pick(["a", "e", "i", "o", "u"])', (data) => {
            expect(["a", "e", "i", "o", "u"]).toContain(data);
        });
        doit('Random.pick(["a", "e", "i", "o", "u"], 3)', (data) => {
            expect(data).toBeInstanceOf(Array);
            expect(data).toHaveLength(3);
        });
        doit('Random.pick(["a", "e", "i", "o", "u"], 1, 5)', (data) => {
            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThanOrEqual(1);
            expect(data.length).toBeLessThanOrEqual(5);
        });

        doit('Random.shuffle()', (data) => {
            expect(data).toEqual([]);
        });
        doit('Random.shuffle(["a", "e", "i", "o", "u"])', (data) => {
            expect(data.join('')).not.toEqual('aeiou');
            expect(data.sort().join('')).toEqual('aeiou');
        });
        doit('Random.shuffle(["a", "e", "i", "o", "u"], 3)', (data) => {
            expect(data).toBeInstanceOf(Array);
            expect(data).toHaveLength(3);
        });
        doit('Random.shuffle(["a", "e", "i", "o", "u"], 1, 5)', (data) => {
            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThanOrEqual(1);
            expect(data.length).toBeLessThanOrEqual(5);
        });
    });
})
