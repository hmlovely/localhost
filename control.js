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
    // jade = require('jade'),
    path = require('path'),
    mime = require('./mime');

exports.init = function (req, res) {
    var root = route.maps[req.headers.host];
    root += decodeURIComponent(req.url.replace(/\//gi, '/'));
    var extname = path.extname(root);
    extname = extname !== '' ? extname.substring(1, extname.length) : '';
    if (path.existsSync(root)) {
        fs.stat(root, function (err, stats) {
            //如果是目录，则读取目录的所有文件
            if (stats.isDirectory()) {
                fs.readdir(root, function (err, files) {
                    res.writeHead(200, {'Content-type':'text/html; charset="utf-8"'});
                    if (files.length > 0) {
                        res.write('<ul>');
                        files.forEach(function (item) {
                            res.write('<li><a href="' + (req.url === '/' ? '' : req.url) + '/' + item + '">' + item + '</a></li>');
                        })
                        res.write('</ul>');
                        res.end();
                    } else {
                        res.end('<font color="red">' + root + '</font>' + ' is empty!');
                    }
                })

            }
            //if是文件则读取文件内容
            if (stats.isFile()) {
                fs.readFile(root, function (err, data) {
                    if (!err) {
                        console.log(mime.maps[extname] ? mime.maps[extname] : 'object/stream')
                        res.writeHead(200, {'Content-Type':mime.maps[extname] ? mime.maps[extname] : 'object/stream'})
                        res.end(data);
                    } else {
                        res.end(err.toString());
                    }
                });
            }

        })
    } else {
        res.writeHead(404, {'Content-type':'text/html; charset="utf-8"'});
        res.end('<h1>404!</h1><p><font color="red">' + root + '</font> not exist on the system!</p>');
    }
};


/*var obj = {
 'fileList':files
 };
 obj['pageTitle'] = root;
 var fn = jade.compile(fs.readFileSync('./views/main-content.jade'));*/