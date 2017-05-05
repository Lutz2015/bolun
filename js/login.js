




//登录 注册逻辑
$(function() {
    //tab切换
    var url = "http://cq01-rdqa-dev064.cq01.baidu.com:8099/app/index.php/";
    function loginTab() {
        var hash;
        //没有锚点默认为-->登录项
        hash=(!window.location.hash) ? "#login" : window.location.hash;
        // window.location.hash=hash;
        var loginTitle =  $('.doc-content-title-login');
        var resTitle =   $('.doc-content-title-res');
        var loginInfo =   $('.doc-content-login-info');
        var resInfo =   $('.doc-content-res-info');
        switch(hash){
            case "#login":
                loginTitle.addClass('active');
                resTitle.removeClass('active');
                resInfo.addClass('hide');
                loginInfo.removeClass('hide');
                break;
            case "#register":
                resTitle.addClass('active');
                loginTitle.removeClass('active');
                resInfo.removeClass('hide');
                loginInfo.addClass('hide');
                break;
            default:
                loginTitle.addClass('active');
                resTitle.removeClass('active');
                resInfo.removeClass('hide');
                loginInfo.addClass('hide');
        }
        var oBtns = $('.title-btn');
        oBtns.on('click', function () {
            var tabNum =$(this).attr('data-tab');
            $(this).addClass('active').siblings().removeClass('active');
            if(tabNum==1){
                $('.doc-content-res-info').addClass('hide');
                $('.doc-content-login-info').removeClass('hide');
            }else {
                $('.doc-content-res-info').removeClass('hide');
                $('.doc-content-login-info').addClass('hide');
            }
        })
    }
    var ok1=false;
    var ok2=false;
    var ok3=false;
    var ok4=false;
    var ok5=false;
    var ok6=false;
    var ok7=false;
    var ok8=false;
    var ok9=false;
    var ok10=false;

    function bindEvent() {
        //注册

        $('.doc-content-res-username').focus(function(){
            $('.res-username-error').html('');
        }).blur(function(){
            var userName = $.trim($('.doc-content-res-username').val());
            if(userName==''){
                $('.res-username-error').html('请填写用户名');

            }else{
                $('.res-username-error').html('输入成功').addClass('res-success');
                ok1=true
            }
        });
        $('.doc-content-res-email').focus(function(){
            $('.res-email-error').html('');
        }).blur(function(){
            // 验证用户名
            var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            var email = $.trim($('.doc-content-res-email').val());
            if(!(emailReg.test(email)) || email == ''){
                $('.res-email-error').html('请填写正确格式的邮箱');

            }else{
                $('.res-email-error').html('输入成功').addClass('res-success');
                ok2=true
            }
        });
        $('.doc-content-res-pwd').focus(function(){
            $('.res-pwd-error').html('');
        }).blur(function(){
            var password = $('.doc-content-res-pwd').val();
            var email = $.trim($('.doc-content-res-email').val());
            if(password.length<6 || password == ''){
                $('.res-pwd-error').html('请设置6位以上的密码');

            }else{
                $('.res-pwd-error').html('输入成功').addClass('res-success');
                ok3=true
            }
        });
        $('.doc-content-res-dpwd').focus(function(){
            $('.res-dpwd-error').html('');
        }).blur(function(){
            var password = $('.doc-content-res-pwd').val();
            var dpwd = $('.doc-content-res-dpwd').val();
            if(dpwd!=password || dpwd==''){
                $('.res-dpwd-error').html('请再次确认你的密码');

            }else{
                $('.res-dpwd-error').html('输入成功').addClass('res-success');
                ok4=true
            }

        });
        $('.doc-content-res-name').focus(function(){
            $('.res-name-error').html('');
        }).blur(function(){
            var stuName = $.trim($('.doc-content-res-name').val());
            if(stuName==''){
                $('.res-name-error').html('请填写你的名字');

            }else{
                $('.res-name-error').html('输入成功').addClass('res-success');
                ok5=true
            }

        });
        $('.doc-content-res-docname').focus(function(){
            $('.res-docname-error').html('');
        }).blur(function(){
            var docName = $.trim($('.doc-content-res-docname').val());

            if(docName==''){
                $('.res-docname-error').addClass('请填写你导师的姓名');

            }else{
                $('.res-docname-error').html('输入成功').addClass('res-success');
                ok6=true
            }

        });
        $('.doc-content-res-phone').focus(function(){
            $('.res-phone-error').html('');
        }).blur(function(){
            var phone = $.trim($('.doc-content-res-phone').val());
            if(!(/^1[3456789]\d{9}$/.test(phone))){
                $('.res-phone-error').html('请填写11位数字的电话号码');

            }else{
                $('.res-phone-error').html('输入成功').addClass('res-success');
                ok7=true
            }


        });

        $('.doc-content-res-text').focus(function(){
            $('.res-addressText-error').html('');
        }).blur(function(){
            var addressText = $.trim($('.doc-content-res-text').val());
            if(addressText==''){
                $('.res-addressText-error').html('请填写你的详细地址');

            }else{
                $('.res-addressText-error').html('输入成功').addClass('res-success');
                ok8=true
            }

        });

            $('.doc-content-restext').on('click', function () {
                if(ok1 && ok2 && ok3 && ok4 &&ok5 && ok6 && ok7 && ok8){
                // 验证用户名
                var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                var userName = $.trim($('.doc-content-res-username').val());
                var email = $.trim($('.doc-content-res-email').val());
                var password = $('.doc-content-res-pwd').val();
                var sex = $('.doc-content-res-sex option:selected').val();//选中的值;
                var birthDate = ($('.doc-content-res-date').val()).replace(/-/g,"");
                var school = $('.doc-content-res-school  option:selected').val();
                var userId = $.trim($('.doc-content-res-stuid').val());
                var stuName = $.trim($('.doc-content-res-name').val());
                var docName = $.trim($('.doc-content-res-docname').val());
                var phone = $.trim($('.doc-content-res-phone').val());
                //地址拼接
                var resProvince=$('.res-province option:selected').val();
                var resCity=$('.res-city option:selected').val();
                var resCounty=$('.res-county option:selected').val();
                var addressText = $.trim($('.doc-content-res-text').val());
                var address = resProvince +resCity+resCounty + String(addressText);

                var dpwd = $('.doc-content-res-dpwd').val();
                if(birthDate==''){
                    $('.res-date-error').html('请选择你的出身日期');
                    return false;
                }else{
                    $('.res-date-error').html('输入成功').addClass('res-success');

                }
                $.ajax({
                        type: "POST",
                        url: url+"Form/sign",
                        data: {
                            username: userName,
                            password: password,
                            email: email,
                            sex: sex,
                            birthDate: birthDate,
                            school: school,
                            userID: userId,
                            stuName: stuName,
                            docName: docName,
                            phone: phone,
                            address: address
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.status == 1) {
                                window.location.href = "../Form/login.html#login";
                                alert('注册成功，请进入到邮箱进行激活');
                            } else {
                                alert(data.info);
                                return false;

                            }

                        },
                        error: function () {
                            alert('对不起，当前服务器开小差，请稍候再试')
                        }

                    });
                }
            });


        //登录
        $('.doc-content-logintext').on('click',function () {
            //登录
            var uname = $.trim($('.doc-content-login-username').val());
            var upwd =$.trim($('.doc-content-login-pwd').val());
            if(uname && upwd){
                $.ajax({
                    type: "POST",
                    url: url +"Form/login",
                    data: {
                        username: uname,
                        password: upwd,
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            $.cookie('cookie_username', data.data.username);
                            window.location.href = "../Form/home.html";

                        } else {
                            $('.login-error-text').html(data.info).addClass('res-old');
                            return false;

                        }

                    }

                })

            }else{
                $('.login-error-text').html('请输入用户名和密码');
                return false;
            }

        });

    }





    //出生日期
    $('.form_datetime').datetimepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 2,
        pickerPosition: "bottom-left"
    });


    //找回密码
    $('.doc-content-forget-pwd').on('click',function () {
        popup.init();
        var tHtml = [], eHtml=[];
        tHtml.push('<span class="popup-title">找回密码</span><i class="popup-close">x</i>');
        $('.popup-header').html(tHtml.join(''));
        eHtml.push(' <ol class="edit-title-step">');
        eHtml.push('<li class="title-step-one active"><span>1、输入邮箱</span></li>');
        eHtml.push(' <li class="title-step-two"><span>2、修改密码</span></li>');
        eHtml.push(' <li class="title-step-three" ><span>3、完成</span></li>');
        eHtml.push('</ol>');
        eHtml.push('<div class="form-step form-step-one active">');
        eHtml.push(' <div class="form-group"> <label class="control-label">邮箱：</label> <input class="form-control edit-form-email" type="text" placeholder="请输入邮箱"></div>');
        eHtml.push(' <div class="form-group"> <label class="control-label">验证码：</label> <input class="form-control edit-form-code" type="text" placeholder="填写验证码"><span class="verify-code"></span><span class="change-code">换一张</span></div>');
        eHtml.push('<div class="form-group-error step-one-error"></div>');
        eHtml.push('<div class="form-group-btn"> <button  class="edit-btn-primary btn-primary btn-step-one">下一步</button> </div>');
        eHtml.push(' </div>');
        eHtml.push('<div class="form-step form-step-two">');
        eHtml.push(' <div class="form-group"> <label class="control-label">邮箱验证码：</label> <input class="form-control verify-code-confirm" type="text" placeholder="请输入邮箱验证码"></div> ');
        eHtml.push(' <div class="form-group"> <label class="control-label">新密码：</label> <input  class="form-control form-new-pwd" type="password" placeholder="请设置6位以上的密码"></div>');
        eHtml.push(' <div class="form-group"> <label class="control-label">确认新密码：</label> <input class="form-control form-new-dpwd" type="password" placeholder="请确认新密码"></div>');
        eHtml.push('<div class="form-group-error step-two-error"></div>');
        eHtml.push('<div class="form-group-btn"> <button  class="edit-btn-primary btn-primary btn-step-two">下一步</button> </div>');
        eHtml.push('</div>');
        eHtml.push(' <div class="form-step form-step-three">');
        eHtml.push('<div class="form-group"> <p class="three-text">密码重置成功！请用新密码登录：</p><p class="three-text"><span class="edit-btn-primary btn-login">立即登录</span> <a href="../From/home.html" class="home-callback-btn">返回首页</a></p></div>');
        eHtml.push('</div>');
        $('.popup-edit').html(eHtml.join(''));
        popup.popupEvent();
        var verifyCode = $('.verify-code');
        verifyCode.html(getCode());
        verifyCode.on('click', function () {
            verifyCode.html(getCode());
        });
        var okCode =false;
        $('.change-code').on('click', function () {
            verifyCode.html(getCode());
            $('.step-one-error').html('');
        });
        $('.edit-form-code').focus(function(){
            $('.step-one-error').html('');
        }).blur(function(){
            var editCode = $(this).val();
            if(editCode.toLowerCase()!=($('.verify-code').html()).toLowerCase()){
                $('.step-one-error').html('验证码错误');
                verifyCode.html(getCode());
                return false
            }

        });
        $('.btn-step-one').on('click', function () {
            var email =$.trim($('.edit-form-email').val());
            var emailReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if(!(emailReg.test(email)) || email == ''){
                $('.step-one-error').html('请填写正确格式邮箱');
                return false
            }
            $.ajax({
                type: "POST",
                data: {
                    email: email
                },
                url: url + "Form/resetPassword",
                dataType: 'json',
                success: function (data) {
                    if (data.status == 1) {
                        $('.form-step-two').addClass('active').siblings().removeClass('active');
                        $('.title-step-two').addClass('active');
                        bindTwoEvent(email);
                    } else {
                        $('.step-one-error').html(data.info);
                        return false;
                    }

                },
                error: function () {
                    alert('对不起，当前服务器开小差，请稍候再试')
                }

            });
        });


        function getCode() {
            var rangeStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";//-->索引0-61
            var str = "";
            while (str.length < 4) {
                var ran = Math.round(Math.random() * (61 - 0) + 0);
                var ranStr = rangeStr[ran];
                //如果大小写也不能重复
                var tempRan = ranStr.toLowerCase();
                var tempStr = str.toLowerCase();
                if (tempStr.indexOf(tempRan) === -1) {
                    str += ranStr;
                }
            }
            return str;
        }
        function bindTwoEvent(email) {
            $('.btn-step-two').on('click', function () {
                var code=$.trim($('.verify-code-confirm').val());
                var pwd=$('.form-new-pwd').val();
                var dpwd=$('.form-new-dpwd').val();
                if(dpwd!=pwd || dpwd=='' ||pwd.length<6){
                    $('.step-two-error').html('请确认你的密码');
                    return false
                }
                $.ajax({
                    type: "POST",
                    data: {
                        email: email,
                        code: code,
                        password: '939393'
                    },
                    url: url + "Form/confirmReset",
                    dataType: 'json',
                    success: function (data) {
                        if (data.status == 1) {
                            $('.form-step-three').addClass('active').siblings().removeClass('active');
                            $('.title-step-three').addClass('active');
                            $('.btn-login').on('click', function () {
                                $('.popup').remove();
                            });
                        } else {
                            $('.step-two-error').html(data.info);
                            return false;

                        }

                    },
                    error: function () {
                        alert('对不起，当前服务器开小差，请稍候再试')
                    }

                });
            });
        }


    });


    loginTab();
    bindEvent();
    _init_area();
});

