/**
 * Created by JetBrains WebStorm.
 * User: songsong
 * Date: 12-3-6
 * Time: 下午8:57
 * To change this template use File | Settings | File Templates.
 */




/*
 $(document.body).append('<p style="text-align: center; background: #eee;" id="testContainer">此内容来自global.js中！</p>');
 $('#testContainer').css('opacity', '0').animate({
 padding:'20px',
 'margin-top':'40px',
 opacity:1
 }, 300);
 */

/*改变配置信息*/
$('#switch-views').bind('change', function () {
    $.post('modifyConfig', {currentView:this.value}, function () {
        window.location.reload();
    }, 'json')
});


$('span.del').click(function () {
    $this = $(this);
    $.post('delete', {
        'files':$this.parent('li').find('>div.word>a').attr('href')
    }, function (data) {
        $this.parent('li').remove();
    }, 'text');
    return false;
});


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


//排序，按时间和大小
 var modSort = function (id, tag, prop) {
     this.box = document.getElementById(id);
     this.tag = tag;
     this.arr = this.box.getElementsByTagName(this.tag);
     this.prop = prop;
     this.init();
 };

 modSort.prototype = {
     init:function () {
         var _this = this, len = _this.arr.length, temp = 0,temp1 = 0, nums = [],sort = [];
         for (var i = 0; i < len; i++) {
             nums.push(new Date(_this.arr[i].getAttribute(_this.prop)));
             sort.push(i);
         }
         for (var i = 0; i < len; i++) {
             for (var j = 0; j < len - 1; j++) {
                 if (nums[j].getTime() > nums[j + 1].getTime()) {
                     temp = nums[j];
                     nums[j] = nums[j + 1];
                     nums[j + 1] = temp;

                     temp1 = sort[j];
                     sort[j] = sort[j + 1];
                     sort[j + 1] = temp1;
                 }
             }
         }
         for (var i = 0; i < len; i++) {
             for(var j = 0; j < len; j++){
                 if (nums[i].getTime() == new Date(_this.arr[j].getAttribute(_this.prop)).getTime()) {
                      _this.box.insertBefore(_this.arr[sort[i]],_this.arr[i]);
                  }
             }
             //_this.box.insertBefore(_this.arr[i],_this.arr[sort[i] + 1]);
         }
     }
 }
var _list = document.getElementById("list-sort");
_list.onchange = function () {
    //console.log(this.value);
    new modSort("sort-ul", "li", "time");
}


//瀑布流展示
//平铺
