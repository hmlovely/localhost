/**
 * Created by JetBrains PhpStorm.
 * User: hemin
 * Date: 12-2-18
 * Time: 13:38
 *
 */

"use strict";

var http = require('http');
var server = http.createServer(function (req, res) {
    require('./control').init(req, res);
});

server.listen(80);
