/*
 本地：fis3 release debug-pc -wL   //-wL可选
 发布代码：fis3 release -cud ./output
 */

// 支持 mod 模块
// 组件包名称

fis.hook('module', {
    mode: 'commonJs',
    globalAsyncAsSync: false
});

// npm install -g fis3-hook-relative
fis.hook('relative');

// fis.match('*.{tpl,html,js,less,css}', {
// useSameNameRequire: true
// });

// 让所有文件，都使用相对路径。
fis.match('**', {
    relative: true
});
//
// // 压缩所有 js
// fis.match('**.js', {
//     useHash: true,
//     optimizer: fis.plugin('uglify-js')
// });
//
// // css 去空白去注释
// fis.match('**.{css,less}', {
//     useHash: true,
//     optimizer: fis.plugin('clean-css')
// });
//
// // less 预编译为 css
// fis.match('**.less', {
//     rExt: '.css', // from .less to .css
//     parser: fis.plugin('less-2.x', {
//         // fis-parser-less-2.x option
//     })
// });
//
// // 压缩 png
// fis.match('*.png', {
//     optimizer: fis.plugin('png-compressor')
// });
//
// // .min.js 后缀的不需要压缩
// fis.match('*.min.js', {
//     optimizer: null
// });
//
// fis.match('/page/(**.html)', {
//     release: '/$1'
// });
//
// fis.match('/static/(**/img/**)', {
//     useHash: true,
//     release: '/static/$1'
// });
//
//
// fis.match('/static/common/**.{css,less}', {
//     packTo: '/$1/common.css'
// });
//
// fis.match('/static/common/**.js', {
//     //isMod: true
//     isMod: false
// });
//
// fis.match('/widget/**.js', {
//     isMod: false,
//     pageOrder:-100
// });
//
// fis.match('/static/(*)/**.{js,es}', {
//     isMod: true
// });
//
//
// fis.match('{/static/common/**,/widget/**}.{js,es}', {
//     packTo: '/$1/common.js'
// });
//
//
//
// fis.match('::packager', {
//     // npm install -g fis3-postpackager-loader
//     // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
//     postpackager: fis.plugin('loader', {
//         resourceType: 'mod',
//         useInlineMap: true // 资源映射表内嵌
//
//     }),
//     packager: fis.plugin('map'),
//     spriter: fis.plugin('csssprites', {
//         layout: 'matrix',
//         margin: '15'
//     })
//
// });
//
// fis.match("/{build.sh}", {
//     optimizer: null,
//     useCache: false,
//     useHash: false,
//     release: false
// });
//
// fis.match("/{*.sh,BCLOUD}", {
//     release: false
// });
//
// fis.match("/{doc,mockup,test,material,html,output,output-*}/**", {
//     release: false
// });


// DEPLOY(WAP) ---- ！！！部署线上WAP版（千万不能删除，修改需谨慎）！！！
fis.media('deploy').match('**', {
    release: '$0',
    deploy: [
        fis.plugin('local-deliver', {
            to: './webroot/static/qstore'
        })
    ]
});

// RD(WAP) ---- 编译WAP版到RD开发机
fis.media('rd').match('**', {
    release: '$0',
    /*useHash: false,
     useSprite: false,
     optimizer: null,*/
    deploy: [
        fis.plugin('http-push', [
            // 
            {
                // receiver: 'http://cp01-rdqa-dev428.cp01.baidu.com:8778/static/receiver.php',
                receiver: 'http://yf-rdqa-dev064-sunxuebin.epc.baidu.com:8099/receiver.php',
                // to: '/home/users/guxuxin/odp/webroot/static/qstore'
                to: '/home/users/sunxuebin/sunxuebin/thinkphp/ThinkPHP/app/Tpl/Form'
            }
        ][0])
    ]
});

// WAP ---- 编译WAP版到本地
fis.media('debug-pc').match('**', {
    release: '$0',
    packTo: false,
    useHash: false,
    useSprite: false,
    optimizer: null,
    deploy: [
        fis.plugin('local-deliver')
    ]
});