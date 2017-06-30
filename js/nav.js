/**
 * Created by zhouhui on 2017/4/21.
 */

$(function () {
    var listIndex =null;
    var menuList=$('.nav-menu-list');

    menuList.on('click',function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    menuList.hover(function () {
        listIndex =$('.active').attr('data-index');

        $(this).addClass('active').siblings().removeClass('active');
    },function () {
        menuList.eq(listIndex-1).addClass('active').siblings().removeClass('active');
    });

});