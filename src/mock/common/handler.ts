/* 
    ## handler

    处理数据模板。
    
    * handler.gen( template, name?, context? )

        入口方法。

    * Data Template Definition, DTD
        
        处理数据模板定义。

        * handler.array( options )
        * handler.object( options )
        * handler.number( options )
        * handler.boolean( options )
        * handler.string( options )
        * handler.function( options )
        * handler.regexp( options )
        
        处理路径（相对和绝对）。

        * handler.getValueByKeyPath( key, options )

    * Data Placeholder Definition, DPD

        处理数据占位符定义

        * handler.placeholder( placeholder, context, templateContext, options )

*/

import Constant from './constant';
import Util from './util';
import Parser from './parser';
import Random from '../random';
import type { TemplateType, ContentOptionType, ContextType } from './type'

interface Handler {
    extend: (obj: any) => any,
    gen: (template: TemplateType<any>, name?: string, context?: ContextType) => TemplateType<any>,
};

const handler: Handler = {
    extend: Util.extend,

    gen(template, name, context) {
        name = name == undefined ? '' : (name + '')
        context = context || {} as ContextType;

        context = {
            // 当前访问路径，只有属性名，不包括生成规则
            path: context.path || [Constant.GUID],
            templatePath: context.templatePath || [Constant.GUID++],
            // 最终属性值的上下文
            currentContext: context.currentContext,
            // 属性值模板的上下文
            templateCurrentContext: context.templateCurrentContext || template,
            // 最终值的根
            root: context.root || context.currentContext,
            // 模板的根
            templateRoot: context.templateRoot || context.templateCurrentContext || template
        }
        // console.log('path:', context.path.join('.'), template)

        let rule = Parser.parse()
        let type = Util.type(template);
        let data

        // @ts-ignore
        if (handler[type]) {
            // @ts-ignore
            data = handler[type]({
                // 属性值类型
                type: type,
                // 属性值模板
                template: template,
                // 属性名 + 生成规则
                name: '',
                // 属性名
                parsedName: '',

                // 解析后的生成规则
                rule: rule,
                // 相关上下文
                context: context
            })

            if (!context.root) context.root = data
            return data
        }

        return template
    },
}

/*
    template        属性值（即数据模板）
    name            属性名
    context         数据上下文，生成后的数据
    templateContext 模板上下文，

    Handle.gen(template, name, options)
    context
        currentContext, templateCurrentContext, 
        path, templatePath
        root, templateRoot
*/


handler.extend({
    array: function (options: ContentOptionType) {
        let result: string[] = [],
            i, ii;

        // 'name|1': []
        // 'name|count': []
        // 'name|min-max': []
        if (options.template['length'] === 0) return result

        // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
        if (!options.rule.parameters) {
            for (i = 0; i < options.template['length']; i++) {
                options.context.path.push(i)
                options.context.templatePath.push(i)
                result.push(
                    // @ts-ignore
                    handler.gen(options.template[i], i, {
                        path: options.context.path,
                        templatePath: options.context.templatePath,
                        currentContext: result,
                        templateCurrentContext: options.template,
                        root: options.context.root || result,
                        templateRoot: options.context.templateRoot || options.template
                    })
                )
                options.context.path.pop()
                options.context.templatePath.pop()
            }
        } else {
            // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
            if (options.rule.min === 1 && options.rule.max === undefined) {
                // fix #17
                options.context.path.push(options.name)
                options.context.templatePath.push(options.name)
                // @ts-ignore
                result = Random.pick(
                    handler.gen(options.template, undefined, {
                        path: options.context.path,
                        templatePath: options.context.templatePath,
                        currentContext: result,
                        templateCurrentContext: options.template,
                        root: options.context.root || result,
                        templateRoot: options.context.templateRoot || options.template
                    })
                )
                options.context.path.pop()
                options.context.templatePath.pop()
            } else {
                // 'data|+1': [{}, {}]
                if (options.rule.parameters[2]) {
                    options.template['__order_index'] = options.template['__order_index'] || 0

                    options.context.path.push(options.name)
                    options.context.templatePath.push(options.name)
                    result = handler.gen(options.template, undefined, {
                        path: options.context.path,
                        templatePath: options.context.templatePath,
                        currentContext: result,
                        templateCurrentContext: options.template,
                        root: options.context.root || result,
                        templateRoot: options.context.templateRoot || options.template
                    })[
                        options.template['__order_index'] % options.template['length']
                    ]

                    options.template['__order_index'] += +options.rule.parameters[2]

                    options.context.path.pop()
                    options.context.templatePath.pop()

                } else {
                    // 'data|1-10': [{}]
                    for (i = 0; i < options.rule.count; i++) {
                        // 'data|1-10': [{}, {}]
                        for (ii = 0; ii < options.template['length']; ii++) {
                            options.context.path.push(result.length)
                            options.context.templatePath.push(ii)
                            result.push(
                                // @ts-ignore
                                handler.gen(options.template[ii], result.length, {
                                    path: options.context.path,
                                    templatePath: options.context.templatePath,
                                    currentContext: result,
                                    templateCurrentContext: options.template,
                                    root: options.context.root || result,
                                    templateRoot: options.context.templateRoot || options.template
                                })
                            )
                            options.context.path.pop()
                            options.context.templatePath.pop()
                        }
                    }
                }
            }
        }
        return result
    },

    object: function (options: ContentOptionType) {
        let result = {},
            keys: string[], fnKeys: string[], key: string, parsedKey: string, inc, i;

        // 'obj|min-max': {}
        if (options.rule.min != undefined) {
            keys = Util.keys(options.template)
            // @ts-ignore
            keys = Random.shuffle(keys)
            keys = keys.slice(0, options.rule.count)
            for (i = 0; i < keys.length; i++) {
                key = keys[i] as string;
                parsedKey = key.replace(Constant.RE_KEY, '$1')
                options.context.path.push(parsedKey)
                options.context.templatePath.push(key)
                // @ts-ignore
                result[parsedKey] = handler.gen(options.template[key], key, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                })
                options.context.path.pop()
                options.context.templatePath.pop()
            }

        } else {
            // 'obj': {}
            keys = []
            fnKeys = [] // #25 改变了非函数属性的顺序，查找起来不方便
            for (key in options.template) {
                (typeof options.template[key] === 'function' ? fnKeys : keys).push(key)
            }
            keys = keys.concat(fnKeys)

            /*
                会改变非函数属性的顺序
                keys = Util.keys(options.template)
                keys.sort(function(a, b) {
                    let afn = typeof options.template[a] === 'function'
                    let bfn = typeof options.template[b] === 'function'
                    if (afn === bfn) return 0
                    if (afn && !bfn) return 1
                    if (!afn && bfn) return -1
                })
            */

            for (i = 0; i < keys.length; i++) {
                key = keys[i] as string;
                parsedKey = key.replace(Constant.RE_KEY, '$1')
                options.context.path.push(parsedKey)
                options.context.templatePath.push(key)
                // @ts-ignore
                result[parsedKey] = handler.gen(options.template[key], key, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                })
                options.context.path.pop()
                options.context.templatePath.pop()
                // 'id|+1': 1
                inc = key.match(Constant.RE_KEY)
                if (inc && inc[2] && Util.type(options.template[key]) === 'number') {
                    options.template[key] += parseInt(inc[2], 10)
                }
            }
        }
        return result
    },
    number: function (options: ContentOptionType) {
        let result, parts;
        if (options.rule.decimal) { // float
            // @ts-ignore
            options.template += ''
            parts = options.template['split']('.')
            // 'float1|.1-10': 10,
            // 'float2|1-100.1-10': 1,
            // 'float3|999.1-10': 1,
            // 'float4|.3-10': 123.123,
            parts[0] = options.rule.range ? options.rule.count : parts[0]
            parts[1] = (parts[1] || '').slice(0, options.rule.dcount)
            while (parts[1].length < options.rule.dcount) {
                parts[1] += (
                    // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
                    // @ts-ignore
                    (parts[1].length < options.rule.dcount - 1) ? Random.character('number') : Random.character('123456789')
                )
            }
            
            // @ts-ignore
            result = parseFloat(parts.join('.'), 10)
        } else { // integer
            // 'grade1|1-100': 1,
            result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template
        }
        return result
    },
    boolean: function (options: ContentOptionType) {
        let result;
        // 'prop|multiple': false, 当前值是相反值的概率倍数
        // 'prop|probability-probability': false, 当前值与相反值的概率
        // @ts-ignore
        result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template
        return result
    },
    string: function (options: ContentOptionType) {
        let result = '',
            i, placeholders, ph, phed;
        if (options.template['length']) {

            //  'foo': '★',
            if (options.rule.count == undefined) {
                result += options.template
            }

            // 'star|1-5': '★',
            for (i = 0; i < options.rule.count; i++) {
                result += options.template
            }
            // 'email|1-10': '@EMAIL, ',
            placeholders = result.match(Constant.RE_PLACEHOLDER) || [] // A-Z_0-9 > \w_
            for (i = 0; i < placeholders.length; i++) {
                ph = placeholders[i]

                // 遇到转义斜杠，不需要解析占位符
                if (/^\\/.test(ph as string)) {
                    placeholders.splice(i--, 1)
                    continue
                }
                // @ts-ignore
                phed = handler.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext, options)

                // 只有一个占位符，并且没有其他字符
                if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) { // 
                    result = phed
                    break
                }
                result = result.replace(ph as string, phed)
            }

        } else {
            // 'ASCII|1-10': '',
            // 'ASCII': '',
            // @ts-ignore
            result = options.rule.range ? Random.string(options.rule.count) : options.template
        }
        return result
    },
})

handler.extend({
    _all: function () {
        let re = {};
        // @ts-ignore
        for (let key in Random) re[key.toLowerCase()] = key
        return re
    },
    // 处理占位符，转换为最终值
    // @ts-ignore
    placeholder: function (placeholder: string, obj, templateContext, options) {
        // console.log(options.context.path)
        // 1 key, 2 params
        Constant.RE_PLACEHOLDER.exec('')
        let parts = Constant.RE_PLACEHOLDER.exec(placeholder),
            key = parts && parts[1],
            lkey = key && key.toLowerCase(),
            okey = this._all()[lkey as string],
            params = parts && parts[2] || ''
        let pathParts = this.splitPathToArray(key)

        // 解析占位符的参数
        try {
            // 1. 尝试保持参数的类型
            params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + params + ')')
        } catch (error) {
            // 2. 如果失败，只能解析为字符串
            // console.error(error)
            // if (error instanceof ReferenceError) params = parts[2].split(/,\s*/);
            // else throw error
            // @ts-ignore
            params = parts[2].split(/,\s*/)
        }

        // 占位符优先引用数据模板中的属性
        if (obj && (key as string in obj)) return obj[key as string]

        // @index @key
        // if (Constant.RE_INDEX.test(key)) return +options.name
        // if (Constant.RE_KEY.test(key)) return options.name

        // 绝对路径 or 相对路径
        if (
            (key as string).charAt(0) === '/' ||
            pathParts.length > 1
        ) return this.getValueByKeyPath(key, options)

        // 递归引用数据模板中的属性
        if (templateContext &&
            (typeof templateContext === 'object') &&
            ((key as string) in templateContext) &&
            (placeholder !== templateContext[(key as string)]) // fix #15 避免自己依赖自己
        ) {
            // 先计算被引用的属性值
            // @ts-ignore
            templateContext[key] = handler.gen(templateContext[key], key, {
                currentContext: obj,
                templateCurrentContext: templateContext
            })
            return templateContext[(key as string)]
        }

        // 如果未找到，则原样返回
        if (!((key as string) in Random) && !(lkey as string in Random) && !(okey in Random)) return placeholder

        // 递归解析参数中的占位符
        for (let i = 0; i < params.length; i++) {
            Constant.RE_PLACEHOLDER.exec('')
            if (Constant.RE_PLACEHOLDER.test(params[i] as string)) {
                // @ts-ignore
                params[i] = handler.placeholder(params[i], obj, templateContext, options)
            }
        }

        // @ts-ignore
        let handle = Random[key] || Random[lkey] || Random[okey]
        switch (Util.type(handle)) {
            case 'array':
                // 自动从数组中取一个，例如 @areas
                // @ts-ignore
                return Random.pick(handle)
            case 'function':
                // 执行占位符方法（大多数情况）
                handle.options = options
                let re = handle.apply(Random, params)
                if (re === undefined) re = '' // 因为是在字符串中，所以默认为空字符串。
                delete handle.options
                return re
        }
    },
    getValueByKeyPath: function (key: string, options: ContentOptionType) {
        let originalKey = key
        let keyPathParts = this.splitPathToArray(key)
        let absolutePathParts = []

        // 绝对路径
        if (key.charAt(0) === '/') {
            absolutePathParts = [options.context.path[0]].concat(
                this.normalizePath(keyPathParts)
            )
        } else {
            // 相对路径
            if (keyPathParts.length > 1) {
                absolutePathParts = options.context.path.slice(0)
                absolutePathParts.pop()
                absolutePathParts = this.normalizePath(
                    absolutePathParts.concat(keyPathParts)
                )

            }
        }

        try {
            key = keyPathParts[keyPathParts.length - 1]
            let currentContext = options.context.root
            let templateCurrentContext = options.context.templateRoot
            for (let i = 1; i < absolutePathParts.length - 1; i++) {
                currentContext = currentContext[absolutePathParts[i]]
                templateCurrentContext = templateCurrentContext[absolutePathParts[i]]
            }
            // 引用的值已经计算好
            if (currentContext && (key in currentContext)) return currentContext[key]

            // 尚未计算，递归引用数据模板中的属性
            if (templateCurrentContext &&
                (typeof templateCurrentContext === 'object') &&
                (key in templateCurrentContext) &&
                (originalKey !== templateCurrentContext[key]) // fix #15 避免自己依赖自己
            ) {
                // 先计算被引用的属性值
                // @ts-ignore
                templateCurrentContext[key] = handler.gen(templateCurrentContext[key], key, {
                    currentContext: currentContext,
                    templateCurrentContext: templateCurrentContext
                })
                return templateCurrentContext[key]
            }
        } catch (err) { }

        return '@' + keyPathParts.join('/')
    },

    normalizePath: function (pathParts: string[]) {
        let newPathParts = []
        for (let i = 0; i < pathParts.length; i++) {
            switch (pathParts[i]) {
                case '..':
                    newPathParts.pop()
                    break
                case '.':
                    break
                default:
                    newPathParts.push(pathParts[i])
            }
        }
        return newPathParts
    },
    splitPathToArray: function (path: string): string[] {
        let parts = path.split(/\/+/);
        if (!parts[parts.length - 1]) parts = parts.slice(0, -1)
        if (!parts[0]) parts = parts.slice(1)
        return parts;
    }
})

export default handler