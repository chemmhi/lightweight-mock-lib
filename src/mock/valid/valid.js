
var Constant = require('../common/constant')
var Util = require('../common/util')
var toJSONSchema = require('../schema')

function valid(template, data) {
    var schema = toJSONSchema(template)
    var result = Diff.diff(schema, data)
    for (var i = 0; i < result.length; i++) {
        // console.log(template, data)
        // console.warn(Assert.message(result[i]))
    }
    return result
}


var Diff = {
    diff: function diff(schema, data, name /* Internal Use Only */ ) {
        var result = []

        // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
        if (
            this.name(schema, data, name, result) &&
            this.type(schema, data, name, result)
        ) {
            this.value(schema, data, name, result)
            this.properties(schema, data, name, result)
            this.items(schema, data, name, result)
        }

        return result
    },
    /* jshint unused:false */
    name: function(schema, data, name, result) {
        var length = result.length

        Assert.equal('name', schema.path, name + '', schema.name + '', result)

        return result.length === length
    },
    type: function(schema, data, name, result) {
        var length = result.length

        switch (schema.type) {
            case 'string':
                // 跳过含有『占位符』的属性值，因为『占位符』返回值的类型可能和模板不一致，例如 '@int' 会返回一个整形值
                if (schema.template.match(Constant.RE_PLACEHOLDER)) return true
                break
            case 'array':
                if (schema.rule.parameters) {
                    // name|count: array
                    if (schema.rule.min !== undefined && schema.rule.max === undefined) {
                        // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
                        if (schema.rule.count === 1) return true
                    }
                    // 跳过 name|+inc: array
                    if (schema.rule.parameters[2]) return true
                }
                break
            case 'function':
                // 跳过 `'name': function`，因为函数可以返回任何类型的值。
                return true
        }

        Assert.equal('type', schema.path, Util.type(data), schema.type, result)

        return result.length === length
    },
    value: function(schema, data, name, result) {
        var length = result.length

        var rule = schema.rule
        var templateType = schema.type
        if (templateType === 'object' || templateType === 'array' || templateType === 'function') return true

        // 无生成规则
        if (!rule.parameters) {
            switch (templateType) {
                case 'regexp':
                    Assert.match('value', schema.path, data, schema.template, result)
                    return result.length === length
                case 'string':
                    // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
                    if (schema.template.match(Constant.RE_PLACEHOLDER)) return result.length === length
                    break
            }
            Assert.equal('value', schema.path, data, schema.template, result)
            return result.length === length
        }

        // 有生成规则
        var actualRepeatCount
        switch (templateType) {
            case 'number':
                var parts = (data + '').split('.')
                parts[0] = +parts[0]

                // 整数部分
                // |min-max
                if (rule.min !== undefined && rule.max !== undefined) {
                    Assert.greaterThanOrEqualTo('value', schema.path, parts[0], Math.min(rule.min, rule.max), result)
                        // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
                    Assert.lessThanOrEqualTo('value', schema.path, parts[0], Math.max(rule.min, rule.max), result)
                }
                // |count
                if (rule.min !== undefined && rule.max === undefined) {
                    Assert.equal('value', schema.path, parts[0], rule.min, result, '[value] ' + name)
                }

                // 小数部分
                if (rule.decimal) {
                    // |dmin-dmax
                    if (rule.dmin !== undefined && rule.dmax !== undefined) {
                        Assert.greaterThanOrEqualTo('value', schema.path, parts[1].length, rule.dmin, result)
                        Assert.lessThanOrEqualTo('value', schema.path, parts[1].length, rule.dmax, result)
                    }
                    // |dcount
                    if (rule.dmin !== undefined && rule.dmax === undefined) {
                        Assert.equal('value', schema.path, parts[1].length, rule.dmin, result)
                    }
                }

                break

            case 'boolean':
                break

            case 'string':
                // 'aaa'.match(/a/g)
                actualRepeatCount = data.match(new RegExp(schema.template, 'g'))
                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0

                // |min-max
                if (rule.min !== undefined && rule.max !== undefined) {
                    Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result)
                    Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result)
                }
                // |count
                if (rule.min !== undefined && rule.max === undefined) {
                    Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result)
                }

                break

            case 'regexp':
                actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'))
                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0

                // |min-max
                if (rule.min !== undefined && rule.max !== undefined) {
                    Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result)
                    Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result)
                }
                // |count
                if (rule.min !== undefined && rule.max === undefined) {
                    Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result)
                }
                break
        }

        return result.length === length
    },
    properties: function(schema, data, name, result) {
        var length = result.length

        var rule = schema.rule
        var keys = Util.keys(data)
        if (!schema.properties) return

        // 无生成规则
        if (!schema.rule.parameters) {
            Assert.equal('properties length', schema.path, keys.length, schema.properties.length, result)
        } else {
            // 有生成规则
            // |min-max
            if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('properties length', schema.path, keys.length, Math.min(rule.min, rule.max), result)
                Assert.lessThanOrEqualTo('properties length', schema.path, keys.length, Math.max(rule.min, rule.max), result)
            }
            // |count
            if (rule.min !== undefined && rule.max === undefined) {
                // |1, |>1
                if (rule.count !== 1) Assert.equal('properties length', schema.path, keys.length, rule.min, result)
            }
        }

        if (result.length !== length) return false

        for (var i = 0; i < keys.length; i++) {
            result.push.apply(
                result,
                this.diff(
                    function() {
                        var property
                        Util.each(schema.properties, function(item /*, index*/ ) {
                            if (item.name === keys[i]) property = item
                        })
                        return property || schema.properties[i]
                    }(),
                    data[keys[i]],
                    keys[i]
                )
            )
        }

        return result.length === length
    },
    items: function(schema, data, name, result) {
        var length = result.length

        if (!schema.items) return

        var rule = schema.rule

        // 无生成规则
        if (!schema.rule.parameters) {
            Assert.equal('items length', schema.path, data.length, schema.items.length, result)
        } else {
            // 有生成规则
            // |min-max
            if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('items', schema.path, data.length, (Math.min(rule.min, rule.max) * schema.items.length), result,
                    '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements')
                Assert.lessThanOrEqualTo('items', schema.path, data.length, (Math.max(rule.min, rule.max) * schema.items.length), result,
                    '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements')
            }
            // |count
            if (rule.min !== undefined && rule.max === undefined) {
                // |1, |>1
                if (rule.count === 1) return result.length === length
                else Assert.equal('items length', schema.path, data.length, (rule.min * schema.items.length), result)
            }
            // |+inc
            if (rule.parameters[2]) return result.length === length
        }

        if (result.length !== length) return false

        for (var i = 0; i < data.length; i++) {
            result.push.apply(
                result,
                this.diff(
                    schema.items[i % schema.items.length],
                    data[i],
                    i % schema.items.length
                )
            )
        }

        return result.length === length
    }
}


var Assert = {
    message: function(item) {
        return (item.message ||
                '[{utype}] Expect {path}\'{ltype} {action} {expected}, but is {actual}')
            .replace('{utype}', item.type.toUpperCase())
            .replace('{ltype}', item.type.toLowerCase())
            .replace('{path}', Util.isArray(item.path) && item.path.join('.') || item.path)
            .replace('{action}', item.action)
            .replace('{expected}', item.expected)
            .replace('{actual}', item.actual)
    },
    equal: function(type, path, actual, expected, result, message) {
        if (actual === expected) return true
        switch (type) {
            case 'type':
                // 正则模板 === 字符串最终值
                if (expected === 'regexp' && actual === 'string') return true
                break
        }

        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is equal to',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    },
    // actual matches expected
    match: function(type, path, actual, expected, result, message) {
        if (expected.test(actual)) return true

        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'matches',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    },
    notEqual: function(type, path, actual, expected, result, message) {
        if (actual !== expected) return true
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is not equal to',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    },
    greaterThan: function(type, path, actual, expected, result, message) {
        if (actual > expected) return true
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is greater than',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    },
    lessThan: function(type, path, actual, expected, result, message) {
        if (actual < expected) return true
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is less to',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    },
    greaterThanOrEqualTo: function(type, path, actual, expected, result, message) {
        if (actual >= expected) return true
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is greater than or equal to',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    },
    lessThanOrEqualTo: function(type, path, actual, expected, result, message) {
        if (actual <= expected) return true
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is less than or equal to',
            message: message
        }
        item.message = Assert.message(item)
        result.push(item)
        return false
    }
}

valid.Diff = Diff
valid.Assert = Assert

module.exports = valid