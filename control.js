/**
 * Created by JetBrains PhpStorm.
 * User: hemin
 * Date: 12-2-18
 * Time: 13:53
 * To change this template use File | Settings | File Templates.
 */

"use strict";
var route = require('./route'),
    fs = require('fs'),
    jade = require('jade'),
    path = require('path');

exports.init = function (req, res) {
    res.writeHead(200, {'Content-type':'text/html; charset="utf-8"'});
    var root = route.maps[req.headers.host];
    if (root !== undefined) {
        root = root + decodeURIComponent(req.url.replace(/\//g, '\\'));
        if (path.existsSync(root))
            fs.readdir(root, function (err, files) {
                if (err) throw err;
                var obj = {
                    'fileList':files
                };
                obj['pageTitle'] = root;
                var fn = jade.compile(fs.readFileSync('./views/main-content.jade'));
                res.write(fn(obj));
                res.end();
            });
    } else {
        console.log('deny');
    }
};
