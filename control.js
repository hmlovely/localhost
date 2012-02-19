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
    path = require('path');

exports.init = function (req, res) {
    var root = route.maps[req.headers.host];
    root = root + decodeURIComponent(req.url.replace(/\//gi, '/'));
    console.log('req.url:' + req.url);
    var extname = path.extname(root);

    console.log('extname' + extname);
    if (path.existsSync(root)) {
        fs.readdir(root, function (err, files) {
            if (!err) {
                res.writeHead(200, {'Content-type':'text/html; charset="utf-8"'});
                res.write('<ul>');
                files.forEach(function (item) {
                    res.write('<li><a href="' + (req.url === '/' ? '' : req.url) + '/' + item + '">' + item + '</a></li>');
                })
                res.write('</ul>');
                res.end();
            } else {
                fs.readFile(root, function (err, data) {

                    if (!err) {
                        switch (extname.substring(1, extname.length)) {
                            case "png":
                                res.writeHead(200, {'Content-type':'image/png;"'});
                                break;
                            case "jpg":
                                res.writeHead(200, {'Content-type':'image/jpeg;"'});
                                break;
                            case "html":
                                res.writeHead(200, {'Content-type':'text/html; charset="utf-8"'});
                                break;
                            case "js":
                                res.writeHead(200, {'Content-type':'text/javascript; charset="utf-8"'});
                                break;
                            case "css":
                                res.writeHead(200, {'Content-type':'text/css; charset="utf-8"'});
                                break;
                            case "xml":
                                res.writeHead(200, {'Content-type':'text/xml; charset="utf-8"'});
                                break;
                            case "gif":
                                res.writeHead(200, {'Content-type':'image/gif;'});
                                break;
                            case "txt":
                                res.writeHead(200, {'Content-type':'text/plain; charset="utf-8"'});
                                break;
                            case "htm":
                                res.writeHead(200, {'Content-type':'text/html; charset="utf-8"'});
                                break;
                            default:
                                res.writeHead(200, {'Content-type':'object/stram; charset="utf-8"'});
                                break;
                        }
                        console.log('It\'s saved!');
                        res.end(data);
                    } else {
                        res.end('not exist!');

                    }
                });
            }
            /*var obj = {
             'fileList':files
             };
             obj['pageTitle'] = root;
             var fn = jade.compile(fs.readFileSync('./views/main-content.jade'));*/

        });
    } else {
        res.end(root + 'not exist!');
    }
};
