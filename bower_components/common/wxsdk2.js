define(['common/tool','common/jweixin-1.0.0'],function($$,wx){
    function loadWx(share,share2){
        if($$.isWeixin()){
            var lurl = encodeURIComponent(location.href.split('#')[0]);
            $$.jsonAjax($$.API.API_LIST.JSSDK_SIGNPACKAGE,{"url":lurl},function(data){
                if(data.ret==0){
                   data.data.debug = false;
                   data.data.jsApiList=[ "onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","hideAllNonBaseMenuItem","showMenuItems"];
                   wx.config(data.data);
                   wx.ready(function(){
                    // wx.hideAllNonBaseMenuItem();
                    // wx.showMenuItems({menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:favorite"]});
                    wxShare(share,share2);
                   });
                   wx.error(function(res) {
                      // console.log(res);
                   });
                }
            });
        }
        
    }
    function wxShare(share,share2){
        var url = window.location.href;
        var share2 = share2||false;
        // var share = {
        //     // title: '启程无忧', // 分享标题
        //     desc: '启程无忧，移民无忧', // 分享描述
        //     link: window.location.href.replace(/[&]?stoken=[\d|\w]+/,""), // 分享链接
        //     // imgUrl: '', // 分享图标
        // };
        if(!share.link){
            share.link = url.indexOf("?")>-1?url.replace(/[&]?stoken=[\d|\w]+/,"")+"&share=1":url.replace(/[&]?stoken=[\d|\w]+/,"")+"?share=1"; // 分享链接
        }
        if($$.isWeixin()){
            // share.link =  url.replace(/[&]?stoken=[\d|\w]+/,"")+"&share=1"; // 分享链接
            // console.log(share)
            wx.showMenuItems({menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:favorite"]});
            // share.success=function(){
            //     $$.showTip("分享成功");
            // };
            // share.cancel=function(){
            //     // $$.showTip("分享取消");
            // }
            console.log(share,share2);
            if(!share2){
                wx.onMenuShareTimeline(share);
                wx.onMenuShareAppMessage(share);
                wx.onMenuShareQQ(share);
            }else{
                wx.onMenuShareTimeline(share2); //分享到朋友圈
                wx.onMenuShareAppMessage(share);   //分享到朋友
                wx.onMenuShareQQ(share);
            }
                
        }else{
            if($$.isQc()){
                var obj = $$.M();
                obj.title = share.title;
                obj.url = share.link;
                obj.urlImage = share.imgUrl;
                $$.messageApp({'name':'wxshare',body:JSON.stringify(obj)});
            }
        }
    }

    function jsApiCall(params)
    {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            params,
            function(res){
                WeixinJSBridge.log(res.err_msg);
                alert(res.err_code+res.err_desc+res.err_msg);
            }
        );
    }

    // LoadWx();
    function wxPay(params) {
        if($$.isWeixin()){
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', function(){jsApiCall(params);}, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', function(){jsApiCall(params);});
                    document.attachEvent('onWeixinJSBridgeReady', function(){jsApiCall(params);});
                }
            }else{
                jsApiCall(params);
            }
        } else {
            $$.showTip('请在微信环境中使用!');
        }
    }
    return{
        "wxShare":wxShare,
        "loadWx":loadWx,
        'wxPay':wxPay,
    }
});