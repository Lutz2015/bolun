



//
$(function () {
    // var url= "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
    var url= "http://ndac.env.tsinghua.edu.cn/app/index.php/";
    var username =$.cookie('cookie_username');
    var operations= $('.operation-item');

    operations.on('click',function () {
        var _this =$(this);
        if(!username){
            _this.find('a').attr('href', '/app/Tpl/Form/login.html#login')
        }
        $(this).addClass('active').siblings().removeClass('active');
    });


    //日期编辑
    var dateDatas = {
        "paperEnd": "2017年6月30号",
        "paperHire": "2017年8月4号",
        "allPaperEnd": "2017年9月1号",
        "allPaperDate": "2017年10月19日－22日"
    };
    $.ajax({
        type: "POST",
        url: url + "Manage/modify",
        data: {
            username: username,
            content: 'date',
            value: JSON.stringify(dateDatas)
        },
        dataType: 'json',
        success: function (data) {
            if(data.status==1){

            }else {
                console.log(data.info);
            }
        }

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
    //最新消息编辑
    var newsData = [
        {
            time: '20170110',
            text: '水污染控制与资源化',
            value: 'http://www.baidu.com'
        },
        {
            time: '20170111',
            text: '大气污染与控制',
            value: 'http://www.jd.com'
        },
        {
            time: '20170112',
            text: '固体废物污染控制与资源化',
            value: 'http://www.taobao.com'
        },
        {
            time: '20170113',
            text: '环境化学',
            value: 'http://www.sina.com'
        },
        {
            time: '20170114',
            text: '环境经济、管理与政策',
            value: 'http://www.taobao.com'
        },
        {
            time: '20170115',
            text: '环境生态健康',
            value: 'http://www.163.com'
        },
        {
            time: '20170115',
            text: '能源与气候变化',
            value: 'https://www.360.cn'
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