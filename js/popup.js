

var popup= {
     init: function () {
         return popup.create();

     },
    create: function (cb) {
        var popupHtml=[];
        popupHtml.push('<div id="popup" class="popup"><div class="container">');
        popupHtml.push('<div class="popup-header"></div>');
        popupHtml.push('<div class="popup-edit"></div>');
        popupHtml.push('<div class="popup-footer">');
        popupHtml.push('<input type="button" class="popup-confirm" value="确认"/>');
        popupHtml.push('<input type="button" class="popup-cancel" value="取消"/>');
        // popupHtml.push('<span class="popup-confirm">确认</span>');
        // popupHtml.push('<span class="popup-cancel">取消</span>');
        popupHtml.push('</div></div></div>');
        $('.q-popup').html(popupHtml.join(''));
    },
    //弹框事件
    popupEvent: function (cb) {
        // $('.popup-confirm').on('mousedown', function (e) {
        //     e.stopPropagation();
        //     if (cb && $.isFunction(cb)) {
        //         cb();
        //     }
        // }).on('mouseup', function (e) {
        //     e.stopPropagation();
        //     var _this=$(this);
        //     _this.attr("disabled",true);
        //     _this.css("background", "#ccc");
             // window.setTimeout(function () {
             //     _this.attr("disabled",false);
             //     _this.css({"background": "#20c2d2"});
             // }, 3000);
        // });
        $('.popup-confirm').on('click', function (e) {
            e.stopPropagation();
            if($('.popup-edit >.red')){
                $('.red').html('');
            }
            var _this=$(this);
            _this.attr("disabled",true);
            _this.css("background", "#ccc");
            window.setTimeout(function () {
                _this.attr("disabled", false);
                _this.css({"background": "#20c2d2"});
            }, 15000);
            if (cb && $.isFunction(cb)) {
                cb();
            }
        });
        $('.popup-cancel').on('click', function () {
            $('.popup').remove();
        });
        $('.popup-close').on('click', function () {
            $('.popup').remove();
        })

    }
 };

// module.exports = popup;