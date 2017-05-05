/**
 * Created by v_zhouhui on 2017/4/24.
 */
$(function () {
    //判断用户是否登录
    var url = "http://cq01-rdqa-dev064.cq01.baidu.com:8099/app/index.php/";
    var username= $.cookie('cookie_username');
    if(!username){
        $.ajax({
            type: "POST",
            url: url+ "Form/userInfo",
            dataType: 'json',
            success: function (data) {
                if(data.status==1){
                    $.cookie('cookie_username', data.data);
                    $('.web-nologin').addClass('hide');
                    $('.web-relogin').removeClass('hide');
                    $('.web-nametext').text(data.data);
                    quit();  //退出
                }else {
                    $('.web-nologin').removeClass('hide');
                    $('.web-relogin').addClass('hide');
                }
            }
        });
    }else  {
        $('.web-nologin').addClass('hide');
        $('.web-relogin').removeClass('hide');
        $('.web-nametext').text(username);
        quit();  //退出
    }

    //退出
    function quit() {
        $('.web-quit').on('click', function () {
            $.ajax({
                type: "POST",
                url: url + "Form/logout",
                dataType: 'json',
                success: function (data) {
                    if(data.status==1){
                        $('.web-nologin').removeClass('hide');
                        $('.web-relogin').addClass('hide');
                        $.cookie('cookie_username', '');
                        window.location.href = "../Form/login.html#login";
                    }else {
                        $('.web-nologin').addClass('hide');
                        $('.web-relogin').removeClass('hide');
                    }
                }
            })
        })
    }

});