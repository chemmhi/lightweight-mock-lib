export type TemplateType<T> = {
    [key: string]: T;
}

export type ContentOptionType = {
    // 属性值类型
    type: string;
    // 属性值模板
    template: TemplateType<any>;
    // 属性名 + 生成规则
    name: string;
    // 属性名
    parsedName: string;

    // 解析后的生成规则
    rule: any;
    // 相关上下文
    context: any;
}

export type ContextType = {
    path: any;
    templatePath: any;
    // 最终属性值的上下文
    currentContext: TemplateType<any>;
    // 属性值模板的上下文
    templateCurrentContext: TemplateType<any>;
    // 最终值的根
    root: TemplateType<any>;
    // 模板的根
    templateRoot: TemplateType<any>;
}