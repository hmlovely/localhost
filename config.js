/**
 * Created by JetBrains PhpStorm.
 * User: hemin
 * Date: 12-2-18
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */

"use strict";

exports.config = {
    'localhost':{},
    'local':{},
    'currentView':'default',
    'views':{
        "default":{
            'title':'默认主题',
            'cssLink':['default/default', 'default/default2'],
            'jsLink':['default/default']
        },
        'green':{
            'title':'绿色心情',
            'cssLink':['green/green'],
            'jsLink':['green/green']
        },
        'pink':{
            'title':'pink',
            'cssLink':['pink/pink'],
            'jsLink':['pink/pink']
        }
    }
};


var os = require('os'),
    isWin = /(Windows)/i.test(os.type()),
    isUnix = /(Darwin|Linux)/i.test(os.type());

if (isUnix) {
    exports.config.localhost.path = '/Users';
    exports.config['local'].path = __dirname + '/views';
} else if (isWin) {
    exports.config.localhost.path = __dirname.substring(0, 2);
    exports.config['local'].path = __dirname + '\\views';

} else {
    console.log('without the support of the operation system');
}