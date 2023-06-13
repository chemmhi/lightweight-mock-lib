/**
 * 公共方法
 */

interface Util {
    extend: (...args: any[]) => any;
    each: (obj: any, iterator: Function, context?: any) => void;
    type: (obj: any) => string;
    isString: (obj: any) => boolean;
    isObject: (obj: any) => boolean;
    isArray: (obj: any) => boolean;
    isRegExp: (obj: any) => boolean;
    isFunction: (obj: any) => boolean;
    isObjectOrArray: (value: any) => boolean;
    isNumeric: (value: any) => boolean;
    keys: (obj: any) => string[];
    values: (obj: any) => any[];
    heredoc: (fn: Function) => string;
    noop: () => void;
  }
  
  const Util: Util = {} as Util;
  
  Util.extend = function extend(...args: any[]) {
    let target = args[0] || {},
      i = 1,
      length = args.length,
      options,
      name,
      src,
      copy,
      clone;
  
    if (length === 1) {
      target = this;
      i = 0;
    }
  
    for (; i < length; i++) {
      options = args[i];
      if (!options) continue;
  
      for (name in options) {
        src = target[name];
        copy = options[name];
  
        if (target === copy) continue;
        if (copy === undefined) continue;
  
        if (Util.isArray(copy) || Util.isObject(copy)) {
          if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
          if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};
  
          target[name] = Util.extend(clone, copy);
        } else {
          target[name] = copy;
        }
      }
    }
  
    return target;
  };
  
  Util.each = function each(obj: any, iterator: Function, context?: any) {
    let i: number, key: string;
    if (Util.type(obj) === "number") {
      for (i = 0; i < obj; i++) {
        iterator(i, i);
      }
    } else if (obj.length === +obj.length) {
      for (i = 0; i < obj.length; i++) {
        if (iterator.call(context, obj[i], i, obj) === false) break;
      }
    } else {
      for (key in obj) {
        if (iterator.call(context, obj[key], key, obj) === false) break;
      }
    }
  };
  
  Util.type = function type(obj: any) {
    return obj === null || obj === undefined
      ? String(obj)
      : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
  };
  
  Util.each("String Object Array RegExp Function".split(" "), function (value: string) {
    Util["is" + value] = function (obj: any) {
      return Util.type(obj) === value.toLowerCase();
    };
  });
  
  Util.isObjectOrArray = function (value: any) {
    return Util.isObject(value) || Util.isArray(value);
  };
  
  Util.isNumeric = function (value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  
  Util.keys = function (obj: any) {
    const keys: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) keys.push(key);
    }
    return keys;
  };
  
  Util.values = function (obj: any) {
    const values: any[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) values.push(obj[key]);
    }
    return values;
  };
  
  Util.heredoc = function heredoc(fn: Function) {
    // 1. 移除起始的 function(){ /*!
    // 2. 移除末尾的 */ }
    // 3. 移除起始和末尾的空格
    return fn
      .toString()
      .replace(/^[^/]+\/\*!?/, "")
      .replace(/\*\/[^/]+$/, "")
      .replace(/^[\s\xA0]+/, "")
      .replace(/[\s\xA0]+$/, ""); // .trim()
  };
  
  Util.noop = function () {};
  
  export default Util;
  