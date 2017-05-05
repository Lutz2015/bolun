/**
 * Created by v_zhouhui on 2017/4/21.
 */

$(function () {
    $('.nav-menu-list').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // document.body.onmouseover =function (e) {
    //     e = e || window.event;
    //     var tar = e.target || e.srcElement;
    //     if(tar.id==='' || tar.id==='nav-meeting-detail'){
    //         $('.nav-menu-list-content').removeClass('hide');
    //     }else {
    //         $('.nav-menu-list-content').addClass('hide');
    //     }
    // }
    // }
    $('.nav-menu-meeting').hover(function () {
        $('.nav-menu-list-content').removeClass('hide');
    },function () {
        $('.nav-menu-list-content').addClass('hide');
    })
});