/*
	## Parser

	解析数据模板（属性名部分）。

	* Parser.parse( name )
		
		```json
		{
			parameters: [ name, inc, range, decimal ],
			rnage: [ min , max ],

			min: min,
			max: max,
			count : count,

			decimal: decimal,
			dmin: dmin,
			dmax: dmax,
			dcount: dcount
		}
		```
 */

import Constant from "./constant";
import Random from "../random";

interface Result {
	parameters?: RegExpMatchArray;
	range?: RegExpMatchArray;
	min?: number;
	max?: number;
	count?: number;
	decimal?: RegExpMatchArray;
	dmin?: number;
	dmax?: number;
	dcount?: number;
}

interface Parser {
	parse: (name?: string) => Result;
}

const Parser: Parser = {
	parse(name = ""): Result {
		const parameters = (name || "").match(Constant.RE_KEY);

		const range = parameters && parameters[3] && parameters[3].match(Constant.RE_RANGE);
		const min = range && range[1] && parseInt(range[1], 10);
		const max = range && range[2] && parseInt(range[2], 10);
		const count = range ? (!range[2] ? parseInt(range[1], 10) : Random.integer(min, max)) : undefined;

		const decimal = parameters && parameters[4] && parameters[4].match(Constant.RE_RANGE);
		const dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
		const dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
		const dcount = decimal ? (!decimal[2] ? parseInt(decimal[1], 10) : Random.integer(dmin, dmax)) : undefined;

		const result: Result = {
			parameters,
			range,
			min,
			max,
			count,
			decimal,
			dmin,
			dmax,
			dcount,
		};

		for (const r in result) {
			if (result[r] !== undefined) return result;
		}

		return {};
	},
};

export default Parser;
