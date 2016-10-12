(function () {
    // !function(){
    //     var u = navigator.userAgent.toLowerCase();
    //     if(u.indexOf("qc51")>-1){
    //     Object.defineProperty(navigator,"userAgent",{get:function(){return "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E230 qc51 (iphone) version1.0.1";}}); 
    //     }
    // }()
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        var clientWidth = document.body.clientWidth;
        if(!clientWidth){
            return;
        }
        document.documentElement.style.fontSize =clientWidth/30+ 'px';
        document.documentElement.style.visibility = 'visible';
         console.log( clientWidth/30)
    }
    if(!document.documentElement.addEventListener){
        return;
    }
    window.addEventListener(resizeEvt,recalc,false);
    window.addEventListener('DOMContentLoaded',recalc,false);
    // var no_loading=["login","register","personinfo","evaluate","edit"];
    //loading效果
    // function setLoading(){
    //     var load_container = document.createElement("div");
    //     var load_content = document.createElement("div");
    //     load_container.className="loader-bg";
    //     load_container.id="loader";
    //     load_content.className="loader-cs";
    //     load_content.className+=" coffee_cup"
    //     load_container.appendChild(load_content);
    //     document.getElementsByTagName('body')[0].appendChild(load_container);
    //     setTimeout(function(){
    //         load_container.style.display="none";
    //     },1000);
    // }
    // function isloading(){
    //     for(var i in no_loading){
    //         if(window.location.pathname.indexOf(no_loading[i]+".html")>-1){
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // (function(){
    //     if(isloading()){
    //         return
    //     }
    //     setTimeout(function(){
    //         var body = document.getElementsByTagName('body')[0];
    //         if(body){
    //             setLoading(); 
    //         }else{
    //             arguments.callee();
    //         }
    //     },5);
    // })()
    // document.writeln("<script src='/mobile/assets/js/common/jquery.min.js'></script>");
})();