



//
$(function () {
    var url= "http://cq01-rdqa-dev064.cq01.baidu.com:8099/app/index.php/";
    var username =$.cookie('cookie_username');

    // if(!username){
    //     window.location.href = "../Form/login.html#login";
    // }else{
    //     var cookietime = new Date();
    //     cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));//coockie保存一小时
    //     $.cookie('username','1',{expires:cookietime});
    // }
    //日期编辑
    var dateDatas = {
        "paperEnd": "2017年4月15号",
        "paperHire": "2017年4月16号",
        "allPaperEnd": "2017年4月17号",
        "allPaperDate": "2017年4月18号"
    };
    // $.ajax({
    //     type: "POST",
    //     url: url + "Manage/modify",
    //     data: {
    //         username: username,
    //         content: 'date',
    //         value: JSON.stringify(dateDatas)
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         if(data.status==1){
    //
    //         }else {
    //             console.log(data.info);
    //         }
    //     }
    //
    // });
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
    //最新消息编辑
    var newsData = [
        {
            time: '20170110',
            text: '111',
            value: 'http://www.baidu.com'
        },
        {
            time: '20170111',
            text: '222',
            value: 'http://www.jd.com'
        },
        {
            time: '20170112',
            text: '333',
            value: 'http://www.taobao.com'
        },
        {
            time: '20170113',
            text: '444',
            value: 'http://www.sina.com'
        },
        {
            time: '20170114',
            text: '555',
            value: 'http://www.baidu.com'
        },
        {
            time: '20170115',
            text: '666',
            value: 'http://www.baidu.com'
        }
    ];
    // $.ajax({
    //     type: "POST",
    //     url: url + "Manage/setMessage",
    //     data: {
    //         username: username,
    //         value: JSON.stringify(newsData)
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         if(data.status==1){
    //
    //         }else {
    //             console.log(data.info);
    //         }
    //     }
    // });
    //最新消息获取
    $.ajax({
        type: "POST",
        url: url + "Manage/getMessage",
        dataType: 'json',
        success: function (data) {
            if(data.status==1){
                var adatas=data.data;
                if(adatas.length>5){
                    adatas=adatas.slice(0,5);

                }
                initNews(adatas);

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

        $('.news-info-list').before(str);
    }

});