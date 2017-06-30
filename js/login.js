




//登录 注册逻辑
$(function() {
    //tab切换
    var url = "http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/app/index.php/";
    // var url = "http://ndac.env.tsinghua.edu.cn/app/index.php/";
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
    var schoolData =[
        '清华大学','北京大学', '北京工业大学', '北京航空航天大学',
        '北京化工大学', '北京交通大学', '北京科技大学', '北京理工大学', '北京林业大学', '北京师范大学', '成都理工大学',
        '大连大学', '大连工业大学', '大连海事大学', '大连交通大学', '大连理工大学', '大连理工大学盘锦校区',
        '电子科技大学', '东北大学', '东北大学秦皇岛分校', '东北林业大学', '东北农业大学', '东北师范大学', '东华大学', '东南大学',
        '福州大学', '复旦大学', '广西大学', '广西师范大学', '广州大学', '贵州大学', '桂林理工大学', '哈尔滨工程大学',
        '哈尔滨工业大学', '哈尔滨工业大学(威海)', '海南大学', '合肥工业大学', '河北工业大学',
        '河北科技大学', '河海大学', '河南大学', '湖南大学', '湖南师范大学', '华北电力大学(保定)', '华北电力大学(北京)',
        '华东理工大学', '华东师范大学', '华南理工大学', '华南师范大学', '华中科技大学', '华中农业大学', '华中师范大学',
        '吉林大学', '暨南大学', '江南大学',
        '江苏大学', '解放军防化学院', '昆明理工大学', '兰州大学',
        '兰州交通大学', '辽宁大学', '辽宁工程技术大学', '辽宁石油化工大学', '南昌大学',
        '南京大学', '南京工业大学', '南京理工大学', '南京林业大学', '南京农业大学', '南京师范大学',
        '南开大学', '内蒙古大学', '内蒙古科技大学',
        '宁夏大学', '青岛大学', '青海大学', '厦门大学', '山东大学', '山东大学威海分校',
        '山西大学', '陕西师范大学', '上海大学', '上海交通大学', '上海理工大学', '沈阳大学',
        '沈阳化工大学', '沈阳建筑大学', '沈阳理工大学', '沈阳农业大学', '石河子大学', '四川大学', '四川农业大学',
        '苏州大学', '苏州科技学院', '太原理工大学', '天津城市建设学院',
        '天津大学', '天津工业大学', '同济大学', '武汉大学', '武汉纺织大学', '武汉工程大学', '武汉理工大学',
        '西安建筑科技大学', '西安交通大学', '西北大学', '西北工业大学', '西北农林科技大学', '西藏大学', '西南大学',
        '西南交通大学', '新疆大学', '延边大学', '云南大学', '长安大学', '长江大学',
        '浙江大学', '浙江工商大学', '浙江工业大学', '郑州大学', '中国地质大学(北京)', '中国地质大学(武汉)',
        '中国海洋大学', '中国环境科学研究院', '中国科学技术大学', '中国科学院成都山地灾害与环境研究所',
        '中国科学院城市环境研究所', '中国科学院大气物理研究所', '中国科学院地理科学与资源研究所', '中国科学院地球化学研究所',
        '中国科学院地球化学研究所', '中国科学院东北地理与农业生态研究所',
        '中国科学院广州地球化学研究所', '中国科学院广州能源研究所', '中国科学院海洋研究所',
        '中国科学院南海海洋研究所', '中国科学院南京地理与湖泊研究所',
        '中国科学院南京土壤研究所', '中国科学院上海高等研究院', '中国科学院沈阳应用生态研究所',
        '中国科学院生态环境研究中心', '中国科学院水生生物研究所',
        '中国科学院西北高原生物研究所', '中国科学院西北生态环境资源研究院',
        '中国科学院新疆生态与地理研究所', '中国矿业大学', '中国矿业大学(北京)', '中国农业大学',
        '中国农业科学院', '中国人民大学',
        '中国石油大学(北京)', '中国石油大学(华东)', '中国药科大学',
        '中南财经政法大学', '中南大学', '中山大学', '中央财经大学', '中央民族大学', '重庆大学', '重庆工商大学',
        '中国林业研究院'
    ];
    initData(schoolData);
    function initData(data) {
        var str='';
        for(var i=0;i<data.length;i++){
            // str+='<option  selected="selected">'+data[0]+'</option>';
            str+='<option>'+data[i]+'</option>';

        }
        $('.doc-content-res-school').html(str);

    }
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
                // var birthDate = ($('.doc-content-res-date').val()).replace(/-/g,"");
                var birthDate = $('.doc-content-res-date').val();
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
                        beforeSend: function () {
                            $('.doc-content-restext a').attr('disabled', 'disabled');
                            $('.doc-content-restext').css({"background": "#388e3c"});
                        },
                        success: function (data) {
                            if (data.status == 1) {
                                alert('注册成功，请进入到邮箱进行激活');
                                window.location.href = "../Form/login.html#login";

                            } else {
                                alert(data.info);
                                return false;

                            }

                        },
                        complete: function () {
                            $('.doc-content-restext a').removeAttr('disabled');
                            $('.doc-content-restext').css({"background": "#388e3c"});
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
                    beforeSend: function () {
                        $('.doc-content-logintext a').attr('disabled', 'disabled');
                        $('.doc-content-logintext').css({"background": "#ccc"});
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
                    },
                    complete: function () {
                        $('.doc-content-logintext a').removeAttr('disabled');
                        $('.doc-content-logintext').css({"background": "#388e3c"});
                    },

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
        var oneStep = $('.btn-step-one');
        oneStep.on('click', function () {
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
                beforeSend: function () {
                    oneStep.attr('disabled', 'disabled');
                    oneStep.css({"background": "#ccc"});
                },
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
                complete: function () {
                    oneStep.removeAttr('disabled');
                    oneStep.css({"background": "#0275d8"});
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
            var twoStep = $('.btn-step-two');
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
                        password: pwd
                    },
                    url: url + "Form/confirmReset",
                    dataType: 'json',
                    beforeSend: function () {
                        twoStep.attr('disabled', 'disabled');
                        twoStep.css({"background": "#ccc"});
                    },
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
                    complete: function () {
                        twoStep.removeAttr('disabled');
                        twoStep.css({"background": "#0275d8"});
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

