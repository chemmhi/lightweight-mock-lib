export interface PatternLetters {
    [key: string]: string | ((date: Date) => string);
}

const patternLetters: PatternLetters = {
    yyyy: 'getFullYear',
    yy: (date) => ('' + date.getFullYear()).slice(2),
    y: 'yy',
    MM: (date) => {
        const m = date.getMonth() + 1;
        return m < 10 ? '0' + m : m.toString();
    },
    M: (date) => (date.getMonth() + 1).toString(),
    dd: (date) => {
        const d = date.getDate();
        return d < 10 ? '0' + d : d.toString();
    },
    d: 'getDate',
    HH: (date) => {
        const h = date.getHours();
        return h < 10 ? '0' + h : h.toString();
    },
    H: 'getHours',
    hh: (date) => {
        const h = date.getHours() % 12;
        return h < 10 ? '0' + h : h.toString();
    },
    h: (date) => (date.getHours() % 12).toString(),
    mm: (date) => {
        const m = date.getMinutes();
        return m < 10 ? '0' + m : m.toString();
    },
    m: 'getMinutes',
    ss: (date) => {
        const s = date.getSeconds();
        return s < 10 ? '0' + s : s.toString();
    },
    s: 'getSeconds',
    SS: (date) => {
        const ms = date.getMilliseconds();
        return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms.toString();
    },
    S: 'getMilliseconds',
    A: (date) => (date.getHours() < 12 ? 'AM' : 'PM'),
    a: (date) => (date.getHours() < 12 ? 'am' : 'pm'),
    T: 'getTime',
};

export default {
    patternLetters: patternLetters,
    rformat: new RegExp((function () {
        const re = Object.keys(patternLetters);
        return '(' + re.join('|') + ')';
    })(), 'g'),
    formatDate(date: Date, format: string): string {
        return format.replace(this.rformat, (_substring: string, flag: string) => {

            return typeof patternLetters[flag] === 'function'
                // @ts-ignore
                ? patternLetters[flag](date)
                // @ts-ignore
                : patternLetters[flag] in patternLetters
                    ? this.formatDate(date, patternLetters[flag] as string)
                    // @ts-ignore
                    : (date as any)[patternLetters[flag]]();
        });
    },
    randomDate(min?: Date, max?: Date): Date {
        min = min === undefined ? new Date(0) : min;
        max = max === undefined ? new Date() : max;
        return new Date(Math.random() * (max.getTime() - min.getTime()));
    },
    date(format?: string): string {
        format = format || 'yyyy-MM-dd';
        return this.formatDate(this.randomDate(), format);
    },
    time(format?: string): string {
        format = format || 'HH:mm:ss';
        return this.formatDate(this.randomDate(), format);
    },
    datetime(format?: string): string {
        format = format || 'yyyy-MM-dd HH:mm:ss';
        return this.formatDate(this.randomDate(), format);
    },
    now(unit?: string, format?: string): string {
        if (arguments.length === 1) {
            if (!/year|month|day|hour|minute|second|week/.test(unit as string)) {
                format = unit;
                unit = '';
            }
        }
        unit = (unit || '').toLowerCase();
        format = format || 'yyyy-MM-dd HH:mm:ss';

        const date = new Date();

        switch (unit) {
            // 这里想进行挨个对比，没有break是有意为之，但是即使加了falls through还是有ts报错，添加了ts-ignore
            // @ts-ignore
            case 'year':
                date.setMonth(0);

            // @ts-ignore
            case 'month':
                date.setDate(1);

            // @ts-ignore
            case 'week':

            // @ts-ignore
            case 'day':
                date.setHours(0);

            // @ts-ignore
            case 'hour':
                date.setMinutes(0);
            // @ts-ignore
            case 'minute':
                date.setSeconds(0);
            case 'second':
                date.setMilliseconds(0);
                break;
            default:
                throw new Error('Unknown unit');
        }
        switch (unit) {
            case 'week':
                date.setDate(date.getDate() - date.getDay());
        }

        return this.formatDate(date, format);
    },
};
