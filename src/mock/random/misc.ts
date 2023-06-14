import DICT from './address_dict';
export interface Miscellaneous {
	d4(): number;
	d6(): number;
	d8(): number;
	d12(): number;
	d20(): number;
	d100(): number;
	guid(): string;
	uuid(): string;
	id(): string;
	increment(step?: number): number;
	inc(step?: number): number;
}

const miscellaneous: Miscellaneous = {
	d4: function (): number {
		// @ts-ignore
		return this.natural(1, 4);
	},
	d6: function (): number {
		// @ts-ignore
		return this.natural(1, 6);
	},
	d8: function (): number {
		// @ts-ignore
		return this.natural(1, 8);
	},
	d12: function (): number {
		// @ts-ignore
		return this.natural(1, 12);
	},
	d20: function (): number {
		// @ts-ignore
		return this.natural(1, 20);
	},
	d100: function (): number {
		// @ts-ignore
		return this.natural(1, 100);
	},
	guid: function (): string {
		const pool = 'abcdefABCDEF1234567890';
		// @ts-ignore
		const guid = `${this.string(pool, 8)}-${this.string(pool, 4)}-${this.string(pool, 4)}-${this.string(pool, 4)}-${this.string(pool, 12)}`;
		return guid;
	},
	uuid: function (): string {
		return this.guid();
	},
	id: function (): string {
		let sum = 0;
		let rank = [
			'7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'
		];
		let last = [
			'1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'
		];
		// @ts-ignore
		let id = this.pick(DICT).id + this.date('yyyyMMdd') + this.string('number', 3);

		for (let i = 0; i < id.length; i++) {
			sum += id[i] * parseInt(rank[i] as string, 10);
		}
		id += last[sum % 11];

		return id;
	},
	increment: function (): (step?: number) => number {
		let key = 0;
		return function (step = 1): number {
			return key += (+step);
		};
	}(),
	inc: function (step = 1): number {
		return this.increment(step);
	}
};

export default miscellaneous;
