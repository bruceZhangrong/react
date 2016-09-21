define(['common/jquery.min'],function(){
    var $ = jQuery;
    return function(container,child,fix){
        child = child ||"";
        fix = fix ||"#fixup";
        var contul = $(container),fixup=$(fix);
        var wh = $("body").height(),offsety=0;
        var st,sm,se;
        if(child.indexOf(".")>-1){
            var len = contul.find(child).length;
        }else{
            var len = contul.children(child).length;
        }
        fixup.css("width",(Math.abs(offsety)+1)*(100/len)+"%");
        contul.on("touchstart touchmove touchend click",function(e){
            switch(e.type){
                case "touchstart":
                    st = getClient();
                break;
                case "touchmove":
                    sm = getClient();
                break;
                case "touchend":
                try{
                    se = st.y-sm.y
                    if(se>30){
                        move(true);
                    }else if(se<-30){
                        move(false);
                    }
                    sm = {};
                }catch(e){}
                break;
                case "click":
                    move(true);
                break;
            }
        });
        var getClient = function()
        {
            var x=event.pageX||event.targetTouches[0].pageX;
            var y=event.pageY||event.targetTouches[0].pageY;
            return {
              "x": x,
              "y": y,
            };
        };
        var move = function(down){
            if(down){
                if(offsety-1<=-len){
                    return
                }
                offsety-=1;
            }else{
                if(offsety+1>0){
                    return
                }
                offsety+=1;
            }
            tanSlate(contul,offsety*wh,0.5);
            fixup.css("width",(Math.abs(offsety)+1)*(100/len)+"%");
        }
        var tanSlate = function(sel,y,t)
        {
            var tran_3d='translate3d(0px,'+y+'px,0px)';
            var tran_2d='translate(0px,'+y+'px)';
            sel.css({
                '-webkit-transform':   tran_3d,
                  '-o-transform':       tran_2d,
                  '-ms-transform':      tran_2d,
                  '-moz-transform':     tran_2d,
                  'transform':          tran_3d,
                  '-moz-transition': '-moz-transform '+t+'s ease-out',
                  '-webkit-transition': '-webkit-transform '+t+'s ease-out',
                  '-o-transition': '-o-transform '+t+'s ease-out',
                '-ms-transition': '-ms-transform '+t+'s ease-out',
                'transition': 'transform '+t+'s ease-out',
                });
        }
    };
});