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
    path = require('path'),
    mime = require('./mime');
exports.init = function (req, res) {
    var root = route.maps[req.headers.host];
    root += (req.url);
    var extname = path.extname(root);
    extname = extname !== '' ? extname.substring(1, extname.length) : '';
    root = decodeURIComponent(root);
    console.log('root:\t' + root);
    if (path.existsSync(root)) {
        fs.stat(root, function (err, stats) {
                //如果是目录，则读取目录的所有文件
                if (stats.isDirectory()) {
                    fs.readdir(root, function (err, files) {
                            res.writeHead(200, {'Content-type':'text/html; charset="utf-8"'});
                            var _path = (req.url === '/' ? '' : req.url),
                                data = {
                                    list:[]
                                };
                            files.forEach(function (item, i) {
                                try {
                                    var _stats = fs.statSync(root + '/' + item);
                                    data.list.push({
                                        href:_path + '/' + encodeURIComponent(item),
                                        text:'【' + (_stats.isDirectory() ? 'DIR' : 'File') + '】' + item,
                                        isDirecotory:_stats.isDirectory()
                                    });
                                } catch (e) {
                                    console.log('Error:' + item);
                                }
                            });
                            //在数组最前端，增加一个元素，用以返回上一层目录
                            data.list.unshift({
                                href:path.normalize(_path + '/..'),
                                text:"返回上一级目录"
                            });
                            //设置页面标题
                            data['pageTitle'] = decodeURIComponent(path.normalize(_path));
                            //设置样式
                            data['defaultCSS'] = fs.readFileSync('./views/default.css');
                            data['defaultJS'] = fs.readFileSync('./views/default.js');
                            var fn = jade.compile(fs.readFileSync('./views/main-content.jade'));
                            res.end(fn(data));
                        }
                    )

                }
                //如果是文件则读取文件内容
                else
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
                } else {
                    res.writeHead(200, {'Content-type':'text/plain"'});
                    res.end('unsupport type of file.');
                }

            }
        )
    }
    else {
        res.writeHead(404, {'Content-type':'text/html; charset="utf-8"'});
        res.end('<h1>404!</h1><p><font color="red">' + root + '</font> not exist on the system!</p>');
    }
}
;
