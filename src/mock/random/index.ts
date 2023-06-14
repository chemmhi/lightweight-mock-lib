/*
    ## random
    
    工具类，用于生成各种随机数据。
*/

import util from '../common/util';
import basics from './basic';
import Date from './date';
import Text from './text';
import Name from './name';
import Web from './web';
import Address from './address';
import Helper from './helper';
import Misc from './misc';

const random = {
  extend: util.extend
};

random.extend(basics)
random.extend(Date)
random.extend(Text)
random.extend(Name)
random.extend(Web)
random.extend(Address)
random.extend(Helper)
random.extend(Misc)

export default random;
