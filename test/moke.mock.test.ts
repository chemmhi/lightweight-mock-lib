// @ts-nocheck
import Mock from '../src/index';


describe('Mock.mock', () => {
    const stringify = (json) => {
        return JSON.stringify(json)
    }

    const doit = (expression, validator) => {
        let data = Mock.mock(expression)
        let title = stringify(expression) + ' => ' + stringify(data);

        it(title, () => validator(data))
    }

    describe('Mock.mock( String )', () => {
        doit('@EMAIL', (data) => {
            expect(data).toBeTruthy();
        })
    })
    describe('Mock.mock( {} )', () => {
        let tpl = {
            'list|1-10': [{
                'id|+1': 1,
                'email': '@EMAIL'
            }]
        }
        doit(tpl, (data) => {
            expect(data).toHaveProperty('list')
            expect(data.list).toBeInstanceOf(Array)
            expect(data.list.length).toBeGreaterThanOrEqual(1)
            expect(data.list.length).toBeLessThanOrEqual(10)
            for (let item of data.list) {
                expect(item).toHaveProperty('id')
                expect(item).toHaveProperty('email')
            }
        })
    })
})