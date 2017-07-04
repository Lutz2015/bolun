
//左侧导航条
var url = "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
// var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
$(function () {
    // var username= $('.web-nametext').html();
    var username =$.cookie('cookie_username');


    var hash;
    var index=0;

    hash=(!window.location.hash) ? "#contribute" : window.location.hash;
    window.location.hash=hash;

    var oLis = $('.user-title-list a');
    var one = $('.title-contribute');
    var two = $('.title-audit');
    var three = $('.title-editor');
    var four = $('.title-manager');
    var content = $('.user-detail');

    switch(hash){
        case "#contribute":
            one.addClass('on').siblings().removeClass('on');
            index = one.attr('data-id');
            content.eq(index).addClass('active').siblings().removeClass('active');
            break;
        case "#audit":
            two.addClass('on').siblings().removeClass('on');
            index = two.attr('data-id');
            content.eq(index).addClass('active').siblings().removeClass('active');
            break;
        case "#editor":
            three.addClass('on').siblings().removeClass('on');
            index = three.attr('data-id');
            content.eq(index).addClass('active').siblings().removeClass('active');
            break;
        case "#manager":
            four.addClass('on').siblings().removeClass('on');
            index = four.attr('data-id');
            content.eq(index).addClass('active').siblings().removeClass('active');
            break;
        default:
            one.addClass('on').siblings().removeClass('on');
            index = one.attr('data-id');
            content.eq(index).addClass('active').siblings().removeClass('active');
    }


    oLis.on('click', function () {
        var _this = $(this);
        var index = _this.index();
        _this.addClass('on').siblings().removeClass('on');
        content.eq(index).addClass('active').siblings().removeClass('active')
    });

    userInfo(username);

    contribution(username);
    // modifyPwd(username);
    renderPwd(username);
    applyReview(username);
    submission(username);
    resHotel(username);
    // nameListData(username);

    dateEdit(username);
});

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
        $('.popup-footer').html('');
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


//用户信息中心--稿件查询
function contribution(username) {
    //待修改稿件，未审稿件，已审稿件，待分配稿件，已分配稿件
    var noAlreadyEdit  =[],
        noAlreadyReview =[],
        alreadyReview =[],
        noAlreadyAllocate =[],
        alreadyAllocate =[];

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
                var titleData, titleEditData;
                if(data.length>0){

                    for(var i=0;i<data.length;i++){
                        var curData = data[i];
                        curData.audit_opinion = curData.audit_opinion || '暂无任何意见';

                        curData.allocate_time = curData.allocate_time ? String(curData.allocate_time).substring(0, 10) : '—';
                        curData.audit_time = curData.audit_time ? String(curData.audit_time).substring(0,10) : '—';
                        curData.repair_over_time = curData.repair_over_time ? String(curData.repair_over_time).substring(0,10) : '——';
                        curData.repair_time = curData.repair_time ? String(curData.repair_time).substring(0,10) : '—';

                        curData.view = '<span class="contri-see" data-id="'+curData.docu_id+'">查看审稿意见</span>';
                        curData.upload = '<span class="contri-upload" data-id="'+curData.docu_id+'">下载稿件</span>';

                        curData.look = '<span class="contri-look" data-id="'+curData .docu_id+'" data-title="'+curData.chineseTitle+'">审稿人</span>';
                        curData.operate = '<span class="contri-operate" data-id="'+curData .docu_id+'" data-title="'+curData.chineseTitle+'">稿件操作</span>';
                        curData.distribution = '<span class="contri-distribution" data-id="'+curData.docu_id+'" data-title="'+curData.chineseTitle+'">稿件分配</span>';

                        curData.chineseTitle ='<span class="contri-title" data-id="'+curData.docu_id+'">'+curData.chineseTitle+'</span>';
                        curData.edit = '<input class="contri-edit-upload" type="file" name="file'+curData.id+'" value="上传修改稿"/><button class="edit-upload-btn" data-id="'+curData.docu_id+'">上传</button>';

                        if(curData.status==0){
                            curData.status = '待提交';
                        }else if (curData.status==1){
                            curData.status = '已提交';

                        } else if (curData.status==2 || curData.status==3){
                            curData.status = '审稿中';
                        } else if (curData.status==4){
                            curData.status = '已采纳';
                        } else if (curData.status==5){
                            curData.status = '不宜采纳';
                        } else if (curData.status==6){
                            curData.status = '待修改';
                            noAlreadyEdit.push(curData);
                        }else {
                            curData.status = '已提交';
                        }

                        // //未审稿件，已审稿件
                        // if(curData.status==2||curData.status==3){
                        //     noAlreadyReview.push(curData);
                        // }else if(curData.status==4||curData.status==5||curData.status==6) {
                        //     alreadyReview.push(curData);
                        // }
                        // //待分配稿件，已分配稿件
                        // if(curData.status==1||curData.status==7){
                        //     noAlreadyAllocate.push(curData);
                        // }else if(curData.status==2||curData.status==3||curData.status==4||curData.status==5||curData.status==6) {
                        //     alreadyAllocate.push(curData);
                        // }
                        noAlreadyReview.push(curData);
                        alreadyReview.push(curData);
                        noAlreadyAllocate.push(curData);
                        alreadyAllocate.push(curData);


                    }

                    var alContribution =$('.al-contribution');
                    var noContribution =$('.no-contribution');
                    if(data.length>5){
                        titleData=data.slice(0,5);
                    }else {
                        titleData=data;
                    }
                    bindData(titleData, alContribution);
                    if(noAlreadyEdit.length>5){
                        titleEditData=noAlreadyEdit.slice(0,5);
                    }else {
                        titleEditData=noAlreadyEdit;
                    }
                    // var alContribution =$('.al-contribution');
                    // var noContribution =$('.no-contribution');
                    bindData(titleEditData, noContribution);
                    contriData(data,username);
                    contriDataModify(noAlreadyEdit,username);

                    noReviewData(noAlreadyReview,username);
                    alreadyReviewData(alreadyReview,username);

                    // noAlreadyAllocateData(noAlreadyAllocate,username);
                    nameListData(noAlreadyAllocate,username);
                    alreadyAllocateData(alreadyAllocate,username);


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
    $('.review-news').append(str);
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
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 20});
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
        if(cid>0){
            $.ajax({
                type: "POST",
                url: url + "Document/showOpinion",
                data: {
                    username: username,
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
                            var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data.data, maxline: 15});

                            aHtml.push(oNewTable.init());
                        }else {
                            aHtml = '暂无审稿意见';
                        }
                        $('.popup-edit').html(aHtml);
                        popup.popupEvent(function () {
                            $('.popup').remove();
                        });
                    }else {
                        alert(data.info);
                    }
                },
                error: function () {
                    alert('服务器开小差，请稍候再试');
                }
            });
        }else {
            popup.init();
            var tHtml = [],aHtml= [];
            tHtml.push('<span class="popup-title">审稿意见</span><i class="popup-close">x</i>');
            $('.popup-header').html(tHtml.join(''));
            aHtml = '暂无审稿意见';
            $('.popup-edit').html(aHtml);
            popup.popupEvent(function(){
                $('.popup').remove();
            });
        }



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
        {id: 'edit', title: '上传修稿'}
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

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

    //点击上传修改稿件
    $('.edit-upload-btn').on('click', function () {
        var fileSrc = ($(this).siblings())[0].files[0];
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
            beforeSend: function () {
                $('.edit-upload-btn').attr('disabled', 'disabled');
                $('.edit-upload-btn').css({"background": "#ccc"});
            },
            success: function (data) {

                if(data.status==1){
                    alert('上传成功');
                    window.location.reload();

                }else {
                    alert(data.info);
                }
            },
            complete: function () {
                $('.edit-upload-btn').removeAttr('disabled');
                $('.edit-upload-btn').css({"background": "#fff"});
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });
    });


    //点击查看审核意见
    $('.user-detail-contribution-modify .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        $.ajax({
            type: "POST",
            url: url + "Document/showOpinion",
            data: {
                username:username,
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
                        var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data.data, maxline: 15});

                        aHtml.push(oNewTable.init());
                    }else {
                        aHtml = '暂无审稿意见';
                    }
                    $('.popup-edit').html(aHtml);
                    $('.popup-footer').html('');
                    popup.popupEvent(function () {
                        $('.popup').remove();
                    });
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
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
   $('.user-contribute-author').html(aHtml);
}

//稿件详情--审稿阶段
function contriStage(data) {

    var aTitles = [{id: 'vesion', title: '审稿阶段'},
        {id: 'allocate_time', title: '送审时间'},
        {id: 'audit_time', title: '审回时间'},
        {id: 'repair_time', title: '退修时间'},
        {id: 'repair_over_time', title: '修回时间'},
        {id: 'upload', title: '下载修改稿'},
        {id: 'view', title: '意见'},
    ];
    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
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

                // //权限逻辑管理
                // var identity = data.data[0].identity;
                // if('contribute'.indexOf(identity)>-1){
                //     $('.title-contribute').addClass('user-block');
                //
                // }else if('audit'.indexOf(identity)>-1){
                //     $('.title-audit').addClass('user-block').addClass('on').siblings().removeClass('on');
                //
                // }else if ('editor'.indexOf(identity)>-1){
                //     $('.title-editor').addClass('user-block').addClass('on').siblings().removeClass('on');
                //
                // }else if ('manager'.indexOf(identity)>-1){
                //     $('.title-manager').addClass('user-block').addClass('on').siblings().removeClass('on');
                // }

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

//进行上传头像
function uploadImg(username) {
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
    $('.review-person-info').html(pHtml);
    $('.edit-person-info').html(pHtml);


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

//个人信息编辑接口
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

//渲染修改密码
function renderPwd(username) {
    var rhtml = [];
    rhtml.push('<div class="user-detail-pwd-list">');
    rhtml.push('<p><label>旧密码</label><input type="password" class="user-old-pwd"/> <span class="old-pwd-error pwd-error"></span></p>');
    rhtml.push('<p> <label>新密码</label><input type="password"  class="user-new-pwd"/> <span class="new-pwd-error pwd-error"></span></p>');
    rhtml.push(' <p> <label>确认密码</label><input type="password"  class="user-confirm-pwd"/> <span class="confirm-pwd-error pwd-error"></span></p>');
    rhtml.push('</div>');
    rhtml.push('<div class="pwd-edit-btn"> <span class="edit-btn-cancel">取消</span> <span class="edit-btn-confirm pwd-confirm">提交</span></div>');

    $('.user-person-pwd').html(rhtml);
    $('.review-person-pwd').html(rhtml);
    $('.edit-person-pwd').html(rhtml);

    modifyPwd(username);
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
                   $('.user-detail-pwd-list').append('<p class="pwd-error">'+data.info+'</p>');

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
function applyReview(username){
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
            username: username,
            major: major,
            education: education,
            positio: positio,
            field: field,
            gain: gain,
            direction: direction,
            name: name,
            bank: bank,
            account: account,
            target: 'audit'
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
            url: url +"Form/applyIdentity",
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

//住宿登记
function resHotel(username) {
    var ok1=false;
    var ok2=false;
    var ok3=false;
    $('.val-hotel-name').focus(function(){
        $('.pwd-error').html('');
    }).blur(function(){
        var name = $.trim($('.val-hotel-name').val());
        if(name==''){
            $('.pwd-error').html('真实姓名');

        }else{
            $('.pwd-error').html('输入成功').addClass('res-success');
            ok1=true
        }
    });
    $('.val-hotel-phone').focus(function(){
        $('.pwd-error').html('');
    }).blur(function(){
        var phone = $.trim($('.val-hotel-phone').val());
        if(!(/^1[3456789]\d{9}$/.test(phone))){
            $('.pwd-error').html('请填写11位数字的电话号码');

        }else{
            $('.pwd-error').html('输入成功').addClass('res-success');
            ok2=true
        }
    });
    $('.val-card').focus(function(){
        $('.pwd-error').html('');
    }).blur(function(){
        var card = $.trim($('.val-card').val());
        if(card){
            $('.pwd-error').html('请填写你的身份证号');

        }else{
            $('.pwd-error').html('输入成功').addClass('res-success');
            ok3=true
        }
        });
    $('.hotel-btn-confirm').on('click', function () {
        if(ok1&&ok2&&ok3){
            var name =  $.trim($('.val-hotel-name').val());
            var sex = $('.doc-content-res-sex option:selected').val();//选中的值;
            var phone = $.trim($('.val-hotel-phone').val());
            var card = $.trim($('.val-card').val());
            $.ajax({
                type: "POST",
                url: url +"Manage/signForStay",
                data: {
                    username: username,
                    name: name,
                    sex: sex,
                    phone: phone,
                    card: card
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        alert('设置成功');
                        window.location.reload();
                    } else {
                        $('.hotel-confirm-error').html(data.info);
                        return false;
                    }
                },
                error: function () {
                    alert('网路不给力，请稍候再试');
                }

            })
        }
    })
}


//未审稿件
function noReviewData(data,username) {
    var ele= $('.already-review');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'status', title: '稿件状态'},
        {id: 'allocate_time', title: '送审时间'},
        {id: 'audit_time', title: '审回时间'},
        {id: 'upload', title: '操作'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    //点击某一个标题进入当前稿件的详情
    $('.already-review .contri-title').on('click', function () {
        var _this = $(this);
        // ele.addClass('hide');
        var id = _this.attr('data-id');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">审稿评价</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml.push(' <p style="height: 26px;line-height: 26px;"> <label>创新型:</label> <input type="radio" name="creative" value="很高">很高 <input type="radio" name="creative" value="较高">较高 <input type="radio" name="creative" value="一般">一般 <input type="radio" name="creative" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"><label>应用型:</label> <input type="radio" name="application" value="很高">很高<input type="radio" name="application" value="较高">较高 <input type="radio" name="application" value="一般">一般 <input type="radio" name="application" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"> <label>中文摘要写作水平:</label> <input type="radio" name="chinese-level" value="很高">很高 <input type="radio" name="chinese-level" value="较高">较高 <input type="radio" name="chinese-level" value="一般">一般 <input type="radio" name="chinese-level" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"> <label>英文摘要写作水平:</label> <input type="radio" name="english-level" value="很高">很高 <input type="radio" name="english-level" value="较高">较高 <input type="radio" name="english-level" value="一般">一般 <input type="radio" name="english-level" value="低">低 </p>');
        aHtml.push('<p style="height: 26px;line-height: 26px;"><label>论文总体评价:</label><input type="radio" name="evaluate" value="很好">很好 <input type="radio" name="evaluate" value="较好">较好 <input type="radio" name="evaluate" value="一般">一般 <input type="radio" name="evaluate" value="差">差 </p>');
        aHtml.push(' <p> <label>具体意见:</label> <textarea name="" id="" cols="40" rows="5"></textarea> </p>');
        $('.popup-edit').html(aHtml);

        popup.popupEvent(function() {
            var _this = $('.popup-confirm');
            var data =[];
            $.ajax({
                url: url + 'Document/audit',
                data: data,
                type: 'POST',
                dataType: 'json',
                before: function () {
                    _this.attr("disabled", true);
                    _this.css({"background": "#ccc"});
                },
                success: function (res) {
                    _this.attr("disabled", false);
                    _this.css({"background": "#20c2d2"});
                    if (res.status == 0) {
                        $('.popup').remove();
                        $('.popup-confirm').removeClass('confirming');
                        window.location.reload();
                    } else {
                        $('.red').html(res.msg);
                    }
                },
                error: function () {
                    _this.attr("disabled", false);
                    _this.css({"background": "#20c2d2"});
                    $('.red').html('服务器开小差，请重试');
                }
            });
        });
    });

    //下载稿件
    $('.contri-upload').on('click', function () {
        var cid = $(this).attr('data-id');
        // window.open('http://ndac.env.tsinghua.edu.cn' + '/app/data/'+cid);
        window.open('http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099' + '/app/data/'+cid);
    });

}


//已审稿件
function alreadyReviewData(data,username) {
    var ele= $('.no-already-review');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'status', title: '稿件状态'},
        // {id: 'allocate_time', title: '送审时间'},
        {id: 'audit_time', title: '审回时间'},
        {id: 'view', title: '意见'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    //点击查看审核意见
    $('.no-already-review .contri-see').on('click', function () {
        var _this = $(this);
        var cid = _this.attr('data-id');
        $.ajax({
            type: "POST",
            url: url + "Document/showOpinion",
            data: {
                username:username,
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
                        var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data.data, maxline: 15});

                        aHtml.push(oNewTable.init());
                    }else {
                        aHtml = '暂无审稿意见';
                    }
                    $('.popup-edit').html(aHtml);
                    $('.popup-footer').html('');
                    popup.popupEvent();
                } else {
                    alert(data.info);
                }
            },
            error: function () {
                alert('服务器开小差，请稍候再试');
            }
        });


    });
}

//审稿名单数据获取
function nameListData(adatas,username) {
    $.ajax({
        type: "POST",
        url:  url +"Form/showAuditUser",
        data: {
            username: username,
        },
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                var data = data.data;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var curData = data[i];
                        curData.checkBox = '<input type="checkbox" class="contri-checkbox" name="namelist" value="'+curData.name+'"/>';

                    }
                    noAlreadyAllocateData(adatas,username,data);
                    var ele= $('.name-list');
                    var aTitles = [{id: 'name', title: '姓名'},
                        {id: 'chineseTitle', title: '职称'},
                        {id: 'school', title: '院校'},
                        {id: 'theme', title: '研究主题'},
                    ];

                    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
                    var aHtml = [];
                    aHtml.push(oNewTable.init());
                    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
                    ele.html(aHtml);
                } else {
                    console.log(data.info);

                }
            }
        }
    });
}




//待分配稿件
function noAlreadyAllocateData(data,username,adatas) {
    var ele= $('.edit-no-allocate');
    var siblingEle= $('.edit-no-allocate-detail');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'create_time', title: '投稿时间'},
        {id: 'distribution', title: '稿件分配'},
        {id: 'operate', title: '稿件操作'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    //点击某一个标题进入当前稿件的详情
    $('.edit-no-allocate .contri-title').on('click', function () {
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

    // //点击查看审核意见
    // $('.edit-no-allocate .contri-see').on('click', function () {
    //     var _this = $(this);
    //     var cid = _this.attr('data-id');
    //     $.ajax({
    //         type: "POST",
    //         url: url + "Document/showOpinion",
    //         data: {
    //             username:username,
    //             docu_id: cid
    //         },
    //         dataType: 'json',
    //         success: function (data) {
    //             if(data.status==1){
    //
    //                 popup.init();
    //                 var tHtml = [],aHtml= [];
    //                 tHtml.push('<span class="popup-title">审稿意见</span><i class="popup-close">x</i>');
    //                 $('.popup-header').html(tHtml.join(''));
    //                 if(data.data && data.data.length>0){
    //                     var aTitles = [{id: 'audit_user', title: '审批人'},
    //                         {id: 'audit_opinion', title: '意见'},
    //                         {id: 'version', title: '版本'}
    //                     ];
    //                     var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data.data, maxline: 15});
    //
    //                     aHtml.push(oNewTable.init());
    //                 }else {
    //                     aHtml = '暂无审稿意见';
    //                 }
    //                 $('.popup-edit').html(aHtml);
    //                 $('.popup-footer').html('');
    //                 popup.popupEvent();
    //             } else {
    //                 alert(data.info);
    //             }
    //         },
    //         error: function () {
    //             alert('服务器开小差，请稍候再试');
    //         }
    //     });
    //
    //
    // });

    //点击分配审稿人
    $('.edit-no-allocate .contri-distribution').on('click', function () {
        var _this = $(this);
        // var cid = _this.attr('data-id');
        var chineseTitle = _this.attr('data-title');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">审稿人名单</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        if(adatas && adatas.length>1){
            var aTitles = [{id: 'checkBox', title: '分配'},
                {id: 'name', title: '姓名'},
                {id: 'version', title: '职称'},
                {id: 'school', title: '院校'}
            ];
            var oNewTable = new CreateTable({aTitles: aTitles, aDatas: adatas, maxline: 15});

            aHtml.push(oNewTable.init());
        } else {
            aHtml = '缺少审稿人';
        }
        $('.popup-edit').html(aHtml);
        popup.popupEvent(function () {
            var target = [];
            var num=0;
            $('input[name="namelist"]:checked').each(function(i){
                num++;
                var item = {};
                item.name = $(this).val();
                target.push(item);
            });
            if(num==2){
                $.ajax({
                    type: "POST",
                    url:  url +"Document/distribute",
                    data: {
                        username: username,
                        document: chineseTitle,
                        target: JSON.stringify(target)
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            $('.popup').remove();
                            window.location.reload();
                        } else {
                            alert(data.info);
                        }
                    },
                    error: function () {
                        alert('服务器开小差，请稍候再试');
                    }
                })
            }else {
                alert('有且仅能选择两个审稿人')
            }
        });

    });


    // 编辑操作
    $('.edit-no-allocate .contri-operate').on('click', function () {
        var _this = $(this);
        // var cid = _this.attr('data-id');
        var chineseTitle = _this.attr('data-title');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">稿件审核</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml.push('<p><label>选择：</label><select><option>拒稿</option></select>');
        $('.popup-edit').html(aHtml);
        popup.popupEvent(function () {
            $.ajax({
                type: "POST",
                url:  url +"Document/handle",
                data: {
                    username: username,
                    document: chineseTitle,
                    status: ''
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        $('.popup').remove();
                        window.location.reload();
                    } else {
                        alert(data.info);

                    }
                },
                error: function () {
                    alert('服务器开小差，请稍候再试');
                }
            })
        });

    });
}

//已分配稿件
function alreadyAllocateData(data,username) {
    var ele= $('.edit-allocate');
    var aTitles = [{id: 'docu_id', title: '稿件编号'},
        {id: 'chineseTitle', title: '标题'},
        {id: 'create_time', title: '投稿时间'},
        {id: 'look', title: '查看审稿人'},
        {id: 'operate', title: '稿件操作'},
    ];

    var oNewTable = new CreateTable({aTitles: aTitles, aDatas: data, maxline: 15});
    var aHtml = [];
    aHtml.push(oNewTable.init());
    // aHtml.push('<div class="edit-btn"><span class="edit-btn-confirm contri-btn">提交</span> </div>');
    ele.html(aHtml);

    // 编辑操作
    $('.edit-allocate .contri-operate').on('click', function () {
        var _this = $(this);
        // var cid = _this.attr('data-id');
        var chineseTitle = _this.attr('data-title');
        popup.init();
        var tHtml = [],aHtml= [];
        tHtml.push('<span class="popup-title">稿件审核</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        aHtml.push('<p><label>选择：</label><select><option>采纳</option><option>返修</option><option>拒稿</option></select>');
        $('.popup-edit').html(aHtml);
        popup.popupEvent(function () {
            $.ajax({
                type: "POST",
                url:  url +"Document/handle",
                data: {
                    username: username,
                    document: chineseTitle,
                    status: ''
                },
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        $('.popup').remove();
                        window.location.reload();
                    } else {
                        alert(data.info);

                    }
                },
                error: function () {
                    alert('服务器开小差，请稍候再试');
                }
            })
        });

    });
}

//管理员中心
function dateEdit(username) {
    var flag= false;
    $('.date-edit-start').on('click', function () {
        $('.manage-date input').attr('disabled', false);
        flag = true;
    });
    $('.manage-date-confirm').on('click', function(){
        if(flag){
            var dateDatas = {};
            dateDatas.paperEnd =$.trim($('.manage-date-paper-end').val());
            dateDatas.paperHire =$.trim($('.manage-date-paper-hire').val());
            dateDatas.allPaperEnd =$.trim($('.manage-date-allpaper-end').val());
            dateDatas.allPaperDate =$.trim($('.manage-date-allpaper-day').val());
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
                        $('.manage-date input').attr('disabled', true);
                        flag = false;
                        window.location.reload();
                    }else {
                        console.log(data.info);
                    }
                }

            });
        }
    });
    $('.manage-date-cancel').on('click', function () {
        $('.manage-date input').attr('disabled', true);
        flag = false;
    })
}
