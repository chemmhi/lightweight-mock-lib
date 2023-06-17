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

    describe('Text', () => {
        doit('Random.paragraph()', (data) => {
            expect(data.split('.').length - 1).toBeGreaterThanOrEqual(3);
            expect(data.split('.').length - 1).toBeLessThanOrEqual(7);
        });
        doit('Random.paragraph(2)', (data) => {
            expect(data.split('.').length - 1).toEqual(2);
        });
        doit('Random.paragraph(1, 3)', (data) => {
            expect(data.split('.').length - 1).toBeGreaterThanOrEqual(1);
            expect(data.split('.').length - 1).toBeLessThanOrEqual(3);
        });

        doit('Random.sentence()', (data) => {
            expect(data[0]).toEqual(data.toUpperCase()[0]);
            expect(data.split(' ').length).toBeGreaterThanOrEqual(12);
            expect(data.split(' ').length).toBeLessThanOrEqual(18);
        });
        doit('Random.sentence(4)', (data) => {
            expect(data[0]).toEqual(data.toUpperCase()[0]);
            expect(data.split(' ').length).toEqual(4);
        });
        doit('Random.sentence(3, 5)', (data) => {
            expect(data[0]).toEqual(data.toUpperCase()[0]);
            expect(data.split(' ').length).toBeGreaterThanOrEqual(3);
            expect(data.split(' ').length).toBeLessThanOrEqual(5);
        });

        doit('Random.word()', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(10);
        });
        doit('Random.word(4)', (data) => {
            expect(data.length).toEqual(4);
        });
        doit('Random.word(3, 5)', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(5);
        });

        doit('Random.title()', (data) => {
            const words = data.split(' ');
            words.forEach((word) => {
                expect(word[0]).toEqual(word[0].toUpperCase());
            });
            expect(words.length).toBeGreaterThanOrEqual(3);
            expect(words.length).toBeLessThanOrEqual(7);
        });
        doit('Random.title(4)', (data) => {
            const words = data.split(' ');
            words.forEach((word) => {
                expect(word[0]).toEqual(word[0].toUpperCase());
            });
            expect(words.length).toEqual(4);
        });
        doit('Random.title(3, 5)', (data) => {
            const words = data.split(' ');
            words.forEach((word) => {
                expect(word[0]).toEqual(word[0].toUpperCase());
            });
            expect(words.length).toBeGreaterThanOrEqual(3);
            expect(words.length).toBeLessThanOrEqual(5);
        });
        doit('Random.cparagraph()', (data) => {
            expect(data.split('.').length - 1).toBeGreaterThanOrEqual(3);
            expect(data.split('.').length - 1).toBeLessThanOrEqual(7);
        });
        doit('Random.cparagraph(2)', (data) => {
            expect(data.split('.').length - 1).toEqual(2);
        });
        doit('Random.cparagraph(1, 3)', (data) => {
            expect(data.split('.').length - 1).toBeGreaterThanOrEqual(1);
            expect(data.split('.').length - 1).toBeLessThanOrEqual(3);
        });

        doit('Random.csentence()', (data) => {
            expect(data[0]).toEqual(data.toUpperCase()[0]);
            expect(data.split(' ').length).toBeGreaterThanOrEqual(12);
            expect(data.split(' ').length).toBeLessThanOrEqual(18);
        });
        doit('Random.csentence(4)', (data) => {
            expect(data.length).toEqual(4);
        });
        doit('Random.csentence(3, 5)', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(5);
        });

        doit('Random.cword()', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(10);
        });
        doit('Random.cword(4)', (data) => {
            expect(data.length).toEqual(4);
        });
        doit('Random.cword(3, 5)', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(5);
        });

        doit('Random.ctitle()', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(7);
        });
        doit('Random.ctitle(4)', (data) => {
            expect(data.length).toEqual(4);
        });
        doit('Random.ctitle(3, 5)', (data) => {
            expect(data.length).toBeGreaterThanOrEqual(3);
            expect(data.length).toBeLessThanOrEqual(5);
        });
    });
})
