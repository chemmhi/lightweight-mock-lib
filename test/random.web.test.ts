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


    const RE_URL = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
    const RE_IP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    describe('Web', () => {
        doit('Random.url()', (data) => {
            expect(RE_URL.test(data)).toBeTruthy();
        });
        doit('Random.domain()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.domain("com")', (data) => {
            expect(data).toContain('.com');
        });
        doit('Random.tld()', (data) => {
            expect(data).toBeTruthy();
        });

        doit('Random.email()', (data) => {
            expect(data).toBeTruthy();
        });
        doit('Random.email("nuysoft.com")', (data) => {
            expect(data).toContain('@nuysoft.com');
        });
        doit('Random.ip()', (data) => {
            expect(RE_IP.test(data)).toBeTruthy();
        });
    });
})
