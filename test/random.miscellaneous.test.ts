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

    const RE_GUID = /[a-fA-F0-9]{8}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{12}/
    describe('Miscellaneous', () => {
        doit('Random.guid()', (data) => {
            expect(typeof data).toBe('string');
            expect(data).toHaveLength(36);
            expect(RE_GUID.test(data)).toBeTruthy();
        });
        doit('Random.id()', (data) => {
            expect(typeof data).toBe('string');
            expect(data).toHaveLength(18);
        });
    });
})
