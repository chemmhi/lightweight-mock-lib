export default  {
  // 随机生成一个 URL。
  url(protocol?: string, host?: string): string {
    // @ts-ignore
    return `${protocol || this.protocol()}://${host || this.domain()}/${this.word()}`;
  },
  // 随机生成一个 URL 协议。
  protocol(): string {
    // @ts-ignore
    return this.pick([
      // 协议簇
      'http', 'ftp', 'gopher', 'mailto', 'mid', 'cid', 'news', 'nntp', 'prospero', 'telnet', 'rlogin', 'tn3270', 'wais'
    ]);
  },
  // 随机生成一个域名。
  domain(tld?: string): string {
    // @ts-ignore
    return `${this.word()}.${tld || this.tld()}`;
  },
  // 随机生成一个顶级域名。
  tld(): string {
    // @ts-ignore
    return this.pick([
      // 域名后缀
      'com', 'net', 'org', 'edu', 'gov', 'int', 'mil', 'cn',
      // 国内域名
      'com.cn', 'net.cn', 'gov.cn', 'org.cn',
      // 中文国内域名
      '中国', '中国互联.公司', '中国互联.网络',
      // 新国际域名
      'tel', 'biz', 'cc', 'tv', 'info', 'name', 'hk', 'mobi', 'asia', 'cd', 'travel', 'pro', 'museum', 'coop', 'aero',
      // 世界各国域名后缀
      'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bm', 'bn', 'bo', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'co', 'cq', 'cr', 'cu', 'cv', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'es', 'et', 'ev', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gr', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'in', 'io', 'iq', 'ir', 'is', 'it', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'mg', 'mh', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nt', 'nu', 'nz', 'om', 'qa', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pt', 'pw', 'py', 're', 'ro', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'st', 'su', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tm', 'tn', 'to', 'tp', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'us', 'uy', 'va', 'vc', 've', 'vg', 'vn', 'vu', 'wf', 'ws', 'ye', 'yu', 'za', 'zm', 'zr', 'zw'
    ]);
  },
  // 随机生成一个邮件地址。
  email(domain?: string): string {
    // @ts-ignore
    return `${this.character('lower')}.${this.word()}@${domain || `${this.word()}.${this.tld()}`}`;
  },
  // 随机生成一个 IP 地址。
  ip(): string {
    // @ts-ignore
    return `${this.natural(0, 255)}.${this.natural(0, 255)}.${this.natural(0, 255)}.${this.natural(0, 255)}`;
  }
};
