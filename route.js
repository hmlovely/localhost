/**
 * Created by JetBrains PhpStorm.
 * User: hemin
 * Date: 12-2-18
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */

"use strict";


exports.maps = {
    "hm":"F:\\",
    "localh2ost":"C:\\",
    "localh3ost":"C:\\",
    "localho4st":"C:\\",
    "local.com":__dirname + "\\views"
};


var os = require('os'),
    isWin = /(Windows)/i.test(os.type()),
    isUnix = /(Darwin|Linux)/i.test(os.type());

if (isUnix) {
    exports.maps.localhost = '/Users';
} else if (isWin) {
    exports.maps.localhost = 'C:\\';
} else {
    console.log('without the support of the operation system');
}