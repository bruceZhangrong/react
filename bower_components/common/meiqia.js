define(["common/tool","common/fixedbtn"],function($$,fixedBtn){
    // var ua = navigator.userAgent.toLowerCase();
    // function MQ_isshow(visibility) {
    //     if (visibility === 'visible') {
    //         // alert('聊天窗口处于显示状态');
    //         void(0);
    //     } else {
    //         // console.log("meiqia关闭");
    //         if(ua.indexOf("qc51")>-1){
    //             $$.messageApp({'name':'meiqia'});
    //         }
    //     }
    // }
    (function(m, ei, q, i, a, j, s) {
        m[a] = m[a] || function() {
            (m[a].a = m[a].a || []).push(arguments)
        };
        j = ei.createElement(q),
            s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = i + '?v=' + new Date().getUTCDate();
        s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '//eco-api.meiqia.com/dist/meiqia.js', '_MEIQIA');
    _MEIQIA('entId', 10228);
    _MEIQIA('withoutBtn', true);
    // _MEIQIA('getPanelVisibility', MQ_isshow);
    // if(ua.indexOf("qc51")==-1){
        $("body").append('<div class="consult TA-c" id="consult"><div class="icon-consult"></div>咨询</div>');
        var consult_bg = $('<div class="QC-modal"><div class="QC-modal-content"><div class="QC-btn-item" id="consult_appointment"><div class="QC-btn-ico QC-ico-appointment"></div><div class="QC-btn-label"><span class="QC-btn-title">预约咨询</span><span class="QC-btn-tips">我们会联系您进行预约</span></div></div>'+'<div class="QC-btn-item" id="consult_inline"><div class="QC-btn-ico QC-ico-inline"></div><div class="QC-btn-label"><span class="QC-btn-title">在线咨询</span></div></div>'+'<div class="QC-btn-item" id="consult_phone"><a href="tel:075523228206"><div class="QC-btn-ico QC-ico-phone"></div><div class="QC-btn-label"><span class="QC-btn-title">电话咨询</span></div></div></a></div></div>');
        $("body").append(consult_bg);
        $(".consult").on("click",function(){
            $(".QC-modal").show(300);
        });
        $("body").on("click","#consult_appointment",function(){
            var obj = new Object();
            if(window.location.pathname.indexOf("projectintro.html")>-1&&!!$$.I("id",false)){
                $$.goTo("appointment",{"id":$$.I("id")});
            }else{
                $$.goTo("appointment");
            }
        });
        $("body").on("click",".QC-modal",function(){
            $(this).hide(300);
        });
        $("body").on("click","#consult_inline",function(){
            _MEIQIA._SHOWPANEL();
        });
    // }
    fixedBtn.move(".consult");
return _MEIQIA;
});