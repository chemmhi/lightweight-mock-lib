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

    describe('Address', () => {
        doit('Random.region()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.province()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.city()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.city(true)', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.county()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.county(true)', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.zip()', (data) => {
            expect(data).toBeTruthy();
        });
    });
})
