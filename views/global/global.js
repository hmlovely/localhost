//防止浏览器报错，ie6没有console
if (!window.console) {
    window.console = {
        log:function (str) {
            window.status = str;
        }
    }
}

var _host = 'http://' + window.location.host;//获取浏览器命名，就是指localhost

/*改变配置信息*/
$('#switch-views').bind('change', function () {
    $.post(_host + '/modifyConfig', {currentView:this.value}, function () {
        window.location.reload();
    }, 'json');
});

$('span.del').click(function () {
    $this = $(this);
    $.post(_host + '/delete', {
        'files':$this.parent('li').find('>div.word>a').attr('href'),
        'isdir':$this.parent('li').attr('isdir')
    }, function (data) {
        $this.parent('li').remove();
    }, 'text');
    return false;
});

//排序，按时间和大小
var modSort = function (id, tag, prop) {
    this.box = document.getElementById(id);
    this.tag = tag;
    this.arr = this.box.getElementsByTagName(this.tag);
    this.prop = prop;
};

modSort.prototype = {
    asc:function () {
        var _this = this, len = _this.arr.length, temp = 0, nums = [];
        for (var i = 0; i < len; i++) {
            nums.push(new Date(_this.arr[i].getAttribute(_this.prop)));

        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1; j++) {
                if (nums[j].getTime() > nums[j + 1].getTime()) {
                    temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len; j++) {
                if (nums[i].getTime() == new Date(_this.arr[j].getAttribute(_this.prop)).getTime()) {
                    _this.box.insertBefore(_this.arr[j], _this.arr[i]);
                }
            }
        }
    },
    desc:function () {
        var _this = this, len = _this.arr.length, temp = 0, nums = [];
        for (var i = 0; i < len; i++) {
            nums.push(new Date(_this.arr[i].getAttribute(_this.prop)));
        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1; j++) {
                if (nums[j].getTime() < nums[j + 1].getTime()) {
                    temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                }
            }
        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len; j++) {
                if (nums[i].getTime() == new Date(_this.arr[j].getAttribute(_this.prop)).getTime()) {
                    _this.box.insertBefore(_this.arr[j], _this.arr[i]);
                }
            }
        }
    },
    size_desc:function () {
        var _this = this, len = _this.arr.length, temp = 0, temp1 = 0, nums = [], index = [];
        for (var i = 0; i < len; i++) {
            nums.push(parseInt(_this.arr[i].getAttribute(_this.prop)));
            index.push(i);
        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;

                    temp1 = index[j];
                    index[j] = index[j + 1];
                    index[j + 1] = temp1;
                }
            }
        }
        var lis = [];
        for (var i = 0; i < len; i++) {
            lis.push(_this.arr[index[i]]);
        }
        for (var i = 0; i < len; i++) {
            _this.box.insertBefore(lis[i], _this.arr[0]);
        }
    },
    size_asc:function () {
        var _this = this, len = _this.arr.length, temp = 0, temp1 = 0, nums = [], index = [];
        for (var i = 0; i < len; i++) {
            nums.push(parseInt(_this.arr[i].getAttribute(_this.prop)));
            index.push(i);
        }
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1; j++) {
                if (nums[j] < nums[j + 1]) {
                    temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;

                    temp1 = index[j];
                    index[j] = index[j + 1];
                    index[j + 1] = temp1;
                }
            }
        }
        var lis = [];
        for (var i = 0; i < len; i++) {
            lis.push(_this.arr[index[i]]);
        }
        for (var i = 0; i < len; i++) {
            _this.box.insertBefore(lis[i], _this.arr[0]);
        }
    }
};

var _list = document.getElementById("list-sort");
_list.onchange = function () {
    if (this.value == "time_asc") {
        new modSort("sort-ul", "li", "time").asc();
    } else if (this.value == "time_desc") {
        new modSort("sort-ul", "li", "time").desc();
    } else if (this.value == "size_desc") {
        new modSort("sort-ul", "li", "size").size_desc();
    } else if (this.value == "size_asc") {
        new modSort("sort-ul", "li", "size").size_asc();
    }
};


(function () {
    var liObj = document.getElementById('sort-ul').getElementsByTagName('li');
    $('#key_input').bind('keydown keypress', function (ev) {
        setTimeout(function () {
            var value = $.trim(ev.target.value);
            $(liObj).each(function (index, obj) {
                var $obj = $(obj), filename = $obj.attr('filename');
                if (decodeURIComponent(filename.toLocaleLowerCase()).indexOf(decodeURIComponent(value.toLocaleLowerCase())) > -1) {
                    $obj.slideDown(200, function () {
                        if ($('#container').hasClass('water_pull')) {
                            console.log(123)
                            new Waterfall({
                                "container":"sort-ul",
                                "colWidth":235,
                                "colCount":4
                            });
                        }
                    });
                } else {
                    $obj.hide();
                }
            });
        }, 0);
    });
})();


//瀑布流展示
function Waterfall(param) {
    this.id = typeof param.container == 'string' ? document.getElementById(param.container) : param.container;
    this.colWidth = param.colWidth;
    this.colCount = param.colCount || 4;
    this.cls = param.cls && param.cls != '' ? param.cls : 'list-li';
    this.init();
}

Waterfall.prototype = {
    getByClass:function (cls, p) {
        var arr = [], reg = new RegExp("(^|\\s+)" + cls + "(\\s+|$)", "g");
        var nodes = p.getElementsByTagName("*"), len = nodes.length;
        for (var i = 0; i < len; i++) {
            if (reg.test(nodes[i].className)) {
                arr.push(nodes[i]);
                reg.lastIndex = 0;
            }
        }
        return arr;
    },
    //获取数组的最大值
    maxArr:function (arr) {
        var len = arr.length, temp = arr[0];
        for (var ii = 1; ii < len; ii++) {
            if (temp < arr[ii]) {
                temp = arr[ii];
            }
        }
        return temp;
    },
    //获取节点的margin-bottom值
    getMar:function (node) {
        var dis = 0;
        if (node.currentStyle) {//ie
            dis = parseInt(node.currentStyle.marginBottom);
        } else if (document.defaultView) {//标准浏览器下
            dis = parseInt(document.defaultView.getComputedStyle(node, null).marginBottom);
        }
        return dis;
    },
    //获取最小列高的索引
    getMinCol:function (arr) {
        var ca = arr, cl = ca.length, temp = ca[0], minc = 0;
        for (var ci = 0; ci < cl; ci++) {
            if (temp > ca[ci]) {
                temp = ca[ci];
                minc = ci;
            }
        }
        return minc;
    },
    //初始化瀑布流
    init:function () {
        var _this = this;
        var col = []; //列高
        var nodes = _this.getByClass(_this.cls, _this.id), len = nodes.length;
        for (var i = 0; i < _this.colCount; i++) {
            col[i] = 0;
        }
        for (var i = 0; i < len; i++) {
            nodes[i].h = nodes[i].offsetHeight + _this.getMar(nodes[i]);//获取节点的真实高度
            //iArr[i] = i;
        }
        //判断每个节点的位置在哪
        for (var i = 0; i < len; i++) {
            var ming = _this.getMinCol(col);
            nodes[i].style.left = ming * _this.colWidth + "px";
            nodes[i].style.top = col[ming] + "px";
            col[ming] += nodes[i].h;
        }
        _this.id.style.height = _this.maxArr(col) + "px";
    }
};

//三种展现方式的切换按钮
document.getElementById("dis_list").onclick = function () {
    document.getElementById("container").className = "";
    var lis = document.getElementById("sort-ul").getElementsByTagName("li"), len = lis.length;
    for (var i = 0; i < len; i++) {
        lis[i].style.position = "relative";
        lis[i].style.left = "0";
        lis[i].style.top = "0";
        lis[i].style.width = "930px";
        lis[i].style.height = "45px";
    }
    document.getElementById("sort-ul").style.height = "auto";
};
document.getElementById("water_pull").onclick = function () {
    document.getElementById("container").className = "water_pull";
    var lis = document.getElementById("sort-ul").getElementsByTagName("li"), len = lis.length;
    for (var i = 0; i < len; i++) {
        lis[i].style.position = "absolute";
    }
    new Waterfall({
        "container":"sort-ul",
        "colWidth":235,
        "colCount":4
    });
};
document.getElementById("dis_mode").onclick = function () {
    document.getElementById("container").className = "dis_mode";
    var lis = document.getElementById("sort-ul").getElementsByTagName("li"), len = lis.length;
    for (var i = 0; i < len; i++) {
        lis[i].style.position = "relative";
        lis[i].style.left = "0";
        lis[i].style.top = "0";
        lis[i].style.width = "400px";
        lis[i].style.height = "50px";
    }
    document.getElementById("sort-ul").style.height = "auto";
};
document.getElementById("water_pull").onclick = function () {
    document.getElementById("container").className = "water_pull";
    var lis = document.getElementById("sort-ul").getElementsByTagName("li"), len = lis.length;
    for (var i = 0; i < len; i++) {
        lis[i].style.position = "absolute";
        lis[i].style.width = "217px";
        lis[i].style.height = "auto";
    }
    new Waterfall({
        "container":"sort-ul",
        "colWidth":235,
        "colCount":4
    });
};

//重命名
function modifyFileName(ev) {
    switch (ev.type) {
        case "click":
            var $this = $(ev.target);
            if ($this.parents('span.revise').size() > 0 || $this.hasClass('revise')) {
                var worldObj = $this.parents('li').find('div.word');
                if (worldObj.find('input.edit').size() == 0) {
                    worldObj.append('<span class="edit"><input type="text" class="edit" value="' + decodeURIComponent($this.parents('li').attr('filename').replace('/', '')) + '"><span class="status">Esc：取消更名，Enter：确认更名</span></span>');
                }
                worldObj.find('input.edit').focus();
            }
            break;
        case "keydown":
            switch (ev.keyCode) {
                //如果按了ESC
                case 27:
                    console.log('取消重命名');
                    var $this = $(ev.target);
                    if ($this.hasClass('edit') && $this[0].nodeName === 'INPUT') {
                        $this.parents('span.edit').remove();
                    }
                    break;
                //如果按了Enter键
                case 13:
                    var $this = $(ev.target);
                    if ($this.hasClass('edit') && $this[0].nodeName === 'INPUT') {
                        var path = $this.parents('li').attr('path');
                        var origin = $this.parents('li').attr('filename');
                        var to = $.trim($this[0].value);
                        $.post(_host + '/rename', {
                            path:path,
                            origin:origin,
                            to:to
                        }, function (data) {
                            if (data.success === true) {
                                window.location.reload();
                            } else {
                                alert('重命名失败');
                                $this.parents('span.edit').remove();
                            }
                        }, 'json');
                    }
                    break;
            }
            break;
    }
}

$(document).on('keydown', modifyFileName);
$(document).on('click', modifyFileName);

