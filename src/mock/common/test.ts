import Constant from './constant';
import Util from './util';
import Parser from './parser';
import Random from '../random';
import RE from '../regexp';

interface Context {
  path: string[];
  templatePath: string[];
  currentContext: any;
  templateCurrentContext: any;
  root: any;
  templateRoot: any;
}

interface HandlerFunc {
  (options: {
    type: string;
    template: any;
    name: string;
    parsedName: string;
    rule: any;
    context: Context;
  }): any;
}

interface Handler {
  [key: string]: HandlerFunc;
  extend: typeof Util.extend;
  gen(template: any, name?: string, context?: Context): any;
}

class HandlerClass {
  static extend = Util.extend;

  static gen(template: any, name?: string, context?: Context): any {
    name = name == undefined ? '' : (name + '');

    context = context || {} as Context;
    context = {
      path: context.path || [Constant.GUID],
      templatePath: context.templatePath || [Constant.GUID++],
      currentContext: context.currentContext,
      templateCurrentContext: context.templateCurrentContext || template,
      root: context.root || context.currentContext,
      templateRoot: context.templateRoot || context.templateCurrentContext || template
    };

    const rule = Parser.parse(name);
    const type = Util.type(template);
    let data: any;

    if (HandlerClass[type]) {
      data = HandlerClass[type]({
        type,
        template,
        name,
        parsedName: name ? name.replace(Constant.RE_KEY, '$1') : name,
        rule,
        context
      });

      if (!context.root) {
        context.root = data;
      }

      return data;
    }

    return template;
  }
}

const Handler: Handler = HandlerClass;

export default Handler;
