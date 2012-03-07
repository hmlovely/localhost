/**
 * Created by JetBrains WebStorm.
 * User: songsong
 * Date: 12-2-20
 * Time: 10:45
 * To change this template use File | Settings | File Templates.
 */

document.title += '--HELLO';
$(document.body).append('<p id="prview"><img src=""></p>');
$prviewObj = $('#prview');
$('li').hover(function () {
    var _src = $(this).find('a').eq(0).attr('href');
    if (/(png|jpg|jpeg|bmp|gif|ico)/i.test(_src)) {
        $prviewObj.show();
        $prviewObj.find('img').eq(0).attr('src', _src);
    }
}, function () {
    $prviewObj.hide();
});