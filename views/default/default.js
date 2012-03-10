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
    var href = $(this).find('a').eq(0).attr('href'),
        _href = href;
    _href = _href.substring(_href.lastIndexOf('.') + 1);
    if (/(png|jpg|jpeg|bmp|gif|ico)$/gi.test(_href) === true) {
        $prviewObj.show();
        $prviewObj.find('img').eq(0).attr('src', href);
    }
}, function () {
    $prviewObj.hide();
});