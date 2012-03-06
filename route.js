/**
 * Created by JetBrains PhpStorm.
 * User: hemin
 * Date: 12-2-18
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */

"use strict";


exports.config = {
    'localhost':{
        'layout':'layout.jade',
        'cssLink':['default/default', 'default/default2'],
        'jsLink':['default/default']
    },
    'local.com':{}
};


var os = require('os'),
    isWin = /(Windows)/i.test(os.type()),
    isUnix = /(Darwin|Linux)/i.test(os.type());

if (isUnix) {
    exports.config.localhost.path = '/Users';
    exports.config['local.com'].path = __dirname + '/views';
} else if (isWin) {
    exports.config.localhost.path = 'C:\\';
    exports.config['local.com'].path = __dirname + '\\views';

} else {
    console.log('without the support of the operation system');
}