



//
$(function () {
    var url= "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
    // var url= "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    if($.cookie('cookie_info')){
        var username =JSON.parse($.cookie('cookie_info')).username;
    }else {
        var username = ''
    }
    // var username =JSON.parse($.cookie('cookie_info')).username;
    var operations= $('.operation-item');

    operations.on('click',function () {
        var _this =$(this);
        if(!username){
            _this.find('a').attr('href', '/app/Tpl/Form/login.html#login')
        }
        $(this).addClass('active').siblings().removeClass('active');
    });


    //日期获取
    $.ajax({
        type: "POST",
        url: url + "Manage/get",
        data: {
            content: 'date'
        },
        dataType: 'json',
        success: function (data) {
            if(data.status==1){
                var date =JSON.parse(data.data.date[0].value);
                $('.date-paper-end').html(date.paperEnd);
                $('.date-paper-hire').html(date.paperHire);
                $('.date-allpaper-end').html(date.allPaperEnd);
                $('.date-allpaper-day').html(date.allPaperDate);
            }else {
                console.log(data.info);
            }
        }

    });
    //最新消息获取
    $.ajax({
        type: "POST",
        url: url + "Manage/getMessage",
        dataType: 'json',
        success: function (data) {
            if(data.status==1){
                var adatas=data.data;
                if(adatas.length>0){
                    if(adatas.length>5){
                        adatas=adatas.slice(0,5);

                    }
                    initNews(adatas);
                }else {
                    $('.news-info-list').append('<p>暂无数据</p>');
                }

            }else {
                console.log(data.info);
            }
        }
    });

    function initNews(adatas) {
        var str='';
        for(var i=0;i<adatas.length;i++){
            str +='<p>';
            str+='<a href="'+adatas[i].value+'">' +adatas[i].text+'</a>';
            str +='</p>';
        }

        $('.news-info-list').append(str);
    }

});