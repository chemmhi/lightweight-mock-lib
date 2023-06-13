/*
    ## Mock.Random
    
    工具类，用于生成各种随机数据。
*/

import Util from '../common/util';
import { Basic } from './basic';
import { Date } from './date';
import { Image } from './image';
import { Color } from './color';
import { Text } from './text';
import { Name } from './name';
import { Web } from './web';
import { Address } from './address';
import { Helper } from './helper';
import { Misc } from './misc';

interface Random extends Basic, Date, Image, Color, Text, Name, Web, Address, Helper, Misc {
  extend: typeof Util.extend;
}

const Random: Random = {
  extend: Util.extend,
  ...Basic,
  ...Date,
  ...Image,
  ...Color,
  ...Text,
  ...Name,
  ...Web,
  ...Address,
  ...Helper,
  ...Misc,
};

export default Random;
