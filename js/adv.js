/**
 * Created by v_zhouhui on 2017/4/25.
 */

$(function () {
    var url= "http://cq01-rdqa-dev064.cq01.baidu.com:8099/app/index.php/";
    //编辑
    var username =$.cookie('cookie_username');

    // if(!username){
    //     window.location.href = "../Form/login.html#login";
    // }else{
    //     var cookietime = new Date();
    //     cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));//coockie保存一小时
    //     $.cookie('username','1',{expires:cookietime});
    // }
    var imgDatas = [
        {imgSrc:"https://img10.360buyimg.com/da/jfs/t4882/53/2044981755/130748/b81b31da/58f73c72Nfc5fda9e.jpg",text: "111"},
        {imgSrc:"https://img14.360buyimg.com/da/jfs/t4540/362/3989306377/273671/d3f5c4b4/59087c87N6c7671d7.jpg",text: "222"},
        {imgSrc:"https://img12.360buyimg.com/da/jfs/t3883/94/1442628802/224199/40dcb547/58c0b2dcN78fd0fb3.jpg",text: "333"},
        {imgSrc:"https://img13.360buyimg.com/da/jfs/t5437/329/875980886/144436/3296950b/590829c0N8aab27c6.jpg",text: "444"},
        {imgSrc:"https://img1.360buyimg.com/da/jfs/t5107/76/600655649/202194/ccac68fe/5903035cNa0bca315.jpg",text: "555"}
    ];
    console.log(JSON.stringify(imgDatas));
    $.ajax({
        type: "POST",
        url: url + "Manage/modify",
        data: {
            username: username,
            content: 'banner',
            value: JSON.stringify(imgDatas)
        },
        dataType: 'json',
        success: function (data) {
            if(data.status==1){

            }else {

            }
        }
    });


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
        var tipText = $(".tip-text");
        var tipList = $(".tip-list");
        var len=data.length;
        banner.css('width', 1200*(len+1));

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
        //点击向左轮播
        $(".tip-left").click(function () {
            i--;
            if(i==-1){
                banner.css({left:-(size-1)*1200});
                i=size-2;
            }
            banner.stop().animate({left:-i*1200}, 600);
            $(".tip-text-item").eq(i).addClass("active").siblings().removeClass("active");
            $(".tip-list-item").eq(i).addClass("active").siblings().removeClass("active");
        });
        //点击向右轮播
        $(".tip-right").click(function () {
            moveR();
        });
        // 定时自动轮播
        var t=setInterval(function () {
            moveR();
        },2000);
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
            banner.stop().animate({left:-i*1200}, 600);
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
            banner.stop().animate({left:-i*1200}, 600);
            $(this).addClass("active").siblings().removeClass("active");
            $(".tip-text-item").eq(i).addClass("active").siblings().removeClass("active");
        });
    }
});