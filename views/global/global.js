/**
 * Created by JetBrains WebStorm.
 * User: songsong
 * Date: 12-3-6
 * Time: 下午8:57
 * To change this template use File | Settings | File Templates.
 */




$(document.body).append('<p style="text-align: center; background: #eee;" id="testContainer">此内容来自global.js中！</p>');
$('#testContainer').css('opacity', '0').animate({
    padding:'20px',
    'margin-top':'40px',
    opacity:1
}, 300);