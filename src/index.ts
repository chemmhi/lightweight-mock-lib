import { Random, Handler } from './mock';
import type { TemplateType } from './mock/common/type';


interface Mock {
    version: string;
    Random: typeof Random;
    mock(template: TemplateType<any>): TemplateType<any>;
}

const Mock: Mock = {
    version: '1.0.0',
    Random,
    mock(template: TemplateType<any>) {
        if (arguments.length !== 1) {
            throw new Error('Invalid parameter(s)');
        }
        return Handler.gen(template);
    },
};

export default Mock;
