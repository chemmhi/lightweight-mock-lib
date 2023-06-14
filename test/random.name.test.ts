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

    describe('Name', () => {
        doit('Random.first()', (data) => {
            expect(data[0]).toEqual(data[0].toUpperCase());
        });
        doit('Random.last()', (data) => {
            expect(data[0]).toEqual(data[0].toUpperCase());
        });
        doit('Random.name()', (data) => {
            const words = data.split(' ');
            expect(words.length).toEqual(2);
            expect(words[0][0]).toEqual(words[0][0].toUpperCase());
            expect(words[1][0]).toEqual(words[1][0].toUpperCase());
        });
        doit('Random.name(true)', (data) => {
            const words = data.split(' ');
            expect(words.length).toEqual(3);
            expect(words[0][0]).toEqual(words[0][0].toUpperCase());
            expect(words[1][0]).toEqual(words[1][0].toUpperCase());
            expect(words[2][0]).toEqual(words[2][0].toUpperCase());
        });

        doit('Random.cfirst()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.clast()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.cname()', (data) => {
            expect(data).toBeTruthy();
        });
    });
})
