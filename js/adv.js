/**
 * Created by zhouhui on 2017/4/25.
 */

$(function () {
    var url= "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
    // var url= "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    //编辑
    var username =JSON.parse($.cookie('cookie_info')).username;

    // if(!username){
    //     window.location.href = "../Form/login.html#login";
    // }else{
    //     var cookietime = new Date();
    //     cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));//coockie保存一小时
    //     $.cookie('username','1',{expires:cookietime});
    // }



    $.ajax({
        type: "POST",
        url: url + "Manage/get",
        data: {
            content: 'banner'
        },
        dataType: 'json',
        success: function (data) {
            if(data.status==1){
                var data = JSON.parse(data.data.banner[0].value);
                lunbo(data);
            }else {
                console.log(data.info);
            }
        }
    });

    function lunbo(data) {
        var banner = $('.adv-images');
        // var bannerList = $('.adv-images li');
        var tipText = $(".tip-text");
        var tipList = $(".tip-list");
        var len=data.length;
        banner.css('width', 1000*(len+1));

        //绑定数据
        for(var i = 0 ;i<len;i++){
            var advLi = document.createElement("li");
            var textLi = document.createElement("li");
            var listLi = document.createElement("li");
            if(i==0){  //默认第一项轮播项显示  对应的控制按钮被选中
                advLi.className = "adv-images-item";
                textLi.className = "tip-text-item active";
                listLi.className = "tip-list-item active";

            }else{ //其他项隐藏  其他的控制按钮样式不改变
                advLi.className = "adv-images-item";
                textLi.className = "tip-text-item";
                listLi.className = "tip-list-item";
            }

            advLi.innerHTML = '<a href="javascript:void(0);">' +
                '<img src="' + data[i].imgSrc + '" />' +
                '</a>';
            textLi.innerHTML = data[i].text;
            listLi.innerHTML = '';

            banner.append(advLi);
            tipText.append(textLi);
            tipList.append(listLi);
        }

        //轮播效果
        var clone='<li class="adv-images-item"><a href="javascript:void(0);">' + '<img src="' + data[0].imgSrc + '" />' + '</a>';
        banner.append(clone);
        var i=0;
        var size=len+1; //图片总数;

        // 定时自动轮播
        var t=setInterval(function () {
            moveR();
        },3000);
        //点击向左轮播
        $(".tip-left").click(function () {
            clearInterval(t);
            i--;
            if(i==-1){
                banner.css({left:-(size-1)*1000});
                i=size-2;
            }
            banner.stop().animate({left:-i*1000}, 600);
            $(".tip-text-item").eq(i).addClass("active").siblings().removeClass("active");
            $(".tip-list-item").eq(i).addClass("active").siblings().removeClass("active");
        });
        //点击向右轮播
        $(".tip-right").click(function () {
            clearInterval(t);
            moveR();
        });

        // 鼠标滑过图片停止自动轮播
        $('.adv-banner').hover(function(){
            clearInterval(t);
            $('.tip-btn').removeClass('hide');
        }, function(){
            $('.tip-btn').addClass('hide');
            t=setInterval(function () {
                moveR();
            },3000)
        });
        // $('.tip-btn').hover(function () {
        //
        // });
        //向右轮播函数
        function moveR() {
            i++;
            if(i==size){
                banner.css({left:0});
                i=1;
            }
            banner.stop().animate({left:-i*1000}, 600);
            if(i==size-1){
                $(".tip-list-item").eq(0).addClass("active").siblings().removeClass("active");
                $(".tip-text-item").eq(0).addClass("active").siblings().removeClass("active");
            }else {
                $(".tip-list-item").eq(i).addClass("active").siblings().removeClass("active");
                $(".tip-text-item").eq(i).addClass("active").siblings().removeClass("active");
            }
        }
        //鼠标滑过圆点
        $(".tip-list-item").on('click',function () {
            clearInterval(t);
            var index=$(this).index();
            i=index;
            banner.stop().animate({left:-i*1000}, 600);
            $(this).addClass("active").siblings().removeClass("active");
            $(".tip-text-item").eq(i).addClass("active").siblings().removeClass("active");
        });
    }
});