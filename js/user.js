
//左侧导航条
// var url = "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
$(function () {
    // var username= $('.web-nametext').html();
    var username =$.cookie('cookie_username');

    // if(!username){
    //     window.location.href = "../Form/login.html#login";
    // }else{
    //     var cookietime = new Date();
    //     cookietime.setTime(cookietime.getTime() + (60 * 60 * 1000));//coockie保存一小时
    //     $.cookie('username','1',{expires:cookietime});
    // }
    var hash;
    var index=0;
    var oLis = $('.user-detail-menu li');
    var one = $('.user-menu-one');
    var two = $('.user-menu-two');
    var three = $('.user-menu-three');
    var four = $('.user-menu-four');
    var five = $('.user-menu-five');
    var six = $('.user-menu-six');
    var seven = $('.user-menu-seven');
    var eight = $('.user-menu-eight');
    var oRights = $('.user-detail-right');
    hash=(!window.location.hash) ? "#abstract" : window.location.hash;
    window.location.hash=hash;

    switch(hash){
        case "#abstract":
            one.addClass('on').siblings().removeClass('on');
            index = one.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active');
            break;
        case "#submission":
            two.addClass('on').siblings().removeClass('on');
            index = two.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        case "#allcontri":
            three.addClass('on').siblings().removeClass('on');
            index = three.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        case "#doingcontri":
            four.addClass('on').siblings().removeClass('on');
            index = four.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        case "#info":
            five.addClass('on').siblings().removeClass('on');
            index = five.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        case "#modify":
            six.addClass('on').siblings().removeClass('on');
            index =six.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        case "#apply":
            seven.addClass('on').siblings().removeClass('on');
            index =seven.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        case "#stay":
            eight.addClass('on').siblings().removeClass('on');
            index =eight.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active')
            break;
        default:
            one.addClass('on').siblings().removeClass('on');
            index = one.attr('data-id');
            oRights.eq(index).addClass('active').siblings().removeClass('active');
    }



    oLis.on('click', function () {
        var _this = $(this);
        var index = _this.index();
        _this.addClass('on').siblings().removeClass('on');
        oRights.eq(index).addClass('active').siblings().removeClass('active')
    });
    contribution(username);
    userInfo(username);
    modifyPwd(username);
    applyReview();
    submission(username);

});

//用户信息中心--稿件查询
function contribution(username) {

    //请求稿件查询列表
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            type: 'all'
        },
        dataType: 'json',
        success: function (data) {
            if(data.status==1){
                var data = data.data;
                if(data.length>0){

                    if(data.length>5){
                        var titleData=data.slice(0,5);
                    }
                    var alContribution =$('.al-contribution');
                    var noContribution =$('.no-contribution');
                    bindData(titleData, alContribution);
                    for(var i=0;i<data.length;i++){
                        var curData = data[i];
                        if(curData.status==0){
                            curData.status = '已采用';
                        }else if (curData.status==1){
                            curData.status = '已投稿';
                        }else if (curData.status==2){
                            curData.status = '已修改';
                        }else {
                            curData.status = '待修改';
                        }
                        curData.audit_opinion = curData.audit_opinion || '暂无任何意见';
                        curData.chineseTitle ='<span class="contri-title" data-id="'+curData.docu_id+'">'+curData.chineseTitle+'</span>';
                            curData.view = '<span class="contri-see" data-id="'+curData.docu_id+'">查看</span>';
                        curData.edit = '<input class="contri-edit-upload" type="file" name="file'+curData.id+'" value="上传修改稿"/><span class="edit-upload-btn" data-id="'+curData.docu_id+'">上传</span>';
                    }
                    contriData(data,username);
                }

            }else {
                console.log(data.info);
            }
        }

    });

    //请求待修改稿件查询
    $.ajax({
        type: "POST",
        url:  url +"Document/show",
        data: {
            username: username,
            type: 'doing'
        },
        dataType: 'json',
        success: function (data) {
            if(data.status==1){
                var data = data.data;
                if(data.length>0){

                    if(data.length>5){
                       var titleData=data.slice(0,5);
                    }
                    var alContribution =$('.al-contribution');
                    var noContribution =$('.no-contribution');
                    bindData(titleData, noContribution);
                    for(var i=0;i<data.length;i++){
                        var curData = data[i];
                        if(curData.status==0){
                            curData.status = '已采用';
                        }else if (curData.status==1){
                            curData.status = '已投稿';
                        }else if (curData.status==2){
                            curData.status = '已修改';
                        }else {
                            curData.status = '待修改';
                        }
                        curData.audit_opinion = curData.audit_opinion || '暂无任何意见';
                        curData.chineseTitle ='<span class="contri-title" data-id="'+curData.docu_id+'">'+curData.chineseTitle+'</span>';
                        curData.view = '<span class="contri-see" data-id="'+curData.docu_id+'">查看</span>';
                        curData.edit = '<input class="contri-edit-upload" type="file" name="file'+curData.id+'" value="上传修改稿"/><span class="edit-upload-btn" data-id="'+curData.docu_id+'">上传</span>';
                    }
                    contriDataModify(data,username);
                }

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



}
//数据绑定
function bindData(data,ele) {
    var str='';
    for(var i=0;i<data.length;i++){
        data[i].create_time = String(data[i].create_time).substring(0,10);
        str +='<li class="content-menu-contribution-item">';
        str+='<span class="contribution-title">' +data[i].chineseTitle+'</span>';
        str+='<span>' +data[i].create_time+'</span>';
        str +='</li>';
    }
    ele.append(str);
}
//最新消息
function initNews(adatas) {
    var str='';
    for(var i=0;i<adatas.length;i++){
        str +='<li class="content-menu-contribution-item">';
        str+='<a href="'+adatas[i].value+'">' +adatas[i].text+'</a>';
        str +='</li>';
    }

    $('.content-menu-contribution-news').append(str);
}

//稿件查询
function contriData(data,username) {
    var ele= $('.user-detail-contribution');
    var siblingEle= $('.user-detail-contribution-person');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'create_time', title: '投稿时间'},
        {id: 'status', title: '稿件状态'},
        {id: 'view', title: '审稿意见'},
        // {id: 'edit', title: '上传修稿'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    //点击某一个标题进入当前稿件的详情
    $('.user-detail-contribution .contri-title').on('click', function () {
        var _this = $(this);
        ele.addClass('hide');
        siblingEle.removeClass('hide');
        var id = _this.attr('data-id');
        //请求当前稿件详情接口
        $.ajax({
            type: "POST",
            url: url + "Document/showById",
            data: {
                username: username,
                docu_id: id
            },
            dataType: 'json',
            success: function (data) {
                if(data.status==1){
                    var data  =data.data[0];
                    personContri(data,ele,siblingEle)
                }else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('请重试');
            }

        });


    });

    //点击上传修改稿件
    $('.user-detail-contribution .edit-upload-btn').on('click', function () {
        var fileSrc = ($(this).siblings())[0].files[0];
        var fileAccept = fileSrc.name.split(".")[1];//获取上传文件的后缀
        if( fileAccept!="doc" && fileAccept!="docx" ){
            alert("只能上传.doc和.docx的文件！");
        }
        var cid = $(this).attr('data-id');
        var data = new FormData();
        data.append('username', username);
        data.append('fileSrc', fileSrc);
        data.append('docu_id', cid);
        console.log(data);
        $.ajax({
            type: "POST",
            url: url + "Document/resubmit",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if(data.status==1){
                    alert('上传成功');

                }else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });
    });


    //点击查看审核意见
    $('.user-detail-contribution .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        $.ajax({
            type: "POST",
            url: url + "Document/showOpinion",
            data: {
                docu_id: cid
            },
            dataType: 'json',
            success: function (data) {
                if(data.status==1){

                    popup.init();
                    var tHtml = [],aHtml= [];
                    tHtml.push('<span class="popup-title">审稿意见</span><i class="popup-close">x</i>');
                    $('.popup-header').html(tHtml.join(''));
                    if(data.data && data.data.length>0){
                    var aTitles = [{id: 'audit_user', title: '审批人'},
                        {id: 'audit_opinion', title: '意见'},
                        {id: 'version', title: '版本'}
                    ];
                    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data.data, maxline: 10});

                    aHtml.push(oNewTable.init());
                    }else {
                        aHtml = '暂无审稿意见';
                    }
                    $('.popup-edit').html(aHtml);
                    popup.popupEvent();
                }else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });


    });

}
//待修改稿件查询
function contriDataModify(data,username) {
    var ele= $('.user-detail-contribution-modify');
    var siblingEle= $('.user-detail-contribution-modify-person');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'create_time', title: '投稿时间'},
        // {id: 'status', title: '稿件状态'},
        {id: 'view', title: '审稿意见'},
        // {id: 'edit', title: '上传修稿'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    $('.user-detail-contribution-modify').html(aHtml);

    //点击某一个标题进入当前稿件的详情
    $('.user-detail-contribution-modify .contri-title').on('click', function () {
        var _this = $(this);
        ele.addClass('hide');
        siblingEle.removeClass('hide');
        var id = _this.attr('data-id');
        //请求当前稿件详情接口
        $.ajax({
            type: "POST",
            url: url + "Document/showById",
            data: {
                username: username,
                docu_id: id
            },
            dataType: 'json',
            success: function (data) {
                if(data.status==1){
                    var data  =data.data[0];

                    personContri(data, ele,siblingEle);
                }else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('请重试');
            }

        });


    });

    // //点击上传修改稿件
    // $('.edit-upload-btn').on('click', function () {
    //     var fileSrc = ($(this).siblings())[0].files[0];
    //     var cid = $(this).attr('data-id');
    //     var data = new FormData();
    //     data.append('username', username);
    //     data.append('fileSrc', fileSrc);
    //     data.append('docu_id', cid);
    //     console.log(data);
    //     $.ajax({
    //         type: "POST",
    //         url: url + "Document/resubmit",
    //         data: data,
    //         dataType: 'json',
    //         processData: false,
    //         contentType: false,
    //         success: function (data) {
    //             if(data.status==1){
    //                 alert('上传成功');
    //
    //             }else {
    //                 alert(data.info);
    //             }
    //         },
    //         error: function () {
    //             alert('服务器开小差，请稍候再试');
    //         }
    //     });
    // });


    //点击查看审核意见
    $('.user-detail-contribution-modify .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        $.ajax({
            type: "POST",
            url: url + "Document/showOpinion",
            data: {
                docu_id: cid
            },
            dataType: 'json',
            success: function (data) {
                if(data.status==1){

                    popup.init();
                    var tHtml = [],aHtml= [];
                    tHtml.push('<span class="popup-title">审稿意见</span><i class="popup-close">x</i>');
                    $('.popup-header').html(tHtml.join(''));
                    if(data.data && data.data.length>0){
                        var aTitles = [{id: 'audit_user', title: '审批人'},
                            {id: 'audit_opinion', title: '意见'},
                            {id: 'version', title: '版本'}
                        ];
                        var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data.data, maxline: 10});

                        aHtml.push(oNewTable.init());
                    }else {
                        aHtml = '暂无审稿意见';
                    }
                    $('.popup-edit').html(aHtml);
                    popup.popupEvent();
                }else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });


    });
}

//渲染当前稿件详情
function personContri(data, ele, siblingEle) {
    var bHtml = [], cHtml= [], dHtml=[], eHtml=[];
    bHtml.push('<span class="contri-callback">返回</span> <span class="contribute-upload-single upload-on" data-id="'+ data.docu_id+'"><i class="iconfont icon-download upload-icon"></i>下载原始摘要</span><span class="contribute-upload-all upload-on"><i class="iconfont icon-download upload-icon"></i>下载原始全文</span>');
    $('.contribute-upload').html(bHtml);

    cHtml.push('<p> <span class="user-contribute-list-title">稿件编号</span> <span>'+ data.docu_id+'</span></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">中文标题</span> <span>'+data.chineseTitle+'</span></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">英文标题</span> <span>'+data.englishTitle+'</span></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">中文关键字</span> <span>'+data.keyChinese+'</span></p>');
    cHtml.push('<p><span class="user-contribute-list-title">英文关键字</span> <span>'+data.keyEnglish+'</span></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">主题</span> <span>'+data.theme+'</span></p>');
    cHtml.push('<p> <span class="user-contribute-list-title">投稿日期</span> <span>'+String(data.create_time).substring(0,10)+'</span></p>');
    $('.user-contribute-list').html(cHtml);

    //点击返回
    $('.contri-callback').on('click', function () {
        var _this = $(this);
        ele.removeClass('hide');
        siblingEle.addClass('hide');
    });
    //点击稿件下载
    $('.contribute-upload-single').on('click', function () {
        var cid = $(this).attr('data-id');
        window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid);
    });
    var authorData = JSON.parse(data.author)|| 0;
    if(authorData.length>0){
        var versionData = data.version;
        contriAuthor(authorData);
        // contriStage(versionData)
    }
}

//稿件详情--作者
function contriAuthor(data) {

    var aTitles = [{id: 'authorName', title: '作者'},
        // {id: 'authorPing', title: '姓名'},
        {id: 'authorEmail', title: '邮箱'},
        {id: 'authorCompany', title: '单位'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
   $('.user-contribute-author').html(aHtml);
}

//稿件详情--审稿阶段
function contriStage(data) {

    var aTitles = [{id: 'name', title: '审稿阶段'},
        {id: 'opinion', title: '送审时间'},
        {id: 'version', title: '审回时间'},
        {id: 'version', title: '退修时间'},
        {id: 'version', title: '修回时间'},
        {id: 'version', title: '下载修改稿'},
        {id: 'version', title: '意见'},
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 10});
    var aHtml = [];
    aHtml.push(oNewTable.init());
}

//展示个人信息
function userInfo(username) {
    showNotice();
    $.ajax({
        type: "POST",
        url: url +"Form/searchUser",
        data: {
            username: username
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                if(data.data[0].info){
                    $('.right-title-img').attr('src','http://ndac.env.tsinghua.edu.cn/'+ data.data[0].info+'?t=' + Math.random());
                }
                $('.right-title-name').html(data.data[0].stuName);
                $('.right-title-school').html(data.data[0].school);
                perInfo(data.data[0]);
            } else {

                alert(data.info);
                return false;
            }
        }

    });
    uploadImg(username);
}
function showNotice() {
    $('.detail-right-title-img').hover(function () {
        $('.upload-notice').removeClass('hide');
    },function () {
        $('.upload-notice').addClass('hide');
    })
}
function uploadImg(username) {
    //进行上传头像
    $('.upload-img').on('change', function(e) {
        var image =  $("input[name=uploading]")[0].files[0];
        var data = new FormData();
        var imgPath = $("#upload-img").val();
        if (imgPath == "") {
            alert("请选择上传图片！");
            return;
        }
        //判断上传文件的后缀名
        var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
            && strExtension != 'png' && strExtension != 'bmp') {
            alert("请选择图片文件");
            return;
        }
        data.append('username', username);
        data.append('imgSrc', image);
        //请求上传图片接口
        $.ajax({
            type: "POST",
            url: url +"Form/setImage",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status == 1) {
                    $('.upload-notice').addClass('hide');
                    window.location.reload();
                } else {
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试')
            }

        });
    });
}
//渲染个人信息页面
function perInfo(data) {

    var pHtml = [];
    pHtml.push('<div class="user-person-info-list"><label>用户名：</label><input type="text" class="user-person-info-val val-username" value="' + data.username + '"/> </div>');
    pHtml.push('<div class="user-person-info-list"><label>账号（电子邮箱）：</label><input type="text" class="user-person-info-val val-email" value="' + data.email + '" disabled="disabled"/></div>');
    pHtml.push('<div class="user-person-info-list"><label>姓名：</label><input type="text"  class="user-person-info-val val-name" value="' + data.stuName + '"/></div>');
    pHtml.push('<div class="user-person-info-list person-info-sex"><label class="label-sex">性别：</label><select class="user-person-info-val val-sex" data-sex="'+data.sex+'"><option value="0" class="val-sex-boy">男</option><option value="1" class="val-sex-girl">女</option></select></div>');
    pHtml.push(' <div class="user-person-info-list"><label>出身年月：</label> <input size="16" type="text" class="user-person-info-val date form_datetime val-date"  placeholder="出生年月" value="' + data.birthDate + '" readonly> </div>');
    pHtml.push('<div class="user-person-info-list"> <label>所在院校：</label> <input type="text" class="user-person-info-val val-school" value="' + data.school + '"/></div>');
    pHtml.push('<div class="user-person-info-list"> <label>学号：</label> <input type="text" placeholder="学号" class="user-person-info-val val-userid" value="' + data.userID + '"/></div>');
    pHtml.push(' <div class="user-person-info-list"> <label>导师姓名：</label> <input type="text" placeholder="导师姓名" class="user-person-info-val val-docname" value="' + data.docName + '"/> </div>');
    pHtml.push('<div  class="user-person-info-list"> <label>手机号码：</label> <input type="text" placeholder="请输入11位数字的手机号" class="user-person-info-val val-phone" value="' + data.phone + '"/> </div>');
    pHtml.push('<div class="user-person-info-list"><label  class="label-address">详细地址：</label><textarea class="user-person-info-val val-address" rows="5">' + data.address + '</textarea></div>');
    pHtml.push('<div class="user-person-info-list pwd-error edit-info-error"></div>');
    pHtml.push('<div class="per-edit-btn"><span class="edit-btn-cancel">取消</span><span class="edit-btn-confirm person-info-btn">提交</span> </div>');

    $('.user-person-info').html(pHtml);
    if($('.val-sex').attr('data-sex')==1){
        $('.val-sex-girl').attr('selected', 'selected');
        $('.val-sex-boy').attr('selected', false);
    }else {
        $('.val-sex-girl').attr('selected', false);
        $('.val-sex-boy').attr('selected', 'selected');
    }
    $('.user-person-info input').on('keydown', function () {
        $('.edit-info-error').html('');
    });
    $('.person-info-btn').on('click', function () {
        personModify();
    });

    //出生日期
    $('.form_datetime').datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 2,
        pickerPosition: "bottom-left"
    });
}

//请求个人信息接口
function personModify() {
    var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var userName = $.trim($('.val-username').val());
    var email = $.trim($('.val-email').val());
    var sex = $('.val-sex option:selected').val();//选中的值;
    // var birthDate = ($('.val-date').val()).replace(/-/g,"");
    var birthDate = $('.val-date').val();
    var school = $('.val-school').val();
    var userId = $.trim($('.val-userid').val());
    var stuName = $.trim($('.val-name').val());
    var docName = $.trim($('.val-docname').val());
    var phone = $.trim($('.val-phone').val());
    var address = $.trim($('.val-address').val());
    if(userName==''){
        $('.edit-info-error').html('请填写用户名');
        return false
    }

    if(!(emailReg.test(email)) || email == ''){
        $('.edit-info-error').html('请填写你的邮箱');

    }

    if(birthDate==''){
        $('.edit-info-error').html('请选择你的出身日期');
        return false
    }

    if(stuName==''){
        $('.edit-info-error').html('请填写你的名字');
        return false

    }
    if(docName==''){
        $('.edit-info-error').html('请填写导师姓名');
        return false
    }

    if(!(/^1[3456789]\d{9}$/.test(phone))){
        $('.edit-info-error').html('请填写正确的电话号码');
        return false
    }
    if(address==''){
        $('.edit-info-error').html('请填写你的地址');
        return false
    }

    $.ajax({
        type: "POST",
        url: url +"Form/modifyUser",
        data: {
            username: userName,
            email: email,
            stuName: stuName,
            sex: sex,
            birthDate: birthDate,
            school: school,
            userID: userId,
            docName: docName,
            phone: phone,
            address: address
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                alert('修改成功');
                window.location.reload();
            } else {
                // $('.user-person-info').append('<div class="pwd-error">'+data.info+'</div>');
                alert(data.info);
                return false;
            }
        },
        error: function () {
            alert('网路不给力，请稍候再试');
        }

    })
}

//修改密码
function modifyPwd(username) {
    $('.pwd-confirm').on('click', function () {
        var oldPwd = $('.user-old-pwd').val();
        var newPwd = $('.user-new-pwd').val();
        var cPwd = $('.user-confirm-pwd').val();

        if(oldPwd.length<6 || oldPwd == ''){
            $('.old-pwd-error').html('请填写你原来的密码');
            return false;
        }
        if(newPwd.length<6 || newPwd == ''){
            $('.new-pwd-error').html('请设置6位以上的密码');
            return false;
        }
        if(cPwd!=newPwd || cPwd==''){
            $('.confirm-pwd-error').html('请再次确认你的密码');
            return false;
        }

        $.ajax({
            type: "POST",
            url: url +"Form/modifyPassword",
            data: {
                username: username,
                oldPwd: oldPwd,
                newPwd: newPwd
            },
            dataType: 'json',
            success: function (data) {
                if (data.status == 1) {
                    alert('设置成功');
                    window.location.reload();
                } else {
                   $('.user-detail-pwd-list').append('<p class="pwd-error">'+data.info+'</p>')

                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }

        })
    })

}

//申请成为审稿人
function applyReview(){
    $('.user-person-apply').on('keydown', function () {
        $('pwd-error').html('');
    });
    $('.apply-btn-confirm').on('click', function () {
        var major = $.trim($('.val-major').val());
        var education = $.trim($('.val-education option:selected').val());
        var positio = $('.val-positio').val();
        var field = $('.val-field option:selected').val();
        var gain = $.trim($('.val-gain').val());
        var direction = $.trim($('.val-direction').val());
        var name = $.trim($('.val-name').val());
        var bank = $.trim($('.val-bank').val());
        var account = $.trim($('.val-account').val());
        var data ={
            major: major,
            education: education,
            positio: positio,
            field: field,
            gain: gain,
            direction: direction,
            name: name,
            bank: bank,
            account: account
        };
        if(major==''){
            $('.major-error').html('请填写你的专业');
            return false
        }
        if(positio==''){
            $('.positio-error').html('请填写你的职称');
            return false
        }
        if(direction==''){
            $('.direction-error').html('请填写你的研究方向');
            return false
        }
        if(name==''){
            $('.name-error').html('请填写持卡人姓名');
            return false
        }
        if(bank==''){
            $('.bank-error').html('请填写持卡人银行');
            return false
        }
        if(account==''){
            $('.account-error').html('请填写持卡账号');
            return false
        }

        $.ajax({
            type: "POST",
            url: url +"Form/xx",
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status == 1) {
                    alert('提交成功，请等待审核');
                    window.location.reload();
                } else {
                    // $('.user-person-apply').append('<div class="pwd-error">'+data.info+'</div>');
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }

        })
    })
}

//投稿
function submission(username) {

    $('.user-contribute-deliver input').on('keydown', function () {
        $('.pwd-error').html('');
    });
    //暂存
    $('.save-btn-confirm').on('click', function () {
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var chineseTitle = $.trim($('.val-chinese-tit').val());
        var englishTitle = $.trim($('.val-english-tit').val());
        var keyChinese = $.trim($('.chinese-keywords').val());
        var keyEnglish = $.trim($('.english-keywords').val());
        var theme = $.trim($('.val-apply-theme option:selected').val());
        var authorName = $('.val-apply-name').val();
        var authorPing = $.trim($('.val-apply-ping').val());
        var authorEmail = $.trim($('.val-apply-email').val());
        var authorCompany = $.trim($('.val-apply-company').val());
        var remarks = $.trim($('.val-apply-remarks').val());

        var author = [{
            authorName: authorName,
            authorPing: authorPing,
            authorEmail: authorEmail,
            authorCompany: authorCompany
        }];
        var moreAuthor = $('.more-author-item');
        moreAuthor.each(function (i) {
            var item={};
            var addName=  $(this).attr('data-name');
            var addPing=  $(this).attr('data-ping');
            var addEmail=  $(this).attr('data-email');
            var addCompany=  $(this).attr('data-company');
            item.authorName =addName;
            item.authorPing =addPing;
            item.authorEmail =addEmail;
            item.authorCompany =addCompany;
            author.push(item);
        });
        var data ={
            username: username,
            chineseTitle: chineseTitle,
            englishTitle: englishTitle,
            keyChinese: keyChinese,
            keyEnglish: keyEnglish,
            theme: theme,
            author: JSON.stringify(author),
            remarks: remarks
        };


        if(!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(chineseTitle)){
            $('.chinese-tit-error').html('请填写中文标题');
            return false
        }
        if(!(/[\u4E00-\u9FA5\uF900-\uFA2D]||\，*||\,*/.test(keyChinese))){
            $('.chinese-tit-error').html('请填写不错过5个关键字，以逗号隔开');
            return false
        }
        if(authorName==''){
            $('.apply-name-error').html('请填写作者姓名');
            return false
        }
        if(authorPing==''||/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(authorPing)){

            $('.apply-ping-error').html('请填写作者拼音');
            return false
        }
        if(authorEmail==''||!(emailReg.test(authorEmail))){
            $('.apply-email-error').html('请填写作者邮箱');
            return false
        }
        if(authorCompany==''){
            $('.apply-name-error').html('请填写作者地址');
            return false
        }
        $.ajax({
            type: "POST",
            url: url +"Document/save",
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status == 1) {
                    alert('提交成功，请等待审核');
                    window.location.reload();
                } else {
                    // $('.user-person-apply').append('<div class="pwd-error">'+data.info+'</div>');
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }
        })
    });
    //提交
    $('.upload-btn-confirm').on('click', function () {
        var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        // var file = $('[type="file"]').get(0).files[0];
        // var fileSrc = $("input[name=fileString]").val();
        var fileSrc = $("input[name=fileString]")[0].files[0];
        var chineseTitle = $.trim($('.val-chinese-tit').val());
        var englishTitle = $.trim($('.val-english-tit').val());
        var keyChinese = $.trim($('.chinese-keywords').val());
        var keyEnglish = $.trim($('.english-keywords').val());
        var theme = $.trim($('.val-apply-theme option:selected').val());
        var authorName = $('.val-apply-name').val();
        var authorPing = $.trim($('.val-apply-ping').val());
        var authorEmail = $.trim($('.val-apply-email').val());
        var authorCompany = $.trim($('.val-apply-company').val());
        var remarks = $.trim($('.val-apply-remarks').val());

        var author = [{
            authorName: authorName,
            authorPing: authorPing,
            authorEmail: authorEmail,
            authorCompany: authorCompany
        }];
        var moreAuthor = $('.more-author-item');
        moreAuthor.each(function (i) {
            var item={};
            var addName=  $(this).attr('data-name');
            var addPing=  $(this).attr('data-ping');
            var addEmail=  $(this).attr('data-email');
            var addCompany=  $(this).attr('data-company');
            item.authorName =addName;
            item.authorPing =addPing;
            item.authorEmail =addEmail;
            item.authorCompany =addCompany;
            author.push(item);
        });
        var fileAccept = fileSrc.name.split(".")[1];//获取上传文件的后缀
        if( fileAccept!="doc" && fileAccept!="docx" ){
            $('.val-apply-file').html("只能上传.doc和.docx的文件！");
        }


        if(!/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(chineseTitle)){
            $('.chinese-tit-error').html('请填写中文标题');
            return false
        }
        if(!(/[\u4E00-\u9FA5\uF900-\uFA2D]||\，*||\,*/.test(keyChinese))){
            $('.chinese-tit-error').html('请填写不错过5个关键字，以逗号隔开');
            return false
        }
        if(authorName==''){
            $('.apply-name-error').html('请填写作者姓名');
            return false
        }
        if(authorPing==''||/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(authorPing)){

            $('.apply-ping-error').html('请填写作者拼音');
            return false
        }
        if(authorEmail==''||!(emailReg.test(authorEmail))){
            $('.apply-email-error').html('请填写作者邮箱');
            return false
        }
        if(authorCompany==''){
            $('.apply-name-error').html('请填写作者地址');
            return false
        }
        var data = new FormData();
        data.append('username', username);
        data.append('fileSrc', fileSrc);
        data.append('chineseTitle', chineseTitle);
        data.append('englishTitle', englishTitle);
        data.append('keyChinese', keyChinese);
        data.append('keyEnglish', keyEnglish);
        data.append('theme', theme);
        data.append('author', JSON.stringify(author));
        data.append('remarks', remarks);
        $.ajax({
            type: "POST",
            url: url +"Document/submit",
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status == 1) {
                    alert('提交成功，请等待审核');
                    // window.location.reload();
                    window.location.href='/app/Tpl/Form/user.html'
                } else {
                    // $('.user-person-apply').append('<div class="pwd-error">'+data.info+'</div>');
                    alert(data.info);
                    return false;
                }
            },
            error: function () {
                alert('网路不给力，请稍候再试');
            }
        })
    });
    //添加更多作者
    $('.more-author').on('click', function () {
        popup.init();
        var tHtml = [], mHtml= [];
        tHtml.push('<span class="popup-title">添加作者</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        mHtml.push('<form class="extra-author">');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">作者姓名：</label> <input type="text" class="user-person-apply-val add-author-name" /> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">作者拼音：</label> <input placeholder="" class="user-person-apply-val add-author-ping"/> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">邮箱地址：</label> <input placeholder="" class="user-person-apply-val add-author-email"/> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list"> <label class="add-author-label">作者单位：</label> <textarea class="user-person-apply-val add-author-company" rows="3" cols="30"></textarea> <span class="pwd-error"></span> </div>');
        mHtml.push('<div class="user-person-apply-list pwd-error add-author-error"></div>');
        mHtml.push('<div class="user-person-apply-val"><span class="edit-btn-cancel add-author-cancel">取消</span><span class="edit-btn-confirm add-author-confirm">确定</span> </div>');
        mHtml.push('</form>');
        $('.popup-edit').html(mHtml);
        popup.popupEvent();
        $('.extra-author input').on('keydown', function () {
            $('.add-author-error').html('');
        });
        $('.add-author-confirm').on('click', function () {
            var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            var addName = $.trim($('.add-author-name').val());
            var addPing = $.trim($('.add-author-ping').val());
            var addEmail = $.trim($('.add-author-email').val());
            var addCompany = $.trim($('.add-author-company').val());
            if(addName==''){
                $('.add-author-error').html('请填写作者姓名');
                return false
            }
            if(addPing==''||(/[\u4E00-\u9FA5\uF900-\uFA2D]/).test(addPing)){

                $('.add-author-error').html('请填写作者拼音');
                return false
            }
            if(addEmail==''||!(emailReg.test(addEmail))){
                $('.add-author-error').html('请填写作者邮箱');
                return false
            }
            if(addCompany==''){
                $('.add-author-error').html('请填写作者地址');
                return false
            }
            $('.popup').remove();
            $('.more-author-list').append('<span class="more-author-item" data-name='+addName+' data-ping='+addPing+' data-email='+addEmail+' data-company='+addCompany+'>'+addName+'</span>')
        });
        $('.add-author-cancel').on('click', function () {
            $('.popup').remove();
        })
    })
}