define(['common/jquery.min','common/config','common/md5','common/fastclick','common/layer'],function($,API,md5,fastClick){
/**
 * ajax post提交
 * @param url
 * @param param
 * @param datat 为html,json,text+
 * @param callback回调函数
 * @return
 */
var $ = jQuery;
var Stoken = I('stoken','');     //全局储存stoken
$.im=function(){var a=new Date();c=a.getTime(),b=md5(c+a.getFullYear().toString());return{"a":c,"b":b}};
//$.cookie
!function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=u.raw?n:r(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(r,c,a){if(void 0!==c&&!e.isFunction(c)){if(a=e.extend({},u.defaults,a),"number"==typeof a.expires){var s=a.expires,d=a.expires=new Date;d.setTime(+d+864e5*s)}return document.cookie=[n(r),"=",i(c),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var p=r?void 0:{},f=document.cookie?document.cookie.split("; "):[],m=0,v=f.length;v>m;m++){var x=f[m].split("="),k=o(x.shift()),l=x.join("=");if(r&&r===k){p=t(l,c);break}r||void 0===(l=t(l))||(p[k]=l)}return p};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}}(jQuery);

function jsonAjax(url, param) {
    var callback = arguments[2] ? arguments[2] : 'ajaxcallback';
    var type = arguments[3] ? arguments[3] : API.METHOD;
    var datat = arguments[4] ? arguments[4] : 'json';
    var len = (url.split('/')).length - 1;
    var lication = '';
    var ajaxinterface = url;
    if (len <= 1) {
        lication = API.APP_LICATION;
    }
    var ab = $.im(),_url;    //验证参数
    // url = API.SERVER_URL + lication + url+'?version='+API.VERSION+'&platform='+getDeviceType()+'&a='+ab.a+'&b='+ab.b+'&callback=?';  //服务器请求地址   jsonp
    
    if(url.indexOf('http://') == -1){
        _url = API.SERVER_URL + lication + url+'?version='+API.VERSION+'&platform='+getDeviceType()+'&a='+ab.a+'&b='+ab.b;
    }else {
        _url = url+'?version='+API.VERSION+'&platform='+getDeviceType()+'&a='+ab.a+'&b='+ab.b;
    }
    //app带上token和app版本号
    if(isQc()){
        _url = _url+'&appversion='+getAppVersion()+'&stoken='+Stoken;  //服务器请求地址
    }

    // if(isLogin()){  //如果登录重新设置cookie
    //     setLogin();
    // }
    var ajaxTimeout = $.ajax({
        type: type,    //请求方式  get  post
        url: _url,      //请求url
        timeout: API.TIMEOUT, //超时时间设置，单位毫秒 30秒
        data: JSON.stringify(param),    //请求参数
        dataType: datat,  //返回类型
        xhrFields: {
          withCredentials: true,
       },   //跨域请求设置XHR对象
        success: function (data, textStatus) {
            if(data.stoken){
                Stoken = data.stoken;
            }
            // 请求状态码处理
            if(data.ret==-10){  //强制登录
                goLogin();
                return false;
            }
            if (data.ret < 0) { 
                showTip(data.msg);
                // return false;
            }
            // //强制更新
            // if (data.status == -2) {
            //     showTip('onJsLoad', '{"status":"' + data.status + '","msg":"' + data.info + '","url":"' + data.data.url + '"}');
            //     return false;
            // }
            // console.log(JSON.stringify(data.data).replace(/:null/g),"\:");
            eval(callback(data));
            // setTimeout(function(){
            //     loadEnd();    //去掉遮罩
            // },300);
            
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            loadEnd();
            if (textStatus == 'timeout') {  //超时,status还有success,error等值的情况
                ajaxTimeout.abort();
                showTip( '请求超时,请稍后再试');
            }else{
                // console.log(XMLHttpRequest,textStatus,errorThrown);
                if(API.DEBUG==1){
                    showTip(ajaxinterface+" failed,code："+XMLHttpRequest.readyState+",errortext："+textStatus,3000);
                    // showTip("请求失败,请稍后再试",3000);
                }else{
                    showTip("请求失败,请稍后再试",3000);
                }
            }
        }
    });
}

 
/**
 * 获取url参数
 */
function I(name) {
    var def;  //默认值
    if (typeof(arguments[1]) == "undefined") {
        def = '';
    } else {
        def = arguments[1];
    }
    var param = window.location.search;  //URL参数
    if (param == '') {
        return def;
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = param.substr(1).match(reg);
    if (r == null) {
        return def;
    }

    return (decodeURIComponent(r[2]));
}


function H(name){     //获取url传参
    var def;  //默认值
    if (typeof(arguments[1]) == "undefined") {
        def = '';
    } else {
        def = arguments[1];
    }
    var param = window.location.hash;  //URL参数
    if (param == '') {
        return def;
    }else if (name == '#') {
        return param;
    }

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = param.substr(1).match(reg);
    if (r == null) {
        return def;
    }

return (decodeURIComponent(r[2]));
}
/*
如果是IOS端微信,无法直接修改title.
添加一个iframe,然后remove掉就能动态修改title.
 */
function titleReset(title) {
    document.title = title;
    if(isWeixin()){
        var $body = $('body');
        var $iframe = $('<iframe src="/favicon.ico" style="display:none;"></iframe>');
        $iframe.on('load', function (argument) {
            setTimeout(function () {
                $iframe.off('load').remove();
            },0);
        }).appendTo($body);
    }
}
/*
点击效果公用函数
在需要添加点击效果的节点上增加类“hv”
在样式表中增加hving(点击之后的样式变化)
 */
$(document).on('touchstart touchmove touchend touchcancel','.hv',function (e) {
    var o_hv = $(this);
    var dd_hv_start_X=0;
    var dd_hv_start_Y=0;
    var dd_hv_end_X=0;
    var dd_hv_end_Y=0;
    var dd_hv_move_X=0;
    var dd_hv_move_Y=0;
    if(e.type=='touchstart'){
        o_hv.addClass('hving');
        dd_hv_start_X = e.originalEvent.targetTouches[0].pageX;
        dd_hv_start_Y = e.originalEvent.targetTouches[0].pageY;

    }else if(e.type=='touchend'||e.type=='touchcancel'){
        o_hv.removeClass('hving');
    }else{
        dd_hv_end_X = e.originalEvent.targetTouches[0].pageX;
        dd_hv_end_Y = e.originalEvent.targetTouches[0].pageY;
        dd_hv_move_X = Math.abs(dd_hv_end_X-dd_hv_start_X);
        dd_hv_move_Y = Math.abs(dd_hv_end_Y-dd_hv_start_Y);
        if(dd_hv_move_Y>3||dd_hv_move_X>3){
            o_hv.removeClass('hving');
        }
    }
});
//阻止微信环境双击上跳
// $("div").on("touchstart",function(e){
//     e.preventDefault();
// });
// $("input,textarea").on("touchstart",function(){
//     $(this).focus();
// });

//页面禁止滑动
function preDefault() {
    event.preventDefault();
}
function forBidMove() { //禁止touchmove
    $("body").on("touchmove",preDefault);
}
function allowMove() {  //恢复touchmove
    $("body").off("touchmove",preDefault);
}

//显示提示
var is_tipstext_timeout;
function showTip(text){
    if($('.inputTipsText').length==0){
        $('body').append("<div class='inputTipsText hide'><div></div></div>");
    }
    if(typeof(arguments[1])!='number'){
        if(typeof(arguments[1])=='function'){
            var callback = arguments[1];
        }
            var time=arguments[2]||2000;
    }else{
        if(typeof(arguments[2])=='function'){
            var callback = arguments[2];
        }
            var time=arguments[1];
    } 
    if($('.inputTipsText').attr('class').indexOf('hide')>-1){   //当提示框隐藏时
        $('.inputTipsText>div').html(text);
        show(text);
      }else{    //提示框正在显示时
        clearTimeout(is_tipstext_timeout);  //清除上一个倒计时
        $('.inputTipsText>div').html(text);
        show(text);
    }
    function show(text){
        $('.inputTipsText').removeClass('hide');
        var len = text.length,slen=text.match(/\d|\w/g)==null?0:text.match(/\d|\w/g).length;
        var n=Math.ceil((len*2-slen)/26);
        var area = {"width":"15em","height":n*2+"em"};
        $(".inputTipsText>div").animate(
        area,200,function() {
            is_tipstext_timeout=setTimeout(function(){
              $(".inputTipsText>div").html("");
              $(".inputTipsText>div").animate(
              {"width": "0","height": "0"},200,function(){
                $('.inputTipsText').addClass('hide');
                if(callback){
                    callback();
                }
              });
            },time);
        });
    }
}
/*
获取访问终端类型
 */
function getDeviceType() {
    //判断访问终端
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (!(browser.versions.mobile || browser.versions.android || browser.versions.ios)) {
        return "pcweb";
    }else{
        return "mweb";
    }

    // if (browser.versions.android) {
    //     return "android";
    // }

    // if (browser.versions.ios) {
    //     return "ios";
    // }
}
/*
获取app版本
 */
function getAppVersion(){
    if(isQc()){
        var u = navigator.userAgent.toLowerCase();
        try{
            // var appversion=u.match(/qc51\/\d+\.\d+(\.\d+)?/)[0].replace(/qc51\//,"");
            var appversion=u.match(/version\d+\.\d+(\.\d+)?/)[0].replace("version","");
        }catch(e){}
        return appversion;
    }
}
/**
 * 判断是否是微信
 */
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
/**
 * 判断是否IOS启程app
 */
function isQc(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("qc51")>-1) {
        return true;
    } else {
        return false;
    }
}
/**
 * 判断是否Android启程app
 */
function isQcAndroid(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("qcandroid")>-1) {
        return true;
    } else {
        return false;
    }
}
/**
 * 判断是否为空
 */
function empty(data) {
    if (typeof data == 'object') {
        var keys=Object.keys(data)||Object.getOwnPropertyNames(data);
        if (keys.length==0) {
            return true;
        }
    } else if (typeof data == 'array') {
        if (data.length == 0) {
            return true;
        }
    } else if (typeof data == 'string') {
        if (data == ''||data.length == 0||data=='undefined') {
            return true;
        }
    } else if (typeof data == 'undefined'){
        return true;
    }
    return false;
}

/**
 * 页面重定向
 */
function redirect(url) {
    if (url == '' || typeof(url) == 'undefined') {
        url = '/mobile/index.html';
    }
    var param = arguments[1] ? arguments[1] : M();

    if(I('share')==1){
       param.share = 1; 
    }

    for(var i in param){
        param[i] = encodeURIComponent(param[i]);
    }

    if (!empty(param)) {
        if(typeof(param)=='object'){
            param=JSON.stringify(param).replace(/\{|\}|\"|\'/g,'').replace(/,/g,'&').replace(/:/g,'=');
        }else{
            try{
                param=param.toString().replace(',','&').replace(/:/g,'=').replace(/\"|\'/g,'');
            }catch(e){}
        }
    }else{
        param = "";
    }

    if(url.indexOf("?")>-1){
        url=url+param;
    }else{
        url=url+"?"+param;
    }

    // 处理iframe中跳转。
    // setTimeout(function(){
        if (param.goParent != '' && typeof(param.goParent) != "undefined") {
            parent.location.href = url;
        } else {
            location.href = url;
        }
    // },300);
}
/*
 * 数字人性化显示
 */
function humanNumber(str) {
    var format = { 5:[10000, '万'],6:[10000, '万'],7:[10000, '万'],8:[10000, '万'],9:[10000000, '千万']};
    var num = /\d+/g.exec(str);
    num = num ? num[0] : '';
    nlength = num.length;
    if (nlength <= 4 ) return str;
    num = parseInt(num);
    fnum = (num / format[nlength][0]) + format[nlength][1];
    return str.replace(/\d+/,fnum);
}
function nr2br(str) {
        var flag = arguments[1] || false;
        // console.log(flag);
        if (typeof str === "string") {
            if (flag == false) {
                return str.replace(/[ \r\n | \n\r | \n & \r]/g,"<br>");
            } else if(flag === true) {
                return str.replace(/[\。|\；\;]/g,";<br>");
            } else if( typeof flag === "object") {
                return str.replace(flag, "<br>");
            }

        }

    return str;
}

/*
* 定义跳转
 */
function goTo(url,param){
    param = param||new Object();
    // if(Stoken!=""&&isQc()){
    //     if(param){
    //         param.stoken = Stoken;
    //     }else{
    //         param = M();
    //         param.stoken = Stoken;
    //     }
    // }
    if(I("share",0)==1){
        param.share=1;
    }
    var isgotophp = arguments[2]||false;
    if(!isgotophp){
        var curl = API.WEB+API.HTML[url][0]+".html";
        if (url!= "login" && API.HTML[url][1] && !isLogin()) {
            goLogin();
            return;
        }
        redirect(curl,param);
    }else{  //去php页面
        if(url == 'auth/weixinBaseInfo') API.SERVER_URL="http://api.qicheng51.com/";
        var curl = API.SERVER_URL + API.APP_LICATION + url;
        redirect(curl,param);
    }
    
}
/**
 * 去登录
 */
function goLogin()
{
    var obj=new Object();
    var url = window.location.href.replace(/[&]?stoken=[\d|\w]+/,"");
    obj.curl = url;
    // if(isWeixin()&&window.location.hostname.indexOf("m.qicheng51.com")>-1) {
    //     goTo(API.API_LIST.AUTH_SOCIAL_WECHAT,{'redirect': obj.curl}, true);
    // }else 
    if(!isQc()){
        goTo("login",obj);
    }else{
        obj.curl=encodeURIComponent(obj.curl);
        messageApp({name:'login'});
    }
   
}
/**
 *  是否登录
 * @returns {boolean} true 已登录 false 未登录
 */
function isLogin(){
    // if(isQc()){
    //     return true;
    // }
    // console.log(getUserid(),getUserid(true));
    if(!empty(getUserid())&&parseInt(getUserid())>0){
        return true;
    }else{
        return false;
    }
}
function hasAgent(){
        if(!empty($.cookie("qc_i"))){
            var qc=JSON.parse(base64decode(base64decode($.cookie("qc_i").substr(8)).substr(6)));
            console.log(qc)
            return 32 == (32 & qc.user_type);     //获取agent
        }else {
            return false;
        }
}
/**
 * 获取是否绑定手机
 * @return {Boolean}
 */
function isBindPhone(){
    var qc_i = $.cookie("qc_i");
    if(empty(qc_i)){
        return false;   //默认type 0;userid -1
    }else{
        var qc=JSON.parse(base64decode(base64decode(qc_i.substr(8)).substr(6)));
        return qc.is_bind ==1?true:false;
    }
}
//获取用户信息
function getUserInfo(){
    var qc_i = $.cookie("qc_i");
    if(empty(qc_i)){
        return false;   //默认type 0;userid -1
    }else{
        var qc=JSON.parse(base64decode(base64decode(qc_i.substr(8)).substr(6)));
        return qc;
    }
}
/**
 * 获取userid
 */
function getUserid(){
    var type = arguments[0]||false; //true 则为获得type
        if(empty($.cookie("qc_i"))){
            return type?0:-1;   //默认type 0;userid -1
        }else{
            var qc=JSON.parse(base64decode(base64decode($.cookie("qc_i").substr(8)).substr(6)));
            return type?qc.user_type:qc.user_id;
        }
}
/**
 * 页面加载完之后立即执行函数
 */
function onStart(fn,isfast){
    // $(document).ready(function(){
        isfast = isfast || false;
        if(I("share",0)==1){
            $(".HEAD-tip").show();
        }
        if(!isfast){
            fastClick.attach(document.body,{tapDelay:300});    //消除click延迟
        }else{
            fastClick.attach(document.body);
        }
        fn();
        // loadEnd();
    // });
}

/*
*去除loading
 */
function loadEnd(){
    $("#loader").hide();
}
/**
 * 创建新的对象
 */
function M(){
    return new Object();
}

function messageApp(obj){
    try{
        AppModel.JSTranferWithParameters(obj);
    }catch(e){}
}
function messageAppAndroid(obj) {
    try{
        AndriodJsTransfer.showShare(obj);
    }catch(e){}
}
/**
 * 检查手机号
 */
function checkPhone(val){
    var isshow = arguments[1]||false;
    val = typeof(val)!="string"?val.toString():val;
    var patt = new RegExp("[1(3|4|5|7|8)\\d{9}]","i");
    var patt1 = new RegExp("\\D?","i");
    var aa= !patt.test(val);
    var bb =  !patt1.test(val);
    if(!patt.test(val)||val.length!=11||!patt1.test(val)){
        if(!isshow){showTip("请输入正确的手机号");}
        return false;
    }else{
        return true;
    }
}
/*
*iframe postMessage监听
*/
function iframePostMessage(str){
     window.parent.postMessage(str,"*");
}

/**
 * 检查Email
 */
function checkEmail(val){
    var isshow = arguments[1]||false;
    val = typeof(val)!="string"?val.toString():val;
    var patt = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$","i");
    if(!patt.test(val)){
        if(!isshow){showTip("请输入正确的邮箱地址");}
        return false;
    }else{
        return true;
    }
}

/**
 * 检查字符串长度
 * @param val
 * @param min
 * @param max
 * @returns {boolean}
 */
function checkLength(val, min, max) {
    max = max || false;
    if (typeof  val !== "string") {
        val = val.toString();
    }
    return max ? (val.length >= min && val.length <= max) :  (val.length >= min);
}

/**
 * 检查密码
 */
function checkPassword(val){
    var isshow = arguments[1]||false;
    val = typeof(val)!="string"?val.toString():val;
    var patt = new RegExp("[A-z]");
    var patt1 = new RegExp("[0-9]");
    var a = patt.test(val),b=patt1.test(val);
    if(val.length<6){
        if(!isshow){showTip("密码必须不少于6位");}
        return false;
    }
    if(val.length>12){
        if(!isshow){showTip("密码不能超过12位");}
        return false;
    }
    if(!patt.test(val)){
        if(!isshow){showTip("密码中必须包含英文字母");}
        return false;
    }
    if(!patt1.test(val)){
        if(!isshow){showTip("密码中必须包含数字");}
        return false;
    }
    return true;
}
/*
判断是否某个页面
 */
function isHtml(page_name){
    if(window.location.pathname.indexOf(page_name+".html")>-1){
            return true;
        }else{
            return false;
        }
}
function scrollLoad(api, obj, callback) {
    //下拉加载
    var is_load = true;
    var is_all = false;
    var offset = obj.offset || 0;
    var loader=$(".tl-data-loader");
    // loader.removeClass('hide');
    function getMore() {
        obj.offset = offset;
        jsonAjax(api, obj, function(data) {
            is_load = true;
            // console.log(obj)
            if (data.ret == 0) {
                callback(data);
                offset = data.data.next_offset;
                if (offset < 0) {
                    is_load = false;
                    loader.text("已经到底了").removeClass('hide');
                } else {
                    loader.text("正在加载...");//.addClass('hide')
                }
            }
        });
    }
    $(document).off('scroll');
    $(document).on('scroll',function(e) {
        if (offset < 0) {
            loader.text("已经到底了").removeClass('hide');
            return
        }else{
            loader.text("正在加载...");
        }
        var windowHeight = document.documentElement.clientHeight;
        var scrollTop = $('body').scrollTop(); //滚动距离
        　　
        var scrollHeight = $(document).height(); //文档总高度
        if (scrollTop + windowHeight >= scrollHeight - 50) {
            if (is_load) {
                is_load = false;
                loader.removeClass('hide');
                $("body").scrollTop($("body").scrollTop() + 40);
                getMore();
            } else {
                return;
            }
        }
    });
}
/*
改变页面URL
 */
function changeUrl(url,param){
    if(typeof param =="boolean"&&param){
        history.replaceState(null, null, url);
        return
    }
    var useAdd = arguments[2]||false;
    if(typeof(param)=='object'){
    param=JSON.stringify(param).replace(/\{|\}|\"|\'/g,'').replace(/,/g,'&').replace(/:/g,'=');
    }else{
        try{
            param=param.toString().replace(',','&').replace(/:/g,'=').replace(/\"|\'/g,'');
        }catch(e){}
    }
    if(I("share",0)==1){
        param+="&share=1";
    }
    var path=API.WEB+API.HTML[url][0]+".html?"+param;
    if(useAdd){ //替换当前页面url,并将当前页面url添加到历史记录
        history.pushState({state: new Date().getTime()}, "", path);
    }else{      //替换当前页面url,不添加记录
        history.replaceState(null, null, path);
    }
}
/***测试服显示社区接口**/
// if(window.location.hostname.indexOf("test.qicheng51.com")>-1){
    // $(".RCOMMUNITY").removeClass('hide');
// }
/***测试服显示社区接口**/
$(".FOOT-nav").on("click",".FOOT-nav-item",function(){
    if($(this).hasClass('HOME')){               //移民达人
        goTo("index");
    }else if($(this).hasClass('IMPROJECT')){    //移民项目
        goTo("list");   
    }else if($(this).hasClass('COMMUNITY')){    //项目对比
        goTo("evaluate");
    }else if($(this).hasClass('MYCICLE')){      //我的
        goTo("my");
    }else if($(this).hasClass('RCOMMUNITY')){
        goTo('community');
    }
});
//分享的链接加上head
(function(){
    // var filter = ["questionbar","list","evaluate","my","myquestion","edit","testmatch","community",""];
    var filter = ["appguide","abank"];
    var head = true;
    for(var i in filter){
        if(isHtml(API.HTML[filter[i]][0])){
            head = false;
        }
    }
    if((I("share",0)==1||I("official",0)==1)&&head){    //分享出去的显示分享头部
        var headnav = $("#qc_head_nav"),    //对于已有fixed特殊处理
            mtop = parseInt($("body").css("padding-top")),
            hn_top = parseInt(headnav.css("top")),
            fs = parseInt(document.documentElement.style.fontSize),
            emtop = mtop + 5.92*fs,
            _hn_top = hn_top + 5.92*fs;
        // if(isHtml("questionbar")){
            var arrow = $("#qc_head_arrow"); 
        // }
        $("body").css("padding-top",emtop+"px");
        headnav.css("top",_hn_top+"px");
        console.log(arrow)
        arrow&&arrow.css("top",_hn_top+"px");
        $("body").prepend('<div class="HEAD-tip"><div class="HEAD-tip-logo FL-l CLEAR"><span class="HEAD-tip-name FL-l">首页</span><span class="HEAD-tip-wyqc FL-l"></span></div><div class="HEAD-tip-gzgzh-box FL-r"><span class="FL-r HEAD-tip-gzgzh FS-28">下载APP</span></div><i class="HEAD-tip-close"></i></div>');
        $(".HEAD-tip .HEAD-tip-logo").on('click', function() {
            goTo("index");
        });
        $(".HEAD-tip .HEAD-tip-gzgzh-box").on('click',function(){
            // goTo("qichengcode");
            goTo("appguide");
        });
        $(".HEAD-tip .HEAD-tip-close").on('click',function(){
            $(this).parents(".HEAD-tip").remove();
            headnav.animate({"top":hn_top+"px"},300);
            arrow&&arrow.animate({"top":hn_top+"px"},300);
            $("body").animate({"padding-top": mtop+"px"},300);
        });
    }
    if(!isQc()){
        $(".FOOT-nav").removeClass('hidden');
        // $(".FOOT-nav .FOOT-nav-item").each(function(){$(this).removeClass('hidden')});
        $(".topost").removeClass('hidden');
    }
})()
//base64解码
function base64decode(str){  
    var c1, c2, c3, c4;  
    var i, len, out;
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    len = str.length;  
    i = 0;  
    out = "";  
    while (i < len) {  
        /* c1 */  
        do {  
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
        }  
        while (i < len && c1 == -1);  
        if (c1 == -1)   
            break;  
        /* c2 */  
        do {  
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
        }  
        while (i < len && c2 == -1);  
        if (c2 == -1)   
            break;  
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
        /* c3 */  
        do {  
            c3 = str.charCodeAt(i++) & 0xff;  
            if (c3 == 61)   
                return out;  
            c3 = base64DecodeChars[c3];  
        }  
        while (i < len && c3 == -1);  
        if (c3 == -1)   
            break;  
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
        /* c4 */  
        do {  
            c4 = str.charCodeAt(i++) & 0xff;  
            if (c4 == 61)   
                return out;  
            c4 = base64DecodeChars[c4];  
        }  
        while (i < len && c4 == -1);  
        if (c4 == -1)   
            break;  
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
    }  
    return out;  
}

//编码的方法
 function base64encode(str) {
     var out, i, len;
     var c1, c2, c3;
     var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
     len = str.length;
     i = 0;
     out = "";
     while(i < len) {
     c1 = str.charCodeAt(i++) & 0xff;
     if(i == len)
     {
         out += base64EncodeChars.charAt(c1 >> 2);
         out += base64EncodeChars.charAt((c1 & 0x3) << 4);
         out += "==";
         break;
     }
     c2 = str.charCodeAt(i++);
     if(i == len)
     {
         out += base64EncodeChars.charAt(c1 >> 2);
         out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
         out += base64EncodeChars.charAt((c2 & 0xF) << 2);
         out += "=";
         break;
     }
     c3 = str.charCodeAt(i++);
     out += base64EncodeChars.charAt(c1 >> 2);
     out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
     out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
     out += base64EncodeChars.charAt(c3 & 0x3F);
     }
     return out;
 }
//百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?ea83c2170d736cc3c32453eac01d3679";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
// //获得随机数
// function getRand(min,max){
//     max = max ||false; 
//     if(typeof min !="number"||typeof max !="number" && typeof max !="boolean"){throw new Error("错误类型");}
//     return max ? Math.floor(Math.random()*(max-min+1)+min) : Math.floor(Math.random()*min);
// }
// //加密 
// function DC(){
//     var str = "0123456789abcdefghijklmnopqrstuvwxyz".split(""),
//     a = "defghijklmn".split(""),//100-110
//     rand = [getRand(36),getRand(36),getRand(36),getRand(36),getRand(36)],code="",sum=0;
//     for(var i in rand){
//         code+=str[rand[i]];
//         sum+=str[rand[i]].charCodeAt(0);
//     }
//     var b=10-(sum%10)+100;
//     code+=a[10-(sum%10)];
//     return{
//         "a":code, 
//         "b":b,
//     }
// }
// //验证
// function EC(a,b){
//     if(typeof a !="string"||typeof b !="number"||a.length!=6||a.charCodeAt(5)!=b){
//         return false;
//     }else{
//         var sum = 0;
//         for(var i = 0;i<a.length;i++){
//            sum+=a.charCodeAt(i);
//         }
//         if(sum%10!=0){
//             return false;
//         }else{
//             return true;
//         }
//     }
// }
//设置登录cookie
// function setLogin(){
//     var a = JSON.stringify(DC());
//     $.cookie("QC_status",a,{expires: 1/12,path: '/'});
// }
    window.humanNumber = humanNumber;
    window.nr2br = nr2br;
    window.md5 = md5;
    window.base64decode = base64decode;
    window.base64encode = base64encode;
var tool ={
    'API' : API,                  //接口
    'allowMove' : allowMove,      //允许touchmove
    'base64decode' : base64decode,//base64解码
    'base64encode' : base64encode,//base64编码
    'checkPhone' : checkPhone,    //手机验证
    'checkEmail' : checkEmail,    //邮箱验证
    'checkPassword' : checkPassword, //密码验证
    'checkLength' : checkLength,  //验证字符串长度
    'changeUrl' : changeUrl,      //改变当前页面url
    'empty' : empty,              //判断是否为空
    'fastClick' : fastClick,      //快速点击
    'forbidMove' : forBidMove,    //禁止touchmove
    'getDeviceType' : getDeviceType,//获取访问终端类型
    'getUserid' : getUserid,      //获取用户id
    'getUserInfo':getUserInfo,    //获取用户信息
    'goTo' : goTo,                //跳转到页面
    'goLogin' : goLogin,          //去登录
    'I' : I,                      //获取url传参
    'H' : H,                      //获取url后#的参数
    'isWeixin' : isWeixin,        //判断是否微信环境
    'isLogin' : isLogin,          //判断是否登录
    'hasAgent' : hasAgent,        //判断是否为经纪人
    'isHtml' : isHtml,            //判断是否某个页面
    'isQc' : isQc,                //判断是否ISO启程app
    'isQcAndroid' : isQcAndroid,  //判断是否Android启程app
    'isBindPhone' : isBindPhone,  //判断是否绑定手机号
    'iframePostMessage' : iframePostMessage,//向父级通信
    'jsonAjax' : jsonAjax,        //封装ajax方法
    'loadEnd' : loadEnd,          //去除loading效果
    'M' : M,                      //创建新对象
    'messageApp' : messageApp,    //app通讯
    'messageAppAndroid' : messageAppAndroid,  //app通讯Android
    'md5' : md5,                  //md5加密
    'onStart' : onStart,          //页面加载完之后立即执行函数
    'showTip' : showTip,          //显示弹出提示
    'scrollLoad':scrollLoad,      //滚动加载
    // 'setLogin' : setLogin,        //设置登录态
    'titleReset' : titleReset,    //设置微信titile
    // 'DC' : DC,                    //加密
    // 'EC' : EC,                    //解密
};
window.empty = empty;
return tool;
});
