import DICT from "./address_dict";
import type { DictItem } from './address_dict';

export interface AddressInterface {
    region: () => string;
    province: () => string;
    city: (prefix?: boolean) => string;
    county: (prefix?: boolean) => string;
    zip: (len?: number) => string;
    pick: <T>(arr: T[]) => T;
    natural: (min: number, max: number) => number;
}

const Address: AddressInterface = {
    // 随机生成一个大区。
    region() {
        return this.pick(REGION);
    },

    // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
    province() {
        return this.pick(DICT).name;
    },

    // 随机生成一个（中国）市。
    city(prefix?: boolean) {
        const province = this.pick(DICT);
        const city = this.pick(province.children as DictItem[]);
        return prefix ? [province.name, city.name].join(" ") : city.name;
    },

    // 随机生成一个（中国）县。
    county(prefix?: boolean) {
        const province = this.pick(DICT);
        const city = this.pick(province.children as DictItem[]);
        const county = this.pick(city.children as DictItem[]) || {
            name: "-",
        };
        return prefix
            ? [province.name, city.name, county.name].join(" ")
            : county.name;
    },

    // 随机生成一个邮政编码（六位数字）。
    zip(len?: number) {
        let zip = "";
        for (let i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
        return zip;
    },

    // 从数组中随机选取一个元素，并返回。
    pick<T>(arr: T[]): T {
        return arr[this.natural(0, arr.length - 1)] as T;
    },

    // 生成一个随机数，范围是[min, max]。
    natural(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

};

const REGION = [
    "东北",
    "华北",
    "华东",
    "华中",
    "华南",
    "西南",
    "西北",
];

export default Address;
